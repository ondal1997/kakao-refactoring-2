import { fetchStocks, fetchSubOptions } from "../api.js";
import { effects, state, rerender } from "../index.js";

export default function OptionSelector() {
  const { options } = state;

  if (!options) {
    return "Loading...";
  }

  effects.push(() => {
    const $optionSelector = document.querySelector(".optionSelector");
    $optionSelector.addEventListener("change", onSelectOption);
    return () => {
      $optionSelector.removeEventListener("change", onSelectOption);
    };
  });

  const Options = () =>
    options
      .map(
        ({ id, optionName }) =>
          `<option value="${id}" ${
            state.selectedOptionId === id ? "selected" : ""
          }>${optionName}</option>`
      )
      .join("");

  return `
    <select class="optionSelector">
      <option disabled ${
        state.selectedOptionId === null ? "selected" : ""
      }>상품 옵션 선택</option>
      ${Options()}
    </select>
  `;
}

function onSelectOption({ currentTarget }) {
  const optionId = currentTarget.value;

  if (!state.visitedOptionIds.includes(optionId)) {
    state.visitedOptionIds.push(optionId);

    (async () => {
      let response;

      response = await fetchSubOptions(optionId);
      const subOptions = await response.json();
      state.subOptions = [...state.subOptions, ...subOptions];

      response = await fetchStocks(subOptions.map(({ id }) => id));
      const stocks = await response.json();
      state.stocks = { ...state.stocks, ...stocks };

      state.loadedOptionIds.push(optionId);
      rerender();
    })();
  }

  state.selectedOptionId = optionId;
  state.selectedSubOptionId = null;
  rerender();
}

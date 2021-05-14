import { fetchStocks, fetchSubOptions } from "../api.js";
import { effects, state, rerender } from "../index.js";

export default function OptionSelector() {
  const { options } = state;

  if (!options) {
    return "Loading...";
  }

  effects.push(effect);

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

function effect() {
  const $optionSelector = document.querySelector(".optionSelector");

  $optionSelector.addEventListener("change", onSelectOption);

  return () => {
    $optionSelector.removeEventListener("change", onSelectOption);
  };
}

function onSelectOption(e) {
  const optionId = e.currentTarget.value;

  state.selectedOptionId = optionId;
  state.selectedSubOptionId = null;

  if (!state.visitedOptionIds.includes(optionId)) {
    state.visitedOptionIds.push(optionId);

    fetchSubOptions(optionId)
      .then((response) => response.json())
      .then((subOptions) => {
        state.subOptions = [...state.subOptions, ...subOptions];

        fetchStocks(subOptions.map(({ id }) => id))
          .then((response) => response.json())
          .then((stocks) => {
            state.stocks = { ...state.stocks, ...stocks };

            state.loadedOptionIds.push(optionId);
            rerender();
          });
      });
  }

  rerender();
}

import { effects, state, rerender } from "../index.js";

export default function SubOptionSelector() {
  const { selectedOptionId, subOptions } = state;

  if (!selectedOptionId) {
    return "";
  }

  if (!state.loadedOptionIds.includes(selectedOptionId)) {
    return "Loading...";
  }

  effects.push(() => {
    const $subOptionSelector = document.querySelector(".subOptionSelector");
    $subOptionSelector.addEventListener("change", onSelectSubOption);
    return () => {
      $subOptionSelector.removeEventListener("change", onSelectSubOption);
    };
  });

  const SubOptions = () =>
    subOptions
      .filter(({ parentOptionId }) => parentOptionId === selectedOptionId)
      .map(
        ({ id, optionName }) =>
          `<option value="${id}" ${
            state.selectedSubOptionId === id ? "selected" : ""
          }>${optionName}</option>`
      )
      .join("");

  return `
    <select class="subOptionSelector">
      <option disabled ${
        state.selectedSubOptionId === null ? "selected" : ""
      }>세부 옵션 선택</option>
      ${SubOptions()}
    </select>
  `;
}

function onSelectSubOption({ currentTarget }) {
  const subOptionId = currentTarget.value;

  if (state.stocks[subOptionId].stock < 1) {
    alert("재고가 없습니다.");
  } else if (state.basket.some((item) => item.subOptionId === subOptionId)) {
    alert("이미 선택된 항목입니다.");
  } else {
    state.basket.push({ subOptionId, size: 1 });
  }

  state.selectedSubOptionId = subOptionId;
  rerender();
}

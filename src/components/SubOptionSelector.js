function SubOptionSelector() {
  const { selectedOptionId, subOptions, stocks } = state;

  if (!selectedOptionId) {
    return "";
  }

  if (!state.loadedOptionIds.includes(selectedOptionId)) {
    return "Loading...";
  }

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

function onSelectSubOption(e) {
  const subOptionId = e.currentTarget.value;

  state.selectedSubOptionId = subOptionId;

  console.log(state.stocks[subOptionId]);

  updateApp();
}

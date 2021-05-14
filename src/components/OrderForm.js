function OrderForm() {
  const { options, subOptions, basket } = state;

  const Items = () =>
    basket
      .map(({ subOptionId, size }, index) => {
        const subOption = subOptions.find(({ id }) => id === subOptionId);
        const option = options.find(
          ({ id }) => id === subOption.parentOptionId
        );
        return `
          <div>${option.optionName} ${subOption.optionName}</div>
          <input type="number" class="itemSizeInput" data-index="${index}" value="${size}" />
          <button type="button" class="removeItemBotton" data-index="${index}">제거</button>
        `;
      })
      .join("");

  return Items();
}

function onChangeItemSize(e) {
  const { index } = e.currentTarget.dataset;

  const value = Number.parseInt(e.currentTarget.value);
  if (
    !Number.isNaN(value) &&
    value > 0 &&
    value <= state.stocks[state.basket[index].subOptionId].stock
  ) {
    state.basket[index].size = value;
  }
  updateApp();
}

function onClickRemoveItem(e) {
  const { index } = e.currentTarget.dataset;
  state.basket.splice(index, 1);
  updateApp();
}

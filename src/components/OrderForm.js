function OrderForm() {
  const { options, subOptions, basket } = state;

  const Items = () =>
    basket
      .map(({ subOptionId, size }) => {
        const subOption = subOptions.find(({ id }) => id === subOptionId);
        const option = options.find(({ id }) => id === subOption.parentOptionId);
        return `<p>${option.optionName} ${subOption.optionName}</p>`;
      })
      .join("");

  return Items();
}

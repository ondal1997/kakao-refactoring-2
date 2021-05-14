function ProductPage() {
  const { productName, basePrice } = state;

  return `
      <h2>${productName}</h2>
      <p>${basePrice}원~</p>
      <hr />
      ${OptionSelector()}
      ${SubOptionSelector()}
      <hr />
      ${OrderForm()}
    `;
}

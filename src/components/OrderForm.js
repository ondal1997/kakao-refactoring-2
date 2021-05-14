import { pushEffect, state, updateApp } from "../index.js";

export default function OrderForm() {
  const { options, subOptions, stocks, basket, basePrice } = state;

  if (basket.length === 0) {
    return "<p>항목을 선택해주세요.</p>";
  }

  pushEffect(effect);

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

  let totalPrice = 0;
  basket.forEach(({ subOptionId, size }) => {
    totalPrice += (stocks[subOptionId].optionPrice + basePrice) * size;
  });

  return `
    ${Items()}
    <p>총 ${totalPrice}원</p>
  `;
}

function effect() {
  const $itemSizeInputs = document.querySelectorAll(".itemSizeInput");
    $itemSizeInputs.forEach(($itemSizeInput) => {
      $itemSizeInput.addEventListener("change", onChangeItemSize);
    });

    const $removeItemBottons = document.querySelectorAll(".removeItemBotton");
    $removeItemBottons.forEach(($removeItemBotton) => {
      $removeItemBotton.addEventListener("click", onClickRemoveItem);
    });

    return () => {
      const $itemSizeInputs = document.querySelectorAll(".itemSizeInput");
      $itemSizeInputs.forEach(($itemSizeInput) => {
        $itemSizeInput.removeEventListener("change", onChangeItemSize);
      });

      const $removeItemBottons = document.querySelectorAll(".removeItemBotton");
      $removeItemBottons.forEach(($removeItemBotton) => {
        $removeItemBotton.removeEventListener("click", onClickRemoveItem);
      });
    };
}

function onChangeItemSize(e) {
  const { index } = e.currentTarget.dataset;

  let value = Number.parseInt(e.currentTarget.value);
  if (!Number.isNaN(value)) {
    if (value < 1) {
      value = 1;
    }

    if (value > state.stocks[state.basket[index].subOptionId].stock) {
      value = state.stocks[state.basket[index].subOptionId].stock;
    }

    state.basket[index].size = value;
  }
  updateApp();
}

function onClickRemoveItem(e) {
  const { index } = e.currentTarget.dataset;
  state.basket.splice(index, 1);
  updateApp();
}

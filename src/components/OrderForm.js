import { effects, state, rerender } from "../index.js";

export default function OrderForm() {
  const { options, subOptions, stocks, basket, basePrice } = state;

  if (basket.length === 0) {
    return "<p>항목을 선택해주세요.</p>";
  }

  effects.push(() => {
    const $items = document.querySelectorAll(".item");
    $items.forEach(($item) => {
      $item.addEventListener("change", onChangeItemSize);
      $item.addEventListener("click", onClickRemoveItem);
    });
    return () => {
      $items.forEach(($item) => {
        $item.removeEventListener("change", onChangeItemSize);
        $item.removeEventListener("click", onClickRemoveItem);
      });
    };
  });

  const Items = () =>
    basket
      .map(({ subOptionId, size }, index) => {
        const subOption = subOptions.find(({ id }) => id === subOptionId);
        const option = options.find(
          ({ id }) => id === subOption.parentOptionId
        );
        return `
          <div class="item" data-index="${index}">
            <div>${option.optionName} ${subOption.optionName}</div>
            <input type="number" class="itemSizeInput gogo" value="${size}" />
            <button type="button" class="removeItemButton">제거</button>
          </div>
        `;
      })
      .join("");

  let totalPrice = 0;
  basket.forEach(({ subOptionId, size }) => {
    totalPrice += (basePrice + stocks[subOptionId].optionPrice) * size;
  });

  return `
    ${Items()}
    <p>총 ${totalPrice}원</p>
  `;
}

function onChangeItemSize({ target, currentTarget }) {
  if (!target.classList.contains("itemSizeInput")) {
    return;
  }

  const { index } = currentTarget.dataset;
  let value = Number.parseInt(target.value);
  if (!Number.isNaN(value)) {
    if (value < 1) {
      value = 1;
    }
    if (value > state.stocks[state.basket[index].subOptionId].stock) {
      value = state.stocks[state.basket[index].subOptionId].stock;
    }
    state.basket[index].size = value;
  }
  rerender();
}

function onClickRemoveItem({ target, currentTarget }) {
  if (!target.classList.contains("removeItemButton")) {
    return;
  }

  const { index } = currentTarget.dataset;
  state.basket.splice(index, 1);
  rerender();
}

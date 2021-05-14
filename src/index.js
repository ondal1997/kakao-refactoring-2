import { fetchOptions } from "./api.js";
import App from "./components/App.js";

const state = {
  productName: "카카오 프렌즈 인형",
  basePrice: 10000,

  options: null,
  subOptions: [],
  stocks: {},

  visitedOptionIds: [],
  loadedOptionIds: [],

  selectedOptionId: null,
  selectedSubOptionId: null,
  basket: [],
};

const effects = [
  // 초기 데이터 로드
  () => {
    fetchOptions()
      .then((response) => response.json())
      .then((options) => {
        state.options = options;
        rerender();
      });
  },
];

function appDidRender() {
  effects.forEach((effect, index) => {
    effects[index] = effect();
  });
}

function appWillRerender() {
  effects.forEach((effect) => {
    if (effect) effect();
  });
  effects.length = 0;
}

const $app = document.querySelector("#app");

$app.innerHTML = App();
appDidRender();

function rerender() {
  appWillRerender();
  $app.innerHTML = App();
  appDidRender();
}

export { state, effects, rerender };

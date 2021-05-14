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

const effects = [];

function pushEffect(effect) {
  effects.push(effect);
}

function appDidMount() {
  effects.forEach((effect, index) => {
    effects[index] = effect();
  });

  // 초기 데이터 로드
  fetchOptions()
    .then((response) => response.json())
    .then((options) => {
      state.options = options;
      updateApp();
    });
}

function appWillUpdate() {
  effects.forEach((effect) => {
    effect();
  });
  effects.length = 0;
}

function appDidUpdate() {
  effects.forEach((effect, index) => {
    effects[index] = effect();
  });
}

const $app = document.querySelector("#app");

$app.innerHTML = App();
appDidMount();

function updateApp() {
  appWillUpdate();
  $app.innerHTML = App();
  appDidUpdate();
}

export { state, updateApp, pushEffect };

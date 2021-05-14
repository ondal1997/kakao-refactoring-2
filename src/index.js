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

function useEffect(effect) {
  effects.push(effect);
}

function appDidMount() {
  useEffect(() => {
    fetchOptions()
      .then((response) => response.json())
      .then((options) => {
        state.options = options;
        updateApp();
      });
  });

  effects.forEach((effect, index) => {
    effects[index] = effect();
  });
}

function appWillUpdate() {
  effects.forEach((effect) => {
    if (effect) {
      effect();
    }
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

export { state, updateApp, useEffect };

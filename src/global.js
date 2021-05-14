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

function addListeners() {
  const $optionSelector = document.querySelector(".optionSelector");
  if ($optionSelector) {
    $optionSelector.addEventListener('change', onSelectOption); 
  }

  const $subOptionSelector = document.querySelector(".subOptionSelector");
  if ($subOptionSelector) {
    $subOptionSelector.addEventListener('change', onSelectSubOption); 
  }
}

function removeListeners() {
  const $optionSelector = document.querySelector(".optionSelector");
  if ($optionSelector) {
    $optionSelector.removeEventListener('change', onSelectOption); 
  }

  const $subOptionSelector = document.querySelector(".subOptionSelector");
  if ($subOptionSelector) {
    $subOptionSelector.removeEventListener('change', onSelectSubOption); 
  }
}

function appDidMount() {
  addListeners();

  // 초기 데이터 로드
  fetchOptions()
    .then((response) => response.json())
    .then((options) => {
      state.options = options;
      updateApp();
    });
}

function appWillUpdate() {
  removeListeners();
}

function appDidUpdate() {
  addListeners();
}

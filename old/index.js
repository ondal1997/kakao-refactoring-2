// ================================
// api.js
function fetchOptions() {
  return fetch(
    "https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options"
  );
}

// ================================
// global.js
const state = {
  productName: "카카오 프렌즈 인형",
  basePrice: 10000,

  options: null,
  subOptions: [],
  stocks: {},

  selectedOption: null,
  basket: [],
};

function addListeners() {
  const $options = document.querySelectorAll(".option");
  $options.forEach(($option) => {
    $option.addEventListener("click", onSelectOption);
  });
}

function removeListeners() {
  const $options = document.querySelectorAll(".option");
  $options.forEach(($option) => {
    $option.removeEventListener("click", onSelectOption);
  });
}

function appDidMount() {
  addListeners();

  // 초기 데이터 로드
  fetchOptions()
    .then((response) => response.json())
    .then((result) => {
      state.options = result;
      updateApp();
    });
}

function appDidUpdate() {
  addListeners();
}

function appWillUpdate() {
  removeListeners();
}

// ================================
// components
// OptionSelector.js
function OptionSelector() {
  const { options } = state;

  if (!options) {
    return "Loading...";
  }

  return options
    .map(
      (option) =>
        `<button class="option" data-id="${option.id}">${option.optionName}</button>`
    )
    .join("");
}

function onSelectOption(e) {
  state.selectedOption = state.options.find(
    (option) => option.id === e.currentTarget.dataset.id
  );
  updateApp();
}

// SubOptionSelector.js
function SubOptionSelector() {
  const { selectedOption } = state;

  if (!selectedOption) {
    return "";
  }

  return `
    <p>${selectedOption.optionName}</p>
  `;
}

// OrderForm.js
function OrderForm() {
  return "";
}

// ProductPage.js
function ProductPage() {
  const { productName, basePrice } = state;

  return `
    <h2>${productName}</h2>
    <p>${basePrice}원~</p>
    ${OptionSelector()}
    ${SubOptionSelector()}
    ${OrderForm()}
  `;
}

// Header.js
function Header() {
  return "<h1>카카오 인형가게</h1>";
}

// App.js
function App() {
  return `
    ${Header()}
    ${ProductPage()}
  `;
}

// ================================
// index.js
const $app = document.querySelector("#app");

$app.innerHTML = App();
appDidMount();

function updateApp() {
  appWillUpdate();
  $app.innerHTML = App();
  appDidUpdate();
}

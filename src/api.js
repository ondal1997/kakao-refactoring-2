function fetchOptions() {
  return fetch(
    "https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options"
  );
}

function fetchSubOptions(optionId) {
  return fetch(
    `https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options/${optionId}`
  );
}

function fetchStocks(subOptionIds) {
  return fetch(
    `https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/stocks/${subOptionIds}`
  );
}

export function fetchOptions() {
  return fetch(
    "https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options"
  );
}

export function fetchSubOptions(optionId) {
  return fetch(
    `https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/product-options/${optionId}`
  );
}

export function fetchStocks(subOptionIds) {
  return fetch(
    `https://n1d8hlyh02.execute-api.ap-northeast-2.amazonaws.com/dev/api/stocks/${subOptionIds}`
  );
}

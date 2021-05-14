const $app = document.querySelector("#app");

$app.innerHTML = App();
appDidMount();

function updateApp() {
  appWillUpdate();
  $app.innerHTML = App();
  appDidUpdate();
}

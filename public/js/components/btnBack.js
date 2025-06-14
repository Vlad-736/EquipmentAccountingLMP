const appEl = document.querySelector(".app");
const containerEl = document.querySelector(".header__wrapper");
const fetchButtonsData = await import("./fetchButtonsData.js");
const btnBackEl = document.querySelector(".btn-back");

btnBackEl.addEventListener("click", async function (e) {
  const renderBtn = await import("./renderBtn.js");
  e.preventDefault();
  appEl.innerHTML = "";

  btnBackEl.classList.toggle("visually-hidden");

  fetchButtonsData.default("./btn.json").then((fetchButtonsData) => {
    renderBtn.default(fetchButtonsData);
  });
});

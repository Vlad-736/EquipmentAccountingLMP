const appEl = document.querySelector(".app");
const fetchButtonsData = await import("./fetchButtonsData.js");
const btnChoise = document.querySelector('.location__shop');

export default function btnBack() {
  const btnBackEl = document.querySelector(".btn-back");

  btnBackEl.addEventListener("click", async function (e) {
  const renderBtn = await import("./renderBtnType.js");
  e.preventDefault();
  appEl.innerHTML = "";

  btnBackEl.classList.toggle("visually-hidden");
  btnChoise.classList.toggle("location__shop--desactive")

  fetchButtonsData.default("./btn.json").then((fetchButtonsData) => {
    renderBtn.default(fetchButtonsData);
  });
});
}
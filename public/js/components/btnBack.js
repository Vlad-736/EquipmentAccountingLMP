const appEl = document.querySelector(".app");
const fetchButtonsData = await import("./fetchButtonsData.js");

export default function btnBack() {
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
}
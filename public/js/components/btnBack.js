const appEl = document.querySelector(".app");
const containerEl = document.querySelector(".header__wrapper")
const fetchButtonsData = await import("./fetchButtonsData.js");

export default async function btnBack() {
  const renderBtn = await import("./renderBtn.js");

  const btnBack = document.createElement("button");
  btnBack.className = "btn-back btn";
  btnBack.textContent = "Назад";

  containerEl.appendChild(btnBack);

  btnBack.addEventListener("click", function (e) {
    e.preventDefault();
    appEl.innerHTML = "";
    containerEl.removeChild(btnBack)

    fetchButtonsData.default("./btn.json").then((fetchButtonsData) => {
      renderBtn.default(fetchButtonsData);
    });
  });
}

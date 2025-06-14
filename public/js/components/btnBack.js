const appEl = document.querySelector(".app");

const fetchButtonsData = await import("./fetchButtonsData.js");

export default async function btnBack() {
  const renderBtn = await import("./renderBtn.js");

  const btnBack = document.createElement("button");
  btnBack.className = "btn-back btn";
  btnBack.textContent = "Назад";

  appEl.appendChild(btnBack);

  btnBack.addEventListener("click", function (e) {
    e.preventDefault();
    appEl.innerHTML = "";

    fetchButtonsData.default("./btn.json").then((fetchButtonsData) => {
      renderBtn.default(fetchButtonsData);
    });
  });
}

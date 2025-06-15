window.addEventListener("DOMContentLoaded", async () => {
  // рисуем кнопки
  const fetchButtonsData = await import("./components/fetchButtonsData.js");
  const renderBtnType = await import("./components/renderBtnType.js");
  fetchButtonsData.default("./btn.json").then((fetchButtonsData) => {
    renderBtnType.default(fetchButtonsData);
  });

  const btnBack = await import("./components/btnBack.js");
  btnBack.default();

  const choiseLocation = await import("./components/choiseLocation.js");
  choiseLocation.default();
});

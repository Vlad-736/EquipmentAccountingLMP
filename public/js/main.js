window.addEventListener("DOMContentLoaded", async () => {
  // рисуем кнопки
  const fetchButtonsData = await import("./components/fetchButtonsData.js");
  const renderBtn = await import("./components/renderBtn.js");
  fetchButtonsData.default("./btn.json").then((fetchButtonsData) => {
    renderBtn.default(fetchButtonsData);
  });

  const btnBack = await import("./components/btnBack.js")
  btnBack.default()
});

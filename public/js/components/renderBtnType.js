const appEl = document.querySelector(".app");
const renderCard = await import("./renderCardList.js");
const btnChoise = document.querySelector(".location__shop");

// отрисовка кнопок
export default function renderBtnType(array) {
  // Очистить контейнер перед отрисовкой
  appEl.innerHTML = "";

  const containerEl = document.createElement("ul");
  containerEl.className = "type__list";

  array.forEach((element) => {
    const leEl = document.createElement("li");
    leEl.className = "type__item";

    const btnEl = document.createElement("button");
    btnEl.className = "type__btn btn";
    btnEl.setAttribute("data-atribute", `${element.type}`);

    const pEl = document.createElement("p");
    pEl.className = "type__description";
    pEl.textContent = element.description;

    const imgEl = document.createElement("img");
    imgEl.className = "type__image";
    imgEl.src = element.img;
    imgEl.alt = element.description;

    btnEl.appendChild(imgEl);
    btnEl.appendChild(pEl);

    leEl.appendChild(btnEl);

    containerEl.appendChild(leEl);
  });

  appEl.appendChild(containerEl);

  clickBtnType();
}

// логика "передачи" типа оборудования для фильтра отрисовки
function clickBtnType() {
  const btnTypeAll = document.querySelectorAll(".type__btn");
  btnTypeAll.forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      btnChoise.classList.toggle("location__shop--desactive");
      renderCard.default(element.dataset.atribute);
    });
  });
}

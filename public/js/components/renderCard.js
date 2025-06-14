export default function renderCard(part, docId) {
  const card = document.createElement("div");
  card.className = "part-card";

  const title = document.createElement("h3");
  title.className = "part-card__title";
  title.textContent = part.name;
  card.appendChild(title);

  const article = document.createElement("p");
  article.className = "part-card__article";
  article.textContent = `артикул у поставщика: ${part.lm}`;
  card.appendChild(article);

  const sizeWrapper = document.createElement("div");
  sizeWrapper.className = "part-card__size-wrapper";

  const sizeOne = document.createElement("p");
  sizeOne.className = "part-card__size";

  const sizeTwo = document.createElement("p");
  sizeTwo.className = "part-card__size";

  const sizeThree = document.createElement("p");
  sizeThree.className = "part-card__size";

  //   правила дял карточек

  switch (part.type) {
    case "pannier":
      sizeOne.textContent = `Ширина: ${part.sizeone}`;
      sizeTwo.textContent = `Глубина: ${part.sizetwo}`;
      sizeThree.textContent = `Высота: ${part.sizethree}`;
      break;

    case "dividerPannier":
    case "baseFoot":
    case "pairBrackets":
    case "trapezoidalMetalSheetDivider":
    case "metalSeparatorLdsp":
      sizeOne.textContent = `Глубина: ${part.sizeone}`;
      sizeTwo.textContent = `Высота: ${part.sizetwo}`;
      break;

    case "perforatedSheet":
    case "latticeShelf":
      sizeOne.textContent = `Ширина: ${part.sizeone}`;
      sizeTwo.textContent = `Глубина: ${part.sizetwo}`;
      break;

    case "frontSupportWithSlots":
    case "rearSupportWithSlots":
    case "frontWireLimiter":
    case "crossbarPerforated":
    case "crossbar":
    case "topCover":
      sizeOne.textContent = `Ширина: ${part.sizeone}`;
      break;

    case "metalSheetDivider":
      sizeOne.textContent = `Глубина: ${part.sizeone}`;
      break;

    case "hanger":
      sizeOne.textContent = `Диаметр: ${part.sizeone}`;
      sizeTwo.textContent = `Длинна: ${part.sizetwo}`;
      break;

    case "rack":
      sizeOne.textContent = `Толщина: ${part.sizeone}`;
      sizeTwo.textContent = `Ширина: ${part.sizetwo}`;
      sizeThree.textContent = `Высота: ${part.sizethree}`;
      break;

    case "plainBackPanel":
      sizeOne.textContent = `Ширина: ${part.sizeone}`;
      sizeTwo.textContent = `Высота: ${part.sizetwo}`;
      break;

    case "stub":
    case "shelvingFrame":
    case "fixingBracket":
      sizeOne.textContent = "";
      sizeTwo.textContent = "";
      sizeThree.textContent = "";
      break;

    case "adjustableFootWithoutBase":
      sizeOne.textContent = `Толщина: ${part.sizeone}`;
      sizeTwo.textContent = `Ширина: ${part.sizetwo}`;
      break;

    case "crossBeamVpa40":
    case "crossBeam":
      sizeOne.textContent = `Длинна: ${part.sizeone}`;
      break;

    case "reversibleBeam":
      sizeOne.textContent = `Длинна: ${part.sizeone}`;
      sizeTwo.textContent = `Высота: ${part.sizetwo}`;
      sizeThree.textContent = `Высота: ${part.sizethree}`;
      break;

    default:
      // Если тип неизвестен — можно очистить или оставить как есть
      sizeOne.textContent = "";
      sizeTwo.textContent = "";
      sizeThree.textContent = "";
      break;
  }

  sizeWrapper.appendChild(sizeOne);
  sizeWrapper.appendChild(sizeTwo);
  sizeWrapper.appendChild(sizeThree);

  card.appendChild(sizeWrapper);

  const quantity = document.createElement("p");
  quantity.className = "part-card__quantity";
  quantity.textContent = `Количество: ${part.quantity}`;
  card.appendChild(quantity);

  const btnWrapper = document.createElement("div");
  btnWrapper.className = "part-card__btn-wrapper";

  const plusBtn = document.createElement("button");
  plusBtn.className = "part-card__quantity-btn btn";
  plusBtn.textContent = "+1";
  plusBtn.dataset.id = docId;
  plusBtn.dataset.quantity = "1";

  const input = document.createElement("input");
  input.type = "number";
  input.min = "0"
  input.placeholder = "Введите количество";
  input.className = "part-card__input input";
  input.dataset.id = docId;

  const minusBtn = document.createElement("button");
  minusBtn.className = "part-card__quantity-btn btn";
  minusBtn.textContent = "-1";
  minusBtn.dataset.id = docId;
  minusBtn.dataset.quantity = "-1";

  if (part.quantity <= 0) {
    minusBtn.disabled = true;
  }

  btnWrapper.appendChild(minusBtn);
  btnWrapper.appendChild(input);
  btnWrapper.appendChild(plusBtn);
  
  card.appendChild(btnWrapper);

  return card;
}

// Инициализация Firebase
const db = await import("./firebaseConfig.js");
// "слушает" выбранный магазин
const getStoreKeyFromShop = await import("./getStoreKeyFromShop.js");
// рендер карточек оборудования
const renderCard = await import("./renderCard.js");

import { btnChangeQuantity } from "./btnChangeQuantity.js";
import { inputChangeQuantity } from "./inputChangeQuantity.js";
import { compareBySizes } from "./compareBySizes.js";

const locationShopName = document.querySelector(".location__shop-name");
const appEl = document.querySelector(".app");
const btnBackEl = document.querySelector(".btn-back");

// Загрузка и отображение данных
export default async function loadParts(type) {
  const shopName = locationShopName.textContent.trim();
  const storeKey = getStoreKeyFromShop.default(shopName);

  const snapshot = await db.default().collection("fiveStores").get();

  window.scrollTo({ top: 0 });

  if (btnBackEl.classList.contains("visually-hidden")) {
    btnBackEl.classList.toggle("visually-hidden");
  }

  appEl.innerHTML = "";

  const availableParts = [];
  const unavailableParts = [];

  snapshot.docs.forEach((doc) => {
    const part = doc.data();
    const quantity = part.quantity?.[storeKey] ?? 0;

    if (part.type === type) {
      const item = { part, id: doc.id, quantity };

      if (quantity > 0) {
        availableParts.push(item);
      } else {
        unavailableParts.push(item);
      }
    }
  });

  availableParts.sort(compareBySizes);
  unavailableParts.sort(compareBySizes);

  [...availableParts, ...unavailableParts].forEach(({ part, id, quantity }) => {
    const cardEl = renderCard.default({ ...part, quantity }, id);
    appEl.appendChild(cardEl);
  });

  btnChangeQuantity(storeKey, type, loadParts, db.default());
  inputChangeQuantity(storeKey, type, loadParts, db.default());
}

const renderCard = await import("./renderCard.js");
const locationShopName = document.querySelector('.location__shop-name');
console.log("API KEY:", process.env.REACT_APP_FIREBASE_API_KEY);

// Инициализация Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const appEl = document.querySelector(".app");
const btnBackEl = document.querySelector(".btn-back");

// Загрузка и отображение данных
export default async function loadParts(type) {
  
  console.log(locationShopName.textContent);
  
  const snapshot = await db.collection("varshavskoeShosseCollectionNew").get();
  window.scrollTo({
    top: 0,
  });
  if (btnBackEl.classList.contains("visually-hidden")) {
    btnBackEl.classList.toggle("visually-hidden");
  }
  appEl.innerHTML = "";

  // Массивы для хранения товаров в наличии и без
  const availableParts = [];
  const unavailableParts = [];

  // Разделяем товары по наличию
snapshot.docs.forEach((doc) => {
  const part = doc.data();

  if (part.type === type) {
    const item = { part, id: doc.id };

    if (part.quantity > 0) {
      availableParts.push(item);
    } else {
      unavailableParts.push(item);
    }
  }
});

// Функция сортировки
function compareBySizes(a, b) {
  const fields = ["sizeone", "sizetwo", "sizethree"];

  for (const field of fields) {
    const aVal = a.part[field];
    const bVal = b.part[field];

    // Если оба значения есть — сравниваем по убыванию
    if (aVal !== undefined && bVal !== undefined) {
      if (aVal > bVal) return -1;
      if (aVal < bVal) return 1;
    }

    // Если только одно значение есть — оно считается "больше"
    if (aVal !== undefined && bVal === undefined) return -1;
    if (aVal === undefined && bVal !== undefined) return 1;
  }

  // Если все поля отсутствуют или равны — считаем равными
  return 0;
}

// Сортируем обе группы
availableParts.sort(compareBySizes);
unavailableParts.sort(compareBySizes);

  // Сначала отрисовываем товары в наличии
  availableParts.forEach(({ part, id }) => {
    const cardEl = renderCard.default(part, id);
    appEl.appendChild(cardEl);
  });

  // Затем — товары, которых нет в наличии
  unavailableParts.forEach(({ part, id }) => {
    const cardEl = renderCard.default(part, id);
    appEl.appendChild(cardEl);
  });

  const btnChangeQuantity = document.querySelectorAll(
    ".part-card__quantity-btn"
  );

  // логика изменения количества
  // кнопки
  btnChangeQuantity.forEach((element) => {
    element.addEventListener("click", async function (e) {
      e.preventDefault();
      const delta = Number(element.dataset.quantity);
      const partRef = db
        .collection("varshavskoeShosseCollectionNew")
        .doc(element.dataset.id);
      try {
        const partSnap = await partRef.get();
        const part = partSnap.data();
        const newQuantity = part.quantity + delta;
        // Проверка на отрицательное количество
        if (newQuantity < 0) {
          alert("Количество не может быть меньше нуля");
          return;
        }
        await partRef.update({
          quantity: newQuantity,
        });
        loadParts(type);
      } catch (error) {
        console.error("Ошибка при обновлении количества:", error);
      }
    });
  });

  // инпут
  const inputChangeQuantity = document.querySelectorAll(".part-card__input");
  inputChangeQuantity.forEach((element) => {
    element.addEventListener("change", async function (e) {
      e.preventDefault();
      const newQuantity = Number(element.value);
      // Проверка на отрицательное значение
      if (isNaN(newQuantity) || newQuantity < 0) {
        alert("Количество не может быть отрицательным");
        element.value = "";
        return;
      }
      try {
        const partRef = db
          .collection("varshavskoeShosseCollectionNew")
          .doc(element.dataset.id);
        await partRef.update({
          quantity: newQuantity,
        });
        loadParts(type);
      } catch (error) {
        console.error("Ошибка при обновлении количества:", error);
      }
    });
  });
}

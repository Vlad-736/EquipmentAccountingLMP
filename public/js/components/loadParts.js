const renderCard = await import("./renderCard.js");

// Инициализация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCxOJXpsgn-QbHJ1IXm3YTUfvmYyTapyJM",
  authDomain: "equipmentaccountinglmp.firebaseapp.com",
  projectId: "equipmentaccountinglmp",
  storageBucket: "equipmentaccountinglmp.firebasestorage.app",
  messagingSenderId: "662492962421",
  appId: "1:662492962421:web:97e5158288d4766a8fa23c",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const appEl = document.querySelector(".app");
const btnBackEl = document.querySelector(".btn-back");

// Загрузка и отображение данных
export default async function loadParts(type) {
  const snapshot = await db.collection("varshavskoeShosseCollectionNew").get();
  window.scrollTo({
    top: 0,
  });
  if (btnBackEl.classList.contains("visually-hidden")) {
    btnBackEl.classList.toggle("visually-hidden");
  }
  appEl.innerHTML = "";
  snapshot.docs.forEach((doc) => {
    const part = doc.data();
    if (part.type === type) {
      const cardEl = renderCard.default(part, doc.id);
      appEl.appendChild(cardEl);
    }
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
      const partRef = db.collection("varshavskoeShosseCollectionNew").doc(element.dataset.id);
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
        element.value = ""
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

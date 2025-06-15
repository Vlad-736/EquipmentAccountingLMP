export function btnChangeQuantity(storeKey, type, loadParts, db) {
  const btnChangeQuantity = document.querySelectorAll(
    ".part-card__quantity-btn"
  );

  btnChangeQuantity.forEach((element) => {
    element.addEventListener("click", async function (e) {
      e.preventDefault();
      const delta = Number(element.dataset.quantity);
      const docId = element.dataset.id;
      const partRef = db.collection("fiveStores").doc(docId);

      try {
        const partSnap = await partRef.get();
        const part = partSnap.data();
        const currentQuantity = part.quantity?.[storeKey] ?? 0;
        const newQuantity = currentQuantity + delta;

        if (newQuantity < 0) {
          alert("Количество не может быть меньше нуля");
          return;
        }

        await partRef.update({
          [`quantity.${storeKey}`]: newQuantity,
        });

        loadParts(type); // перезагружаем список
      } catch (error) {
        console.error("Ошибка при обновлении количества:", error);
      }
    });
  });
}

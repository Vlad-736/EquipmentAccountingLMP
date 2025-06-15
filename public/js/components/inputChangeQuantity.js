export function inputChangeQuantity(storeKey, type, loadParts, db) {
  const inputChangeQuantity = document.querySelectorAll(".part-card__input");

  inputChangeQuantity.forEach((element) => {
    element.addEventListener("change", async function (e) {
      e.preventDefault();
      const newQuantity = Number(element.value);
      const docId = element.dataset.id;

      if (isNaN(newQuantity) || newQuantity < 0) {
        alert("Количество не может быть отрицательным");
        element.value = "";
        return;
      }

      try {
        const partRef = db.collection("fiveStores").doc(docId);
        await partRef.update({
          [`quantity.${storeKey}`]: newQuantity,
        });

        loadParts(type);
      } catch (error) {
        console.error("Ошибка при обновлении количества:", error);
      }
    });
  });
}

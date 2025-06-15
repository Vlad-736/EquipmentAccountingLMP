export default function getStoreKeyFromShop(shopName) {
  const map = {
    "Варшавское шоссе": "store1",
    "Магазин 2": "store2",
    "Магазин 3": "store3",
    "Магазин 4": "store4",
    "Магазин 5": "store5",
  };

  return map[shopName] || "store1"; // по умолчанию store1
}

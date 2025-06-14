export default async function fetchButtonsData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    const data = await response.json();
    return data; // массив объектов
  } catch (error) {
    console.error("Не удалось загрузить JSON:", error);
    return null;
  }
}
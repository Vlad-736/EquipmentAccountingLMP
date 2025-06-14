const fs = require('fs');

// Загрузка исходного файла
const rawData = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(rawData);

// Преобразование
const updated = data.map(item => ({
  ...item,
  quantity: {
    store1: item.quantity || 0,
    store2: 0,
    store3: 0,
    store4: 0,
    store5: 0
  }
}));

// Сохранение в новый файл
fs.writeFileSync('output.json', JSON.stringify(updated, null, 2), 'utf8');

console.log('✅ JSON обновлён и сохранён в output.json');
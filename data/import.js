const admin = require('firebase-admin');
const fs = require('fs');

// Инициализация Firebase Admin SDK
const serviceAccount = require('./equipmentaccountinglmp-firebase-adminsdk-fbsvc-7ac77cd234.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Читаем JSON-файл
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

async function importData() {
  const batch = db.batch();

  data.forEach((item) => {
    // Создаем новый документ с автоматическим ID в коллекции "myCollection"
    const docRef = db.collection('varshavskoeShosseCollectionNew').doc();
    batch.set(docRef, item);
  });

  await batch.commit();
  console.log('Данные импортированы!');
}

importData().catch(console.error);

// node import.js  
// Внимание!!!! не перезаписывает файл, а добавляет строки!

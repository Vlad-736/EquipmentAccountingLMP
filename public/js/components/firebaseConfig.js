export default function firebaseConfig() {
  const firebaseConfig = {
    apiKey: "AIzaSyCxOJXpsgn-QbHJ1IXm3YTUfvmYyTapyJM",
    authDomain: "equipmentaccountinglmp.firebaseapp.com",
    projectId: "equipmentaccountinglmp",
    storageBucket: "equipmentaccountinglmp.firebasestorage.app",
    messagingSenderId: "662492962421",
    appId: "1:662492962421:web:7fbdf79984a99fcd8fa23c",
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  return db
}

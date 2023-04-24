import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'
import { getFirestore, collection, onSnapshot, query, enableIndexedDbPersistence } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js'
import { renderRecipe } from './ui.js';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBtEWcgYH7iXFLHFv4bTmYEtHFTmtaC0WU",
  authDomain: "pwa-cookbook.firebaseapp.com",
  projectId: "pwa-cookbook",
  storageBucket: "pwa-cookbook.appspot.com",
  messagingSenderId: "1078352997432",
  measurementId: "G-CF6WRRR65K",
  appId: "1:1078352997432:web:9312e253f86af7953ccacd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
enableIndexedDbPersistence(db)

const getData = async collectionName => {
  const q = query(collection(db, collectionName))
  
  const snapshot = onSnapshot(q, querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if(change.type === "added") {
        // Tilføj data til app
        renderRecipe(change.doc.data(), change.doc.id)
      }
      if(change.type === "removed") {
        // Fjern data fra app
      }

    })
  })
}

export { db, getData }
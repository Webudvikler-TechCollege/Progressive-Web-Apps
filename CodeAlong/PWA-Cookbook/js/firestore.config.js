import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'
import { getFirestore, getDocs, collection, onSnapshot, query } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js'

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

export { db }
// firebase.js (for non-module HTML apps)

// Include only what you need
const firebaseConfig = {
  apiKey: "AIzaSyDRQs2v98EzMJbnM92g-zYAMg6LPQCrAwY",
  authDomain: "ecoconect-54e53.firebaseapp.com",
  projectId: "ecoconect-54e53",
  storageBucket: "ecoconect-54e53.appspot.com",  // ✅ FIXED
  messagingSenderId: "331094179790",
  appId: "1:331094179790:web:d3a959b0567d6e1011759f",
  measurementId: "G-FQ2V4HZ7Q2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore
const db = firebase.firestore();
const auth = firebase.auth();

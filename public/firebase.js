// firebase.js (for <script> setup, NOT modules)

// Your Firebase config (public-safe values)
const firebaseConfig = {
  apiKey: "AIzaSyDRQs2v98EzMJbnM92g-zYAMg6LPQCrAwY",
  authDomain: "ecoconect-54e53.firebaseapp.com",
  projectId: "ecoconect-54e53",
  storageBucket: "ecoconect-54e53.appspot.com",  // ✅ FIXED suffix
  messagingSenderId: "331094179790",
  appId: "1:331094179790:web:d3a959b0567d6e1011759f",
  measurementId: "G-FQ2V4HZ7Q2"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Optional: enable analytics if needed
// firebase.analytics();

// Shortcuts (global access)
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage(); // if you use profile images later

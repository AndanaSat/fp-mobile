// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoHYRh9AGe6YaAxnSm7GpfbY-hi2vr0c0",
  authDomain: "fpmobile-2b7f3.firebaseapp.com",
  projectId: "fpmobile-2b7f3",
  storageBucket: "fpmobile-2b7f3.appspot.com",
  messagingSenderId: "1040852285564",
  appId: "1:1040852285564:web:6e5a3457f5931eea53f1f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
module.exports = { auth };
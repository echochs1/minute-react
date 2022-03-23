// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "minute-802a0.firebaseapp.com",
  databaseURL: "https://minute-802a0-default-rtdb.firebaseio.com",
  projectId: "minute-802a0",
  storageBucket: "minute-802a0.appspot.com",
  messagingSenderId: "1026593178778",
  appId: "1:1026593178778:web:2121c5e86e407caa388b23",
  measurementId: "G-MWKFKZZGX1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

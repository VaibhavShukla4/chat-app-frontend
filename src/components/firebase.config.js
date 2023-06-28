// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYpMdK0ayBwirpuxDYkbbtxSwriSoWYCk",
  authDomain: "chat-app-63761.firebaseapp.com",
  projectId: "chat-app-63761",
  storageBucket: "chat-app-63761.appspot.com",
  messagingSenderId: "638974235878",
  appId: "1:638974235878:web:5efc9f6b817ea2fce69727",
  measurementId: "G-4TB56SSBTZ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Now you can access Firebase services
const firestore = firebase.firestore();
const auth = firebase.auth();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { auth, analytics, firestore };

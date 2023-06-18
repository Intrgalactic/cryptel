// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7QpVnm_ATrD5KPlhDHx_ewqLNuoliZ30",
  authDomain: "cryptel.firebaseapp.com",
  projectId: "cryptel",
  storageBucket: "cryptel.appspot.com",
  messagingSenderId: "706767204156",
  appId: "1:706767204156:web:d7d85dc989c531e36ef839",
  measurementId: "G-YKTW40EXR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
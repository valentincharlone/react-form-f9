// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5Cy_WpDfiRZrWVjvB-tIV6bzoQ-ail2g",
  authDomain: "react-fb9-form.firebaseapp.com",
  projectId: "react-fb9-form",
  storageBucket: "react-fb9-form.appspot.com",
  messagingSenderId: "514142911788",
  appId: "1:514142911788:web:49d43df701b385189b8089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export {auth, db}
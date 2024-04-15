import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyDOVct7K93ie5KnHoApLyDCEOlafiYNrWc",
  authDomain: "login-and-sing-up-3f02c.firebaseapp.com",
  databaseURL: "https://login-and-sing-up-3f02c-default-rtdb.firebaseio.com",
  projectId: "login-and-sing-up-3f02c",
  storageBucket: "login-and-sing-up-3f02c.appspot.com",
  messagingSenderId: "473224747774",
  appId: "1:473224747774:web:11fa857f82d48a72a363af",
  measurementId: "G-FBZFGV4YTD"
};


// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);
export default  app;





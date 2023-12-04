
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";


  const firebaseConfig = {
    apiKey: "AIzaSyA9Y6qB5_rIV7UUca8aI0cBjlizMYH2V2c",
    authDomain: "test-login-ab469.firebaseapp.com",
    projectId: "test-login-ab469",
    storageBucket: "test-login-ab469.appspot.com",
    messagingSenderId: "38502694877",
    appId: "1:38502694877:web:5d7369ab3ad1ad27560034",
    measurementId: "G-CHVN9M534B"
  };



  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
import { auth, db } from "./config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";


const form = document.querySelector(".signupForm");
const name = document.querySelector("#First-Name");
const rename = document.querySelector("#last-name");
const password = document.querySelector("#signupPassword");
const email = document.querySelector("#signupUserEmail");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log(user);

      return addDoc(collection(db, "user"), {
        name: name.value,
        email: email.value,
        rename:rename.value,   
        uid: user.uid,
      });
    })
    .then(() => {
      window.location = "login.html";
     

      // Clear input fields
      password.value = "";
      email.value = "";
      name.value = "";
      
    
    })
    .catch((error) => {
     
      const errorMessage = error.message;
      console.error(errorMessage);
    });
});
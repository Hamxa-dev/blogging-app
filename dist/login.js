import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector("#login-form");
const email = document.querySelector("#loginUserEmail");
const password = document.querySelector("#loginPassword");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
.then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    
  
    
      window.location = 'Home.html'

})
.catch((error) => {

  const errorMessage = error.message;
  console.log(errorMessage);

});
 
});

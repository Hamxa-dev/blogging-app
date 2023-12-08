import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";



const logout = document.querySelector("#loged");
const homeDiv = document.querySelector("#home-div3");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("User not authenticat");
  }
});

const currentTime = new Date();
const currentHour = currentTime.getHours();
let greeting;

if (currentHour >= 5 && currentHour < 12) {
  greeting = "Good Morning";
} else if (currentHour >= 12 && currentHour < 17) {
  greeting = "Good Afternoon";
} else if (currentHour >= 17 && currentHour < 21) {
  greeting = "Good Evening";
} else {
  greeting = "Good Night";
}

const renderPost = (user, post) => {
  const idName = user.data().name;
  const image = user.data().imageUrl;
  const timestamp = post.data().postDate.seconds;
  const date = new Date(timestamp * 1000);
  const daterender = date.toLocaleDateString();
};

// Logout event listener
logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Logout successful");
      window.location = "log.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

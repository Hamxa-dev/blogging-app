
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
    collection,
    getDocs,
    query,
    where,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { auth, db } from "./config.js";

// Assuming you have an HTML element with the id 'container'
const container = document.getElementById('container');

onAuthStateChanged(auth, async (user) => {
    try {
        if (user) {
            const uid = user.uid;
            console.log("userUid ===>", uid);

            const userQuery = query(collection(db, "users"), where("uid", "==", uid));
            const userQuerySnapshot = await getDocs(userQuery);

            if (userQuerySnapshot.empty) {
                console.log("No matching documents for user UID:", uid);
                // Handle the case where no matching document is found
            } else {
                userQuerySnapshot.forEach((userDoc) => {
                    console.log(userDoc.data());
                    container.innerHTML = userDoc.data().name;
                });
            }
        } else {
            window.location = "login.html";
        }
    } catch (error) {
        console.error("Error:", error.message);
        // Handle the error as needed
    }
});


const title = document.querySelector("#title")
const discription = document.querySelector("#discription")
const form = document.querySelector(".form")




form.addEventListener("submit", (e)=>{
    e.preventDefault();
    
})
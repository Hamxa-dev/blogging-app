import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { 
  collection, 
  addDoc, 
  getDocs, 
  Timestamp, 
  query, 
  orderBy, 
  where, 
  deleteDoc, 
  doc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

import { auth, db } from "./config.js";



onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
      const userQuerySnapshot = await getDocs(userQuery);
  
      userQuerySnapshot.forEach((userDoc) => {
        console.log(userDoc.data());
        document.querySelector(".user-name").innerText = userDoc.data().name;
      });
    
  
    //   await renderTasks(user.uid);
    } else {
        window.location = "login.html";
    }
  });




  const title = document.querySelector("#title")
  const description = document.querySelector("#description")
  const form = document.querySelector(".form")
  let arry =[]
  
  form.addEventListener ("submit", async(e)=>{
      e.preventDefault();
      const obj ={
        title: title.value,
        Description: description.value,
        uid:auth.currentUser.uid,
        postDate: Timestamp.fromDate(new Date())
    }
    try {
        const docRef = await addDoc(collection(db, "posts"),obj);
        console.log("Document written with ID: ", docRef.id);
        console.log(arry);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      arry.push(obj)


  })





const logoutButton = document.querySelector("#logoutBtn");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("logout");
      window.location = "login.html";
    })
    .catch((error) => {
      console.error(error);
    });
});
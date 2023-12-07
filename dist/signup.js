import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { auth, db, storage } from "./config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const form = document.querySelector(".signupForm");
const firstName = document.querySelector("#First-Name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#signupUser-Email");
const password = document.querySelector("#signup-Password");
const repeatPassword = document.querySelector("#repeat-password");
const uploadPhoto = document.querySelector("#upload-photo");





form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  // Show loading message
  const loadingMessage = document.getElementById('loading-message');
  loadingMessage.style.display = 'block';

  if (password.value !== repeatPassword.value) {
    console.error("Passwords do not match");

    // Hide loading message if there's an error
    loadingMessage.style.display = 'none';
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    const file = uploadPhoto.files[0];
    if (!file) {
      console.error("No file selected for upload.");

      // Hide loading message if there's an error
      loadingMessage.style.display = 'none';
      return;
    }

    // Uploading Profile Picture
    const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    // Add User to Firestore
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      uid: user.uid,
      profilePic: url
    };

    await addDoc(collection(db, "users"), userData);

    console.log('User added to DB');
    window.location.href = "login.html";
  } catch (error) {
    console.error('Error creating user:', error.code, error.message);
  } finally {
    // Hide loading message after completion (whether success or error)
    loadingMessage.style.display = 'none';
  }
});

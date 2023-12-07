import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyDa7snxEPB0yiDAWPz7oBua0tnadmb1RSI",
  authDomain: "bloggin-app-5fd75.firebaseapp.com",
  projectId: "bloggin-app-5fd75",
  storageBucket: "bloggin-app-5fd75.appspot.com",
  messagingSenderId: "169376311090",
  appId: "1:169376311090:web:7382850b348cb1b006d92b",
  measurementId: "G-VGT2DKXBQE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, ref, uploadBytes, getDownloadURL };

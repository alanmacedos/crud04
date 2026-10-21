import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2d0hsOBqHml12LWJwlMBtY-jj94YvFAM",
  authDomain: "democrati.firebaseapp.com",
  databaseURL: "https://democrati-default-rtdb.firebaseio.com/",
  projectId: "democrati",
  storageBucket: "democrati.firebasestorage.app",
  messagingSenderId: "564774972239",
  appId: "1:564774972239:web:f56abb043ba041cdfe733a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
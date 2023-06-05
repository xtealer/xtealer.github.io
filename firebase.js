// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARzk7wm9Q7smOmZVbxi7rMif4JqWy9-cQ",
  authDomain: "xtealer-web.firebaseapp.com",
  projectId: "xtealer-web",
  storageBucket: "xtealer-web.appspot.com",
  messagingSenderId: "588921366512",
  appId: "1:588921366512:web:97853f46a84562bb4f5f35",
  measurementId: "G-D2YQSQ4ETY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

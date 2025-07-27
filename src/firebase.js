// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP_-7S3z-yUb4v4RcYWtQsP7q1f_528Oo",
  authDomain: "my-canvas-task.firebaseapp.com",
  projectId: "my-canvas-task",
  storageBucket: "my-canvas-task.firebasestorage.app",
  messagingSenderId: "274357520257",
  appId: "1:274357520257:web:1881aff26a6651936bca80",
  measurementId: "G-E2VQ72WBZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

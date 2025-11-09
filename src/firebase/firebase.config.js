// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdrwLOOKYRg5oqJGnKrwdQ34kUbc7QDE8",
  authDomain: "assignment-10-83d48.firebaseapp.com",
  projectId: "assignment-10-83d48",
  storageBucket: "assignment-10-83d48.firebasestorage.app",
  messagingSenderId: "884721598637",
  appId: "1:884721598637:web:c98a4120cc819895730624"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
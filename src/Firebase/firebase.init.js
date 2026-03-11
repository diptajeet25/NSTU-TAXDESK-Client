// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl11NATToXG53tkyVM-x--udahM3Kx2WM",
  authDomain: "nstu-taxdesk.firebaseapp.com",
  projectId: "nstu-taxdesk",
  storageBucket: "nstu-taxdesk.firebasestorage.app",
  messagingSenderId: "869450764108",
  appId: "1:869450764108:web:137a14bc8e0421d062c9e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
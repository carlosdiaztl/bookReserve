// Import the functions you need from the SDKs you need
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK3bhU_T6kB5ETNYKyfzK-PbCSSWVM03o",
  authDomain: "bookreserve-app.firebaseapp.com",
  projectId: "bookreserve-app",
  storageBucket: "bookreserve-app.appspot.com",
  messagingSenderId: "940603464076",
  appId: "1:940603464076:web:44de2a1e40b82059eb9ea9"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
export const google = new GoogleAuthProvider();
export const facebook= new FacebookAuthProvider()
// const analytics = getAnalytics(app);

import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJSx3Vg46V2TsvGfp9b8Aj0mhNsOII8Gs",
  authDomain: "interviewpal-efe83.firebaseapp.com",
  projectId: "interviewpal-efe83",
  storageBucket: "interviewpal-efe83.firebasestorage.app",
  messagingSenderId: "531124092528",
  appId: "1:531124092528:web:111ac3686d21a9ceddbeb5",
  measurementId: "G-NZ00DRY5NZ",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

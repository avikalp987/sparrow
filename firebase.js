// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "sparrow-eb68c.firebaseapp.com",
  projectId: "sparrow-eb68c",
  storageBucket: "sparrow-eb68c.appspot.com",
  messagingSenderId: "683253335634",
  appId: "1:683253335634:web:5e83617f8052b115af018b"
};

// Initialize Firebase
const app = !getApps().length() ?  initializeApp(firebaseConfig) : getApp();

const db = getStorage();
export { app,db,storage };
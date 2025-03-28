
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAjoWn_mgdzgrqlm7u8yLEUO4lTwXBNKuA",
  authDomain: "satva-krishi.firebaseapp.com",
  projectId: "satva-krishi",
  storageBucket: "satva-krishi.firebasestorage.app",
  messagingSenderId: "368113073764",
  appId: "1:368113073764:web:8123bc914c35721e7fa971",
  measurementId: "G-TK3L081P6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage, analytics};
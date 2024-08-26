import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA9VTFZ1CAWFqGu4VPQ6ggOGGnUItoPOoo",
  authDomain: "react-auth-36f5c.firebaseapp.com",
  projectId: "react-auth-36f5c",
  storageBucket: "react-auth-36f5c.appspot.com",
  messagingSenderId: "1003853079661",
  appId: "1:1003853079661:web:808038a588fb160a970b64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

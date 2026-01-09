// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBv1NGxGT5nq9_vtjSZ8WsJciHyCTspQg8",
  authDomain: "double-plai.firebaseapp.com",
  projectId: "double-plai",
  storageBucket: "double-plai.firebasestorage.app",
  messagingSenderId: "964896722628",
  appId: "1:964896722628:web:0f71850f075ad35b054391",
  measurementId: "G-3313PKB3FH"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
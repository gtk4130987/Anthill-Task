// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCSwwaLW5nYGmVcghGUQEjQRoA5SIUErU",
  authDomain: "second-hand-car-buy-sell.firebaseapp.com",
  projectId: "second-hand-car-buy-sell",
  storageBucket: "second-hand-car-buy-sell.appspot.com", // ✅ Fixed URL
  messagingSenderId: "26995084816",
  appId: "1:26995084816:web:a84156ede85fcee8300495",
  measurementId: "G-NRYF5WJZJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ Ensure auth is linked to app
export const db = getFirestore(app); // ✅ Initialize Firestore

// Initialize Google Provider
const googleProvider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In Successful:", result.user);
    return result.user; // Returns the authenticated user object
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null; // Handle errors
  }
};

export default app;

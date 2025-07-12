// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions"; 
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzZCDEJ9l9pY78KxbrC3YfdN92rVwuzdo",
  authDomain: "jpmc-593bf.firebaseapp.com",
  projectId: "jpmc-593bf",
  storageBucket: "jpmc-593bf.firebasestorage.app",
  messagingSenderId: "75464909626",
  appId: "1:75464909626:web:8ce871b8cda47d790ee603"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

export const googleSignIn = () => auth.signInWithPopup(googleAuthProvider);
export const signOut = () => auth.signOut();

export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
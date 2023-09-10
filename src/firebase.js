// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//sdk-rahul

// const firebaseConfig = {
//   apiKey: "AIzaSyD8MNKTj_LQhBPhWAbsyWEYf4nJ7YRmEIA",
//   authDomain: "esbookify-project.firebaseapp.com",
//   projectId: "esbookify-project",
//   storageBucket: "esbookify-project.appspot.com",
//   messagingSenderId: "784779756902",
//   appId: "1:784779756902:web:b684cd7b1ee9866b91b4a7",
//   measurementId: "G-FVTGSDVCBR"
// };

//my sdk
const firebaseConfig = {
  apiKey: "AIzaSyBxgoJ5FuFAzS0H1yZPn1f8O-kxe_j0hfU",
  authDomain: "esbookify.firebaseapp.com",
  projectId: "esbookify",
  storageBucket: "esbookify.appspot.com",
  messagingSenderId: "883569973998",
  appId: "1:883569973998:web:5d60a9b695fd24d118b1ff",
  measurementId: "G-2BGZN4N3BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider ()
export {app,auth,provider}
export const db  = getFirestore()
// Import the functions you need from the SDKs you need
import {initializeApp} from "@firebase/auth"
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8MNKTj_LQhBPhWAbsyWEYf4nJ7YRmEIA",
  authDomain: "esbookify-project.firebaseapp.com",
  projectId: "esbookify-project",
  storageBucket: "esbookify-project.appspot.com",
  messagingSenderId: "784779756902",
  appId: "1:784779756902:web:b684cd7b1ee9866b91b4a7",
  measurementId: "G-FVTGSDVCBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app,auth}
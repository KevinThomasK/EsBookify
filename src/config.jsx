
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'


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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};

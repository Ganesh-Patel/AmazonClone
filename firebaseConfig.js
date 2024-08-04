import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUs8CFaIPoerk6OS16GD4e3S0y93ydcDo",
  authDomain: "clone-ac67d.firebaseapp.com",
  projectId: "clone-ac67d",
  storageBucket: "clone-ac67d.appspot.com",
  messagingSenderId: "430712176424",
  appId: "1:430712176424:web:6a8106771a1929fd431a1d",
  measurementId: "G-9V6ER1Q5TT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
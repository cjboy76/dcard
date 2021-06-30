import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsS_z27Wm_sVbVP9jtAm38JuPPx-N_nOk",
  authDomain: "dcard-118f3.firebaseapp.com",
  projectId: "dcard-118f3",
  storageBucket: "dcard-118f3.appspot.com",
  messagingSenderId: "13515545248",
  appId: "1:13515545248:web:172a88c9c49dbf3a2ac7c5",
};

// initialize Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const usersCollection = db.collection("users");

export { db, auth, usersCollection };

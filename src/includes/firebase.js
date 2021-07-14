import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsS_z27Wm_sVbVP9jtAm38JuPPx-N_nOk",
  authDomain: "dcard-118f3.firebaseapp.com",
  projectId: "dcard-118f3",
  storageBucket: "dcard-118f3.appspot.com",
  appId: "1:13515545248:web:172a88c9c49dbf3a2ac7c5",
};

// initialize Firestore
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

const usersCollection = db.collection("users");
const articlesCollection = db.collection("articles");
const commentsCollection = db.collection("comments");

export {
  db,
  auth,
  usersCollection,
  storage,
  articlesCollection,
  timeStamp,
  commentsCollection,
};

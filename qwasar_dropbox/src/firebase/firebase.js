import firebase from "firebase/app"
import { initializeApp } from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyC1lSFzufuynOouqyd-jdymqC-wroq-uwg",
  authDomain: "drop-box-f22cf.firebaseapp.com",
  databaseURL: "https://drop-box-f22cf-default-rtdb.firebaseio.com",
  projectId: "drop-box-f22cf",
  storageBucket: "drop-box-f22cf.appspot.com",
  messagingSenderId: "1057069702337",
  appId: "1:1057069702337:web:4d1398fac0c2fb5562c840"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = app.firestore()
export const database = {
  files: firestore.collection("files"),
  folders: firestore.collection("folders"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}
export const auth = app.auth();
export const storage = app.storage();

export default app;
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbEfgQn4qAJ3otCj9WuN0f1xwt-1cFu4w",
  authDomain: "netflix-soft-clone.firebaseapp.com",
  projectId: "netflix-soft-clone",
  storageBucket: "netflix-soft-clone.appspot.com",
  messagingSenderId: "119689866726",
  appId: "1:119689866726:web:21a1475de07b7cb3edfa27",
  measurementId: "G-HS36EJH4ZB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }; 
export default db;
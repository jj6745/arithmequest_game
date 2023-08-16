import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
    getAuth,
    EmailAuthProvider,
    signOut,
    onAuthStateChanged
  } from 'firebase/auth';
  
  import {
    getFirestore,
    addDoc,
    collection
  } from 'firebase/firestore';
const config = {
    apiKey: "AIzaSyDgg7ZDaeqcOH4kc5rt4-psWsow6yHBLzY",
    authDomain: "fir-web-codelab-c8839.firebaseapp.com",
    projectId: "fir-web-codelab-c8839",
    storageBucket: "fir-web-codelab-c8839.appspot.com",
    messagingSenderId: "316575997766",
    appId: "1:316575997766:web:6cbb9c2b997c4aabbe0f47",
    measurementId: "G-4SP5XEYC78"
  };

const fire = firebase.initializeApp(config);
export default fire;
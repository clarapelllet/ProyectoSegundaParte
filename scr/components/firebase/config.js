import app from "firebase/app";
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDGofqA0bAAyHvrDm3gXd4gPERMjNoS1w4",
    authDomain: "segunda-parte-c34ad.firebaseapp.com",
    projectId: "segunda-parte-c34ad",
    storageBucket: "segunda-parte-c34ad.appspot.com",
    messagingSenderId: "68686650264",
    appId: "1:68686650264:web:6081bc60e2c229aa6f69ed"
  };
  

  
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
import firebase from "firebase";
require("firebase/firestore");
// import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyA8SDhccnZcaIXDEL5Ey4-SE-MaJG00heo",
  authDomain: "project-19fa0.firebaseapp.com",
  databaseURL: "https://project-19fa0.firebaseio.com",
  projectId: "project-19fa0",
  storageBucket: "project-19fa0.appspot.com",
  messagingSenderId: "53220336190",
  appId: "1:53220336190:web:4fcf4d253036942b58a76f",
  measurementId: "G-3345Q3QM4N"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();

  export const auth = firebase.auth();
  export const firestore = firebase.firestore;
  export default db;

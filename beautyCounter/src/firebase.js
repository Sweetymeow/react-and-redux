// src/firebase.js
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA0Y4J-q6DMQfBwwzMTTCplw3siymlcujM",
  authDomain: "chatlolw.firebaseapp.com",
  databaseURL: "https://chatlolw.firebaseio.com",
  projectId: "chatlolw",
  storageBucket: "chatlolw.appspot.com",
  messagingSenderId: "335443221659"
};

firebase.initializeApp(config);

export default firebase;

import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAyLMMwl10oMX5kOLLSwR9y9etUQYRhb_g",
    authDomain: "attendance-9b23e.firebaseapp.com",
    databaseURL: "https://attendance-9b23e.firebaseio.com",
    projectId: "attendance-9b23e",
    storageBucket: "attendance-9b23e.appspot.com",
    messagingSenderId: "971807434773",
    appId: "1:971807434773:web:905dcb19634f34463ac61c",
    measurementId: "G-JRYPBP8PG4"
  };

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase
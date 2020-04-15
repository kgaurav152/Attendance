import * as firebase from 'firebase'
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyCg8Uid5MiewwVtFmjcTDCuUL6jU8Qsc34",
    authDomain: "online-attendance-7e3c3.firebaseio.com",
    databaseURL: "https://online-attendance-7e3c3.firebaseio.com/",
    projectId: "online-attendance-7e3c3",
    storageBucket: "online-attendance-7e3c3.appspot.com",
    messagingSenderId: "892829055437",
};

const fire = firebase.initializeApp(config);

export default fire;

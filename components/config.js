import * as firebase from 'firebase'
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyBO2MnEOPIoUTdUGb67KtNtR-r7dls5zNM",
    authDomain: "kecattendance.firebaseio.com",
    databaseURL: "https://kecattendance.firebaseio.com/",
    projectId: "kecattendance",
    storageBucket: "kecattendance.appspot.com",
    messagingSenderId: "465503007280",
};

const fire = firebase.initializeApp(config);

export default fire;

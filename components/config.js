import * as firebase from "firebase";
import "firebase/storage";

//For prod use the following Configuration
const Config = {
    apiKey: "AIzaSyBO2MnEOPIoUTdUGb67KtNtR-r7dls5zNM",
    authDomain: "kecattendance.firebaseio.com",
    databaseURL: "https://kecattendance.firebaseio.com/",
    projectId: "kecattendance",
    storageBucket: "kecattendance.appspot.com",
    messagingSenderId: "465503007280",
};

// For local use the following configuration
// const Config = {
//   apiKey: "AIzaSyCg8Uid5MiewwVtFmjcTDCuUL6jU8Qsc34",
//   authDomain: "online-attendance-7e3c3.firebaseio.com",
//   databaseURL: "https://online-attendance-7e3c3.firebaseio.com/",
//   projectId: "online-attendance-7e3c3",
//   storageBucket: "online-attendance-7e3c3.appspot.com",
//   messagingSenderId: "892829055437",
// };

const Firebase = firebase.initializeApp(Config);
export default Firebase;

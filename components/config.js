import * as firebase from 'firebase'


const config = {
    apiKey: "AIzaSyCg8Uid5MiewwVtFmjcTDCuUL6jU8Qsc34",
    authDomain: "online-attendance-7e3c3.firebaseio.com",
    databaseURL: "https://online-attendance-7e3c3.firebaseio.com/",
    projectId: "online-attendance-7e3c3"
};

const fire = firebase.initializeApp(config);

export default fire;

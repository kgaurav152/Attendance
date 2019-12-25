import * as firebase from 'firebase'


const config = {
    apiKey: "AIzaSyBtwRJAl7LTKHu0ZSAJsmapmgva1XDCwos",
    authDomain: "attendance-5d980.firebaseio.com",
    databaseURL: "https://attendance-5d980.firebaseio.com/",
    projectId: "attendance-5d980"
};

const fire = firebase.initializeApp(config);

export default fire;

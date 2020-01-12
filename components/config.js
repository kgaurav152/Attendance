import * as firebase from 'firebase'


const config = {
    apiKey: "AIzaSyBLYIcYvYSzUFdDnlS-lGkhe_YCuuf4zNc",
    authDomain: "attendance-c4d70.firebaseio.com",
    databaseURL: "https://attendance-c4d70.firebaseio.com/",
    projectId: "attendance-c4d70"
};

const fire = firebase.initializeApp(config);

export default fire;

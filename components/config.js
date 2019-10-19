import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyBLYIcYvYSzUFdDnlS-lGkhe_YCuuf4zNc',
  authDomain: 'attendance-c4d70.firebaseapp.com',
  databaseURL: 'https://attendance-c4d70.firebaseio.com/',
  projectId: 'attendance-c4d70',
  storageBucket: 'gs://attendance-c4d70.appspot.com/',
  messagingSenderId: '242643882944'
};
let app = Firebase.initializeApp(config);
export const db = app.database();
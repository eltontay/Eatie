import firebase from 'firebase/compat/app'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let auth = require('./dbconfig.json');
const firebaseConfig = {
  apiKey: auth['apiKey'],
  authDomain: auth['authDomain'],
  projectId: auth['projectId'],
  storageBucket: auth['storageBucket'],
  messagingSenderId: auth['messagingSenderId'],
  appId: auth['appId'],
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
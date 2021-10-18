import firebase from 'firebase/compat/app';

//leaving my own firebase here for testing
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
console.log('test');
console.log(firebase);
export default firebase;

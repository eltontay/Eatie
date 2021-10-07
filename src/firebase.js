import {initializeApp} from 'firebase/app';

//leaving my own firebase here for testing
let auth = require('./dbconfig.json');
const firebaseConfig = {
  apiKey: auth['apiKey'],
  authDomain: auth['authDomain'],
  projectId: auth['projectId'],
  storageBucket: auth['storageBucket'],
  messagingSenderId: auth['messagingSenderId'],
  appId: auth['appId']
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
console.log("test");
console.log(firebaseapp);
export default firebaseapp;
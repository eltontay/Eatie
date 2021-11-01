<<<<<<< HEAD
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCmZN7K7_4oNdjQjjzWL1KdEESDp9PT_3s',
  authDomain: 'eatie-d15fd.firebaseapp.com',
  projectId: 'eatie-d15fd',
  storageBucket: 'eatie-d15fd.appspot.com',
  messagingSenderId: '378221087177',
  appId: '1:378221087177:web:ac84990cda2bbcd2cfc018',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
=======
import { initializeApp} from 'firebase/app'

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
const firebaseApp = initializeApp(firebaseConfig);



export default firebaseApp;
>>>>>>> 1b06f6d79566aabebb10d9a0051a73ee6827f231

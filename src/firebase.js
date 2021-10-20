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
<template>
  <div id="firebaseui-auth-container"></div>
  <div>
    <button v-on:click="checkUser()">testing</button>
  </div>
  <!-- <form id="signInPortal">
    <label for="login_username">Username:</label>
    <input
      type="text"
      id="login_username"
      required="True,"
      placeholder="Enter your username"
    />
    <br /><br />
    <label for="login_password">Password:</label>
    <input
      type="text"
      id="login_password"
      required="True,"
      placeholder="Enter your password"
    />
    <br /><br />

    <button id="authUser" type="button" v-on:click="authenticateUser()">
      Sign In
    </button>
  </form> -->
    <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from '@/uifire.js';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getAuth } from 'firebase/auth';

import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { getDoc, doc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);


export default {
  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance();

    if (!ui) {
      // Initialize the FirebaseUI Widget using Firebase.
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    });
    console.log('ui authenticated');
  },
  methods: {
    async checkUser() {
      const auth = getAuth();
      console.log(auth);
      this.user = auth.currentUser.email;
      console.log(this.user);
    },
    async authenticateUser() {
      var a = String(document.getElementById('login_username').value);
      var b = String(document.getElementById('login_password').value);
      console.log(a);

      const acct = await getDoc(doc(db, 'acct_detail', a));
      console.log('working...');

      if (acct.exists()) {
        console.log('User exists');
        if (b == acct.data().password) {
          console.log('User is authenticated');
        }
      } else {
        console.log('No User Found');
      }
    },
  },
  }
};
</script>

<style></style>

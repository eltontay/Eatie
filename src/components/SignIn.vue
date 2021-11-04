<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from '@/uifire.js';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getAuth } from 'firebase/auth';

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
    console.log('ui authenticating');
  },

  methods: {
    async checkUser() {
      const auth = getAuth();
      console.log(auth);
      this.user = auth.currentUser.email;
      console.log(this.user);
    }
  },
};
</script>

<style></style>

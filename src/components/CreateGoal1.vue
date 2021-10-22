<template>
  <div class="container">
    <h2>Step (1/4)</h2>
    <div>
      <h3>What is your gender?</h3>
      <div>
        <button @click="gender1()" id="boy" value="boy">
          <img src="@/assets/boy.png" alt="" />
        </button>
        <br />
        <button @click="gender2()" id="girl" value="girl">
          <img src="@/assets/girl.png" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(firebaseApp);

export default {
  components: {},
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    async gender1() {
      try {
        console.log('its a boy!');
        await setDoc(doc(db, 'profile', 'gender'), {
          gender: 'Boy',
        });
        this.$router.push('./goalStep2');
      } catch (error) {
        console.log(error);
      }
    },
    async gender2() {
      try {
        console.log('its a girl!');
        await setDoc(doc(db, 'profile', 'gender'), {
          gender: 'Girl',
        });
        this.$router.push('./goalStep2');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>

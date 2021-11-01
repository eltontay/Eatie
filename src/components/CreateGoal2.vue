<template>
  <div class="container">
    <h2>Step (2/4)</h2>
    <h3>What is your height?</h3>
    <div id="flex-container">
      <div id="flex-child">
        <img src="@/assets/height.png" alt="" class="" />
      </div>
      <form id="flex-child">
        <label for="height">My height (cm) is</label>
        <input type="text" id="height" />
      </form>
      <button @click="step2()">Next</button>
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
    async step2() {
      try {
        var height = document.getElementById('height').value;
        await setDoc(doc(db, 'profile', 'height'), {
          height: height,
        });
        console.log('pushing?');
        this.$router.push('./goalStep3');
        console.log('pushed');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>

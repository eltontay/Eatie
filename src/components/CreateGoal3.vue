<template>
  <div class="container">
    <h2>Step (3/4)</h2>
    <h3>What is your weight?</h3>
    <div id="flex-container">
      <div id="flex-child">
        <img src="@/assets/weight.png" alt="" class="" />
      </div>
      <form id="flex-child">
        <label for="height">My weight (kg) is</label>
        <input type="text" id="weight" />
      </form>
      <button @click="step3()">Next</button>
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
    async step3() {
      try {
        var weight = document.getElementById('weight').value;
        await setDoc(doc(db, 'profile', 'weight'), {
          weight: weight,
        });
        console.log('pushing?');
        this.$router.push('./goalStep4');
        console.log('pushed');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>

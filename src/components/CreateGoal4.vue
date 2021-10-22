<template>
  <div class="container">
    <h2>Step (4/4)</h2>
    <h3>What is your daily activity level?</h3>
    <div>
      <button @click="activity1()">
        <img class="activity1" src="@/assets/activity1.png" alt="" />
        <h3>I am seated most of the time</h3>
      </button>
      <br />
      <button @click="activity2()">
        <img class="activity2" src="@/assets/activity2.png" alt="" />
        <h3>I am standing half of the time</h3>
      </button>
      <br />
      <button @click="activity3()">
        <img class="activity3" src="@/assets/activity3.png" alt="" />
        <h3>I am walking half of the time</h3>
      </button>
      <br />
      <button @click="activity4()">
        <img class="activity4" src="@/assets/activity4.png" alt="" />
        <h3>I am constantly on the move</h3>
      </button>
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
    async activity1() {
      try {
        await setDoc(doc(db, 'profile', 'activity'), {
          activity: 'activity1',
        });
        this.$router.push('./myGoals');
      } catch (error) {
        console.log(error);
      }
    },
    async activity2() {
      try {
        await setDoc(doc(db, 'profile', 'activity'), {
          activity: 'activity2',
        });
        this.$router.push('./myGoals');
      } catch (error) {
        console.log(error);
      }
    },
    async activity3() {
      try {
        await setDoc(doc(db, 'profile', 'activity'), {
          activity: 'activity3',
        });
        this.$router.push('./myGoals');
      } catch (error) {
        console.log(error);
      }
    },
    async activity4() {
      try {
        await setDoc(doc(db, 'profile', 'activity'), {
          activity: 'activity4',
        });
        this.$router.push('./myGoals');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>

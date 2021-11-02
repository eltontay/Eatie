<template>
  <div class="container">
    <div v-if="!displayGoal()">
      <h2>My Goals</h2>
      <h3>You have not created a goal yet.</h3>

      <button @click="Create()">
        <h3>Create Goal</h3>
      </button>
    </div>
    <div v-else>
      <h1>My Goals</h1>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getDocs, getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(firebaseApp);

export default {
  components: {},
  mounted() {
    this.displayGoal();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    async displayGoal() {
      let goal = await getDoc(doc(db, 'profile', 'gender'));
      if (!goal.data() == undefined) {
        console.log('No goals set')
        return false;
      }
      let goals = await getDocs(collection(db, 'profile'));

      goals.forEach((docs) => {
        let yy = docs.data();
        console.log(yy);
      });
      return true;
    },
    Create() {
      this.$router.push('./goalStep1');
    },
  },
};
</script>

<style>

h1, h2, h3{
 color:#006d77;
}</style>

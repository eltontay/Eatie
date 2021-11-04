<template>
  <div class="container">
      <h2>My Goals</h2>
      <div class="sh-box">
      
        <h3>You have not created a goal yet.</h3>

        <button @click="Create()" class="pointer">
          <h3>Create Goal</h3>
        </button>
      </div>
    <!-- <div v-if="displayGoal() === false">
      <h2>My Goals</h2>
      <h3>You have not created a goal yet.</h3>

      <button @click="Create()">
        <h3>Create Goal</h3>
      </button>
    </div>
    <div v-else>
      <h1>My Goals</h1>
    </div> -->
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getDocs, getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      let goal = await getDoc(doc(db, "profile", "gender"));

      console.log("goal");
      console.log(goal);

      if (!goal.exists()) {
        console.log(goals.exists());
        console.log("exists");
        return false;
      }
      let goals = await getDocs(collection(db, "profile"));

      goals.forEach((docs) => {
        let yy = docs.data();
        console.log(yy);
        console.log("foreach profile collection data");
      });
    },
    Create() {
      this.$router.push("./goalStep1");
    },
  },
  computed:  {
    goals() {
      return this.$store.getters.getGoals;
    }
  }
};
</script>

<style  scoped>

.sh-box{
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  
}
.pointer{
  cursor: pointer;
}
button{
  width: 100%;
  max-width: 60%;
}
</style>

<template>
  <Report
    :hasGoal="true"
    :goal="goal"
    :loader="loader"
    v-if="Object.keys(goal).length"
  />
  <div class="container" v-else>
    <div>
      <div id="goalsNotCreatedHeader">
        <img class="foodIcon" src="@/assets/goal1.png" alt="" /> &nbsp; &nbsp; &nbsp;
        <h2>My Goals</h2> &nbsp; &nbsp; &nbsp;
        <img class="foodIcon" src="@/assets/goal2.png" alt="" /> 
      </div>
      <div class="sh-box">
        <h3>You have not created a goal yet.</h3>
        <button @click="Create()" class="pointer">
          <h3>Create Goal</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Report from './Report.vue';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
const db = getFirestore(firebaseApp);

export default {
  components: {
    Report,
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;

        this.displayGoal();
      }
    });
  },
  data() {
    return {
      goal: {},
      loader: false,
    };
  },
  methods: {
    async displayGoal() {
      this.loader = true;
      console.log(this.user);
      let goal = await getDoc(doc(db, this.user.email, 'profile'));
      this.goal = goal.exists() ? goal.data() : {};

      this.loader = false;
    },
    Create() {
      this.$router.push('./goalStep1');
    },
  },
  computed: {
    goals() {
      return this.$store.getters.getGoals;
    },
  },
};
</script>

<style scoped lang="scss">
.sh-box {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.pointer {
  cursor: pointer;
}

button {
  width: 100%;
  max-width: 60%;
}

table.goal-data {
  background-color: transparent;
  max-width: 500px;
  margin: 0 auto;
  border: 0;
  tr {
    background-color: transparent;
    vertical-align: top;
    td {
      text-align: left;
      border: 0;
      background-color: transparent;
      &:first-child {
        width: max-content;
        white-space: nowrap;
      }
    }
  }
}

  #goalsNotCreatedHeader {
    width: 80%;
    margin-left: 10%;
    margin-right: 15%;
    margin-bottom:10px;
    display: flex;
    justify-content: center;
  }
</style>

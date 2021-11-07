<template>
  <div class="container">
    <div id="goalsCreatedHeader">
      <img class="foodIcon" src="@/assets/goal1.png" alt="" /> &nbsp; &nbsp; 
      <h2>My Goals</h2> &nbsp; &nbsp; &nbsp;
      <img class="foodIcon" src="@/assets/goal2.png" alt="" /> 
    </div>
    <loader v-if="loader" />
    <div v-else>
      <div class="mx-1">
        <div class="tile-1">
          <strong>Congratulations! Your goal is created</strong>
        </div>
        <div class="bmi-r">
          <span>Your BMI is</span> &nbsp; &nbsp;
          <span class="hlit" :style="{ color: formattedColor() }">
            {{ goal.bmi }}
          </span>
        </div>
        <div class="bmi-r">
          <span>You are at</span> &nbsp; &nbsp;
          <span class="hlit" :style="{ color: formattedColor() }">
            {{ goal.risk }} of Obesity-related diseases
          </span>
        </div>
        <!-- <p class="d-s">
          <strong>of Obesity-related diseases</strong>
        </p> -->
        <h3 style="margin-top:20px; margin-bottom:15px;">
          <strong>Diagnosis</strong>
        </h3>
        <h3 class="lnh" style="margin-top:15px; margin-bottom:15px;font-weight: normal;">
          {{ goal.diagnosis }}
          <br />
          <br />
          <strong>Recommended Calorie Intake: {{ goal.calorie }} Kcal</strong>
        </h3>
        <div>
          <form class="">
            <span style="font-size:18px;"> Set a new weight goal: </span> &nbsp; &nbsp; 
            <input type="text" v-model="weightGoal" id="weightGoal" /> &nbsp; &nbsp; 
            <button @click.prevent="goalWeight()">Submit</button>
          </form>
        </div>
        <div>
          <router-link to="./goalStep1" class="new-btn">New Goal</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {
  // setDoc,
  doc,
  getFirestore,
  updateDoc,
  // getDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const db = getFirestore(firebaseApp);

import Loader from './Loader.vue';

export default {
  components: {
    Loader,
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fbuser = auth.currentUser.email;
      }
    });
  },
  props: ['hasGoal', 'goal', 'loader'],
  data() {
    return {
      bmi: null,
      risk: null,
      diagnosis: null,
      gender: null,
      height: null,
      weight: null,
      calorie: null,
      bmr: null,
      weightGoal: null,
    };
  },
  methods: {
    formattedColor() {
      if (this.bmi < 18.6) {
        return '#fff';
      } else if (this.bmi < 23) {
        return '#1a40ff';
      } else if (this.bmi < 27.9) {
        return '#ebeb14';
      } else if (this.bmi > 27.9) {
        return '#db2518';
      }
    },
    async goalWeight() {
      try {
        var weightGoal = this.weightGoal;

        if (weightGoal < 5) {
          alert('Please enter a correct weight in KG');
          return false;
        }
        let profile = doc(db, String(this.fbuser), 'profile');
        let weightdb = await updateDoc(
          profile,
          {
            weightGoal: weightGoal,
          },
          { merge: true }
        );

        console.log(weightdb);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tile-1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}
.bmi-r {
  font-size: 20px;
  display: flex;
  max-width: 3500px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom:5px;
  span {
    text-align:right;
    flex: 1;
  }
  .hlit {
    text-align: left;
    display: inline-block;
    color: darken(#ec9741, 10%);
    font-weight: 700;
  }
}
.mx-1 {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
// .d-s {
//   font-size: 17px;
//   margin-bottom: 10px;
//   margin-top: 20px;
// }
.lnh {
  margin-top: 5px;
}
.new-btn {
  display: inline-block;
  background: #d9d9d9;
  padding: 5px 25px;
  border-radius: 3px;
  text-decoration: none;
  font-weight: 600;
  color: #1e2240;
  margin-top: 10px;
  font-size: 15px;
}
.mb-a {
  margin-top: 7px;
}

#goalsCreatedHeader {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom:15px;
    display: flex;
    justify-content: center;
  }
</style>

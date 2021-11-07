<template>
  <div class="container">
    <h3>My Goal</h3>
    <loader v-if="loader" />
    <div v-else>
      <div class="mx-1">
        <div class="tile-1">
          <strong>Congratulations! Your goal is created</strong>
        </div>
        <div class="bmi-r">
          <span>Your BMI is</span>
          <span class="hlit" :style="{ color: formattedColor() }">
            {{ goal.bmi }}
          </span>
        </div>
        <div class="bmi-r">
          <span>You are at</span>
          <span class="hlit" :style="{ color: formattedColor() }">
            {{ goal.risk }}
          </span>
        </div>
        <div class="d-s">
          <strong>of Obesity-related diseases</strong>
        </div>
        <div>
          <strong>Diagnosis</strong>
        </div>
        <div class="lnh">
          {{ goal.diagnosis }}
          <br />
          <strong>Recommended Calorie Intake: {{ goal.calorie }} Kcal</strong>
        </div>
        <div>
          <form class="">
            <strong>My desired weight (kg) is </strong>
            <input type="text" v-model="weightGoal" id="weightGoal" />
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
  font-size: 17px;
  display: flex;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  span {
    flex: 1;
    text-align: start;
  }
  .hlit {
    display: inline-block;
    color: darken(#ec9741, 10%);
    font-weight: 700;
  }
}
.mx-1 {
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
}
.d-s {
  margin-bottom: 10px;
  margin-top: 20px;
}
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
</style>

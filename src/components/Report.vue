<template>
  <div class="container">
    <div id="goalsCreatedHeader">
      <img class="foodIcon" src="@/assets/goal1.png" alt="" /> &nbsp; &nbsp; 
      <h2>My Goals</h2> &nbsp; &nbsp; &nbsp;
      <img class="foodIcon" src="@/assets/goal2.png" alt="" /> 
    </div>
    <!-- <loader v-if="loader" /> -->
    <div>
      <div class="mx-1">
        <div class="tile-1">
          <strong>Congratulations! Your goal is created</strong>
        </div>
        <div class="bmi-r">
          <span>Your BMI is</span> &nbsp; &nbsp;
          <span class="hlit" :style="{ color: formattedColor() }">
            {{ this.bmi }}
          </span>
        </div>
        <div class="bmi-r">
          <span>You are at</span> &nbsp; &nbsp;
          <span class="hlit" :style="{ color: formattedColor() }">
            {{ this.risk }}
          </span>
        </div>
        <!-- <p class="d-s">
          <strong>of Obesity-related diseases</strong>
        </p> -->
        <h3 style="margin-top:20px; margin-bottom:15px;">
          <strong>Diagnosis</strong>
        </h3>
        <h3 class="lnh" style="margin-top:15px; font-weight: normal;">
          {{ this.diagnosis }}
          <br />
          <br />
          <strong>Recommended Calorie Intake: {{ this.calorie }} Kcal</strong>
        </h3>
        <div style="margin-top:5px;margin-bottom:20px;" >
          <h3 style="font-size: 1.17em;"> Your current weight goal is {{this.weightGoals}}kg </h3> 
        </div>
        <div>
          <form v-on:submit="goalWeight">
            <label style="font-size:18px;"> Set a weight goal: </label> &nbsp; &nbsp; 
            <input type="number" v-model="weightGoal" name="weightGoal" /> &nbsp; &nbsp; 
            <button type="submit" class ="Btn">Submit</button>
          </form>
        </div>

        <div style="margin-top:15px;" >
          <button>
          <router-link to="./goalStep1" class="new-btn">Reset Profile</router-link>
          </button>
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
  getDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const db = getFirestore(firebaseApp);

// import Loader from './Loader.vue';

export default {
  // components: {
  //   Loader,
  // },
  beforeMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.fbuser = auth.currentUser.email;
        await this.getGoals();
        this.formattedColor();
      }
    });
  },
  // mounted() {
  //   this.getGoals();
  // },
  // props: ['hasGoal', 'goal', 'loader'],
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
      weightGoals: null,
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
    async getGoals() {
      let goal = await getDoc(doc(db, this.user.email, 'profile'));
      if (goal.data() != undefined) {
        let dct = goal.data();
        this.bmi = dct['bmi'];
        this.risk = dct['risk'];
        this.calorie = dct['calorie'];
        this.diagnosis = dct['diagnosis'];
        this.weightGoals = dct['weightGoal'];
      }
    },
    async goalWeight(e) {
      e.preventDefault();
      try {

        if (this.weightGoal < 5) {
          this.weightGoal = '';
          alert('Please enter a correct weight in KG');
          return false;
        }

        let profile = doc(db, String(this.fbuser), 'profile');
        await updateDoc(profile, {weightGoal: this.weightGoal},{ merge: true });
        
        this.weightGoals = this.weightGoal;
        this.weightGoal = '';

      } catch (error) {
        console.log(error)
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
.d-s {
  font-size: 17px;
  margin-bottom: 10px;
  margin-top: 20px;
}
.lnh {
  margin-top: 5px;
}
.new-btn {
  display: inline-block;
  // background: #d9d9d9;
  // padding: 5px 25px;
  border-radius: 3px;
  text-decoration: none;
  // font-weight: 600;
  color: #1e2240;
  margin: auto;
  // font-size: 15px;
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

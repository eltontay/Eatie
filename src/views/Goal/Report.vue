<template>
  <div class="container">
    <h3>My Goal</h3>
    <loader v-if="loader" />
    <div v-else> 
      <div class="mx-1" v-if="hasGoal">
        <div class="tile-1"><strong>Congratulations! Your goal is created</strong></div>
        <div class="bmi-r"> <span>Your BMI is</span> <span class="hlit" :style="{ color: formattedColor()}"> {{ goal.bmi }}
          </span></div>
        <div class="bmi-r"><span>You are at</span> <span class="hlit" :style="{ color: formattedColor()}"> {{ goal.risk }}
          </span></div>
        <div class="d-s">
          <strong>of Obesity-related diseases</strong>
        </div>
        <div>
          <strong>Diagnosis</strong>
        </div>
        <div class="lnh">
          {{ goal.diagnosis }}
          <br>
          <strong>Recommended Calorie Intake: {{ goal.calorie }} Kcal</strong>
          <div>
            <router-link to="./goalStep1" class="new-btn">New Goal</router-link>
          </div>
        </div>
      </div>
      <div class="mx-1" v-else>
        <div class="tile-1"><strong>Congratulations! Your goal is created</strong></div>
        <!-- <div class="bmi-r">your BMI is <span class="hlit">{{ bmi }}</span></div>
        <div class="bmi-r">you are at <span class="hlit"> {{ risk }} </span></div> -->
        <div class="bmi-r"> <span>Your BMI is</span> <span class="hlit" :style="{ color: formattedColor()}"> {{ bmi }}
          </span></div>
        <div class="bmi-r"><span>You are at</span> <span class="hlit" :style="{ color: formattedColor()}"> {{ risk }}
          </span></div>
        <div class="d-s">
          <strong>of Obesity-related diseases</strong>
        </div>
        <div>
          <strong>Diagnosis</strong>
        </div>
        <div class="lnh">
          {{ diagnosis }}
          <br>
          <strong>Recommended Calorie Intake: {{ calorie }} Kcal</strong>
          <div>
            <router-link to="./goalStep1" class="new-btn">New Goal</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import {setDoc, doc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

import Loader from '../../components/Loader.vue'

export default {
  components: {
    Loader,
  },
  props: ['hasGoal', 'goal', 'loader'],
  data () {
    return {
      bmi: null,
      risk: null,
      diagnosis: null,
      calorie: null,
      bmr: null,
    }
  },

  // mounted() {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       this.user = user;
  //     }
  //   });
  // },
  methods: {
    formattedColor(){
      if(this.bmi < 18.6){
        return '#fff'
      } else if (this.bmi < 23) {
        return '#1a40ff'
      } else if (this.bmi < 27.9) {
        return '#ebeb14'
      } else if (this.bmi > 27.9) {
        return '#db2518'
      }
    },
    async showReport() {
      let goal = this.$store.getters.getGoal;
      let bmr, risk, diagnosis, multiplier, calorie, bmi;
      let user = this.user;

      // Calculate BMI 
      var weight = parseInt(goal.weight);
      var height = parseInt(goal.height) / 100;
      bmi = (weight / (height * height)).toFixed(1)

      // calculate BMR 
      if(goal.gender === 'Boy'){
        // bmr = (goal.height + goal.weight) - 120
        bmr = (6.25*goal.height + 10*goal.weight) - 120
      } else {
        // bmr = (goal.height + goal.weight) - 270
        bmr = (6.25*goal.height + 10*goal.weight) - 270
      }

      // Calculate Risk
      if(bmi < 18.6){
        risk = "AT LOW RISK* for obesity-related diseases *But increased risk of other clinical problems"
        diagnosis = "AT RISK of nutritional deficiency and osteoporosis. You are encouraged to eat a balanced meal and to seek medical advice if necessary."
      } else if (bmi < 23) {
        risk = "Low Risk";
        diagnosis = "Achieve a healthy weight by balancing your caloric input (diet) and output (physical activity)."
      } else if (bmi < 27.9) {
        risk = "Moderate Risk";
        diagnosis = "Aim to lose 5% to 10% of your body weight over 6 to 12 months by increasing physical activity and reducing caloric intake"
      } else if (bmi > 27.9) {
        risk = "High Risk";
        diagnosis = "Aim to lose 5% to 10% of your body weight over 6 to 12 months by increasing physical activity and reducing caloric intake. "
      }
      
      // Calculate Multiplier 
      if(goal.activity === 'activity1'){
        multiplier = 1
      } else if(goal.activity === 'activity2'){
        multiplier = 1.2
      } else if(goal.activity === 'activity3'){
        multiplier = 1.375
      } else if(goal.activity === 'activity4'){
        multiplier = 1.5
      }

      // Calculate Calorie
      calorie = parseInt(bmr * multiplier).toFixed(1)

      this.bmi = bmi;
      this.risk = risk;
      this.diagnosis = diagnosis;
      this.calorie = calorie;
      this.bmr = bmr;

      try {
        const goalData = {
          bmi: bmi,
          risk: risk,
          diagnosis: diagnosis,
          calorie: calorie,
          height: goal.height,
          weight: goal.weight,
          gender: goal.gender,
        };
        
        await setDoc(doc(db, user.email, 'profile'), goalData);

        this.$store.commit('ADD_GOAL', goalData)
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;

        if(!this.hasGoal){
          this.showReport();
        }
      }
    });
  }
};
</script>

<style scoped lang="scss">
.tile-1{
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}
.bmi-r{
  font-size: 17px;
  display: flex;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  span{
    flex: 1;
    text-align: start;
  }
  .hlit{
    display: inline-block;
    color: darken(#EC9741 , 10%);
    font-weight: 700;
  }
}
.mx-1{
  max-width: 550px;
  margin-left:auto;
  margin-right: auto;
}
.d-s{
  margin-bottom: 10px;
  margin-top: 20px;
}
.lnh{
  margin-top: 5px;
}
.new-btn{
  display: inline-block;
  background: #D9D9D9;
  padding: 5px 25px;
  border-radius: 3px;
  text-decoration: none;
  font-weight: 600;
  color: #1E2240;
  margin-top: 10px;
  font-size: 15px;
}
.mb-a{
  margin-top: 7px;
}
</style>

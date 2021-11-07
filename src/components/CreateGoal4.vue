<template>
  <div class="container">
    <h2>Step (4/4)</h2>
    <h3>What is your daily activity level?</h3>
    <div class="last-box">
      <div @click="setActivity('activity1')" class="single-box">
        <div class="img-b">
          <img class="activity1" src="@/assets/activity1.png" alt="" />
        </div>
        <h3>I am seated most of the time</h3>
      </div>
      <div @click="setActivity('activity2')" class="single-box">
        <div class="img-b">
          <img class="activity2" src="@/assets/activity2.png" alt="" />
        </div>
        <h3>I am standing half of the time</h3>
      </div>
      <div @click="setActivity('activity3')" class="single-box">
        <div class="img-b">
          <img class="activity3" src="@/assets/activity3.png" alt="" />
        </div>
        <h3>I am walking half of the time</h3>
      </div>
      <div @click="setActivity('activity4')" class="single-box">
        <div class="img-b">
          <img class="activity4" src="@/assets/activity4.png" alt="" />
        </div>
        <h3>I am constantly on the move</h3>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getDoc, getFirestore, setDoc } from 'firebase/firestore';
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
        this.fbuser = auth.currentUser.email;
      }
    });
  },
  methods: {
    async setActivity(activity) {
      if (
        !['activity1', 'activity2', 'activity3', 'activity4'].includes(activity)
      ) {
        alert('Activity does not exist');
        return false;
      }

      try {
        this.$store.commit('setActivity', activity);

        let goal = this.$store.getters.getGoal;
        let bmr, risk, diagnosis, multiplier, calorie, bmi;

        // Calculate BMI
        var weight = parseInt(goal.weight);
        var height = parseInt(goal.height) / 100;
        bmi = (weight / (height * height)).toFixed(1);

        // calculate BMR
        if (goal.gender === 'Boy') {
          // bmr = (goal.height + goal.weight) - 120
          bmr = 6.25 * goal.height + 10 * goal.weight - 120;
        } else {
          // bmr = (goal.height + goal.weight) - 270
          bmr = 6.25 * goal.height + 10 * goal.weight - 270;
        }

        // Calculate Risk
        if (bmi < 18.6) {
          risk =
            'AT LOW RISK* for obesity-related diseases *But increased risk of other clinical problems';
          diagnosis =
            'AT RISK of nutritional deficiency and osteoporosis. You are encouraged to eat a balanced meal and to seek medical advice if necessary.';
        } else if (bmi < 23) {
          risk = 'Low Risk for Obesity-related diseases';
          diagnosis =
            'Achieve a healthy weight by balancing your caloric input (diet) and output (physical activity).';
        } else if (bmi < 27.9) {
          risk = 'Moderate Risk for Obesity-related diseases';
          diagnosis =
            'Aim to lose 5% to 10% of your body weight over 6 to 12 months by increasing physical activity and reducing caloric intake';
        } else if (bmi > 27.9) {
          risk = 'High Risk for Obesity-related diseases';
          diagnosis =
            'Aim to lose 5% to 10% of your body weight over 6 to 12 months by increasing physical activity and reducing caloric intake. ';
        }

        // Calculate Multiplier
        if (goal.activity === 'activity1') {
          multiplier = 1;
        } else if (goal.activity === 'activity2') {
          multiplier = 1.2;
        } else if (goal.activity === 'activity3') {
          multiplier = 1.375;
        } else if (goal.activity === 'activity4') {
          multiplier = 1.5;
        }

        // Calculate Calorie
        calorie = parseInt(bmr * multiplier).toFixed(1);

        const goalData = {
          bmi: bmi,
          risk: risk,
          diagnosis: diagnosis,
          calorie: calorie,
          height: goal.height,
          weight: goal.weight,
          gender: goal.gender,
          weightGoal: goal.weight,
        };

        var a = doc(db, String(this.fbuser), 'profile');
        var b = await getDoc(a);
        console.log(b);
        if (b == undefined) {
          console.log('undefined');
          await setDoc(doc(db, String(this.fbuser), 'profile'), goalData);
        } else {
          console.log(String(this.fbuser));
          await setDoc(doc(db, String(this.fbuser), 'profile'), goalData);
        }

        this.$router.push('./myGoals');

        // await setDoc(doc(db, 'profile', this.user.uid), {
        //   activity: 'activity1',
        // });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (!this.$store.getters.getGoal.gender) {
      this.$router.push('./goalStep1');
    }
  },
};
</script>

<style scoped lang="scss">
.last-box {
  display: flex;
  flex-wrap: wrap;
}
.single-box {
  flex: 0 0 25%;
  max-width: 25%;
  text-align: center;
  cursor: pointer;
  h3 {
    padding-left: 15px;
    padding-right: 15px;
    font-size: 20px;
    text-align: center;
  }
  .img-b {
    width: 100%;
    img {
      display: block;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>

<template>
  <div class="container">
    <h2>My Journey</h2>
    <div id="myJourney">
      <div id="halfMyJourney">
        <line-chart
          v-bind:min="minWeight"
          v-bind:max="maxWeight"
          :data="weeklyWeightLineData"
        ></line-chart>
        <h3>My Weight Journey</h3>
      </div>
      <div id="halfMyJourney">
        <column-chart :data="weeklyNutrientDistribution"></column-chart>
        <h3>Weekly Nutrient Distribution</h3>
      </div>
    </div>
    <h3>Diagnosis</h3>
    <div>{{ myJourneyDiagnosis }}</div>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import firebaseApp from "../firebase.js";
  import { getDoc, getFirestore } from "firebase/firestore";
  import { doc } from "firebase/firestore";
  const db = getFirestore(firebaseApp);

  export default {
    data() {
      return {
        myJourneyDiagnosis: "Diagnosis Message",
        weeklyWeightLineData: {
          Week1: 90,
          Week2: 89,
          Week3: 86,
          Week4: 88,
          Week5: 85,
        }, //change value
        weeklyFat: 0,
        weeklyProtein: 0,
        weeklyCarb: 0,
      };
    },
    computed: {
      weeklyNutrientDistribution() {
        return {
          carbohydrates: this.weeklyCarb,
          fat: this.weeklyFat,
          protein: this.weeklyProtein,
        };
      },
      maxWeight() {
        let maxValue = 0;
        for (const val of Object.entries(this.weeklyWeightLineData)) {
          if (val[1] > maxValue) {
            maxValue = val[1];
          }
        }
        return maxValue + 5;
      },
      minWeight() {
        let minValue = 1000;
        for (const val of Object.entries(this.weeklyWeightLineData)) {
          if (val[1] < minValue) {
            minValue = val[1];
          }
        }
        return minValue - 5;
      },
      totalConsumedNutrient() {
        return this.weeklyFat + this.weeklyProtein + this.weeklyCarb;
      },
      idealNutrientBreakdown() {
        return {
          Carbohydrates: [
            0.45 * this.totalConsumedNutrient,
            0.65 * this.totalConsumedNutrient,
          ],
          Fat: [
            0.25 * this.totalConsumedNutrient,
            0.35 * this.totalConsumedNutrient,
          ],
          Protein: [
            0.1 * this.totalConsumedNutrient,
            0.35 * this.totalConsumedNutrient,
          ],
        };
      },
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
          this.findWeeklyNutrient();
        }
      });
    },
    methods: {
      convertToDateString(date) {
        return (
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0")
        );
      },
      async findWeeklyNutrient() {
        let a = doc(db, String(this.fbuser), "daily_nutrient");
        let currDate = new Date();
        let i = currDate.getDay();
        while (i >= 0) {
          let breakfast = await getDoc(
            doc(a, this.convertToDateString(currDate), "Breakfast")
          );
          let lunch = await getDoc(
            doc(a, this.convertToDateString(currDate), "Lunch")
          );
          let dinner = await getDoc(
            doc(a, this.convertToDateString(currDate), "Dinner")
          );
          let snack = await getDoc(
            doc(a, this.convertToDateString(currDate), "Snack")
          );
          if (breakfast.data() != undefined) {
            this.weeklyFat += breakfast.data()["fat"];
            this.weeklyProtein += breakfast.data()["protein"];
            this.weeklyCarb += breakfast.data()["carbohydrates"];
          }
          if (lunch.data() != undefined) {
            this.weeklyFat += lunch.data()["fat"];
            this.weeklyProtein += lunch.data()["protein"];
            this.weeklyCarb += lunch.data()["carbohydrates"];
          }
          if (dinner.data() != undefined) {
            this.weeklyFat += dinner.data()["fat"];
            this.weeklyProtein += dinner.data()["protein"];
            this.weeklyCarb += dinner.data()["carbohydrates"];
          }
          if (snack.data() != undefined) {
            this.weeklyFat += snack.data()["fat"];
            this.weeklyProtein += snack.data()["protein"];
            this.weeklyCarb += snack.data()["carbohydrates"];
          }
          currDate.setDate(currDate.getDate() - 1);
          i--;
        }
      },
    },
  };
</script>

<style>
  #myJourney {
    display: flex;
  }
  #halfMyJourney {
    width: 40%;
    margin: 0% 5% 0% 5%;
    justify-content: center;
  }
</style>

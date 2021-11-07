<template>
  <div class="container" style="margin-bottom:30px">
    <div id="dailySummaryHeader">
      <img class="foodIcon" src="@/assets/progress1.png" alt="" /> &nbsp; &nbsp; &nbsp;
      <div><h2>Daily Summary</h2></div> &nbsp; &nbsp; &nbsp;
      <img class="foodIcon" src="@/assets/progress2.png" alt="" />
    </div>
    <div id="dailySummary">
      <div id="halfDailySummary1">
        <h3>{{ calorieGoalRecommendation }}</h3>
        <br />
        <div id="dailySummary">
          <div id="halfDailySummary1">
            <div id="calorieSummary">
              <div style="font-size: 120%;">
                Calories Goal: <strong>{{ goalValue }}</strong>
              </div>
              <div style="font-size: 120%;">
                Calories Consumed:
                <strong style="color: green">{{ consumedValue }}</strong>
              </div>
              <div style="font-size: 120%;">
                Calories Remaining:
                <strong style="color: red">{{ remainingValue }}</strong>
              </div>
            </div>
          </div>
          <div id="halfDailySummary2">
            <pie-chart
              id="piechart" 
              :colors="['rgb(17, 207, 255)', 'rgb(1, 40, 49)']"
              donut="true"
              height="50%"
              legend="hide"
              :data="dailyCaloriePieData"
            ></pie-chart>
            <h3 padding="0">{{ percentageCalorie }}%</h3>
          </div>
        </div>
        <h3>
          Just had a meal? Add it to
          <router-link to="/myJournal">My Journal</router-link> now!
        </h3>
      </div>
      <div id="halfDailySummary2">
        <pie-chart
          :colors="['rgb(7, 4, 155)', 'rgb(5, 52, 155)', 'rgb(36, 105, 255)']"
          height="300px"
          :data="dailyNutrientPieData"
        ></pie-chart>
        <div style="margin-top:20px;">
          <h3 v-if="carbohydratesLower">
            You should increase your consumption of carbohydrates!
          </h3>
          <h3 v-if="carbohydratesUpper">
            You should reduce your consumption of carbohydrates!
          </h3>
          <h3 v-if="fatLower">You should increase your consumption of fat!</h3>
          <h3 v-if="fatUpper">You should reduce your consumption of fat!</h3>
          <h3 v-if="proteinLower">
            You should increase your consumption of protein!
          </h3>
          <h3 v-if="proteinUpper">
            You should reduce your consumption of protein!
          </h3>
          <h3 v-if="nutrientRecommendation">
            Your nutrient breakdown is within recommendation!
          </h3>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import firebaseApp from "../firebase.js";
  import { getDoc, getFirestore, doc } from "firebase/firestore";
  const db = getFirestore(firebaseApp);
  export default {
    data() {
      return {
        fbuser: "",
        goalValue: 0,
        dailyNutrient: {
          Calorie: 0,
          Carbohydrates: 0,
          Fat: 0,
          Protein: 0,
        },
      };
    },
    computed: {
      date() {
        var today = new Date();
        return (
          today.getFullYear() +
          "-" +
          String(today.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(today.getDate()).padStart(2, "0")
        );
      },
      dailyNutrientPieData() {
        return {
          Carbohydrates: this.dailyNutrient["Carbohydrates"],
          Fat: this.dailyNutrient["Fat"],
          Protein: this.dailyNutrient["Protein"],
        };
      },
      consumedValue() {
        return this.dailyNutrient["Calorie"];
      },
      remainingValue() {
        return this.goalValue - this.consumedValue;
      },
      percentageCalorie() {
        return Math.round((this.consumedValue / this.goalValue) * 100);
      },
      dailyCaloriePieData() {
        if (this.consumedValue < this.goalValue) {
          return {
            consumed: this.consumedValue,
            remaining: this.remainingValue,
          };
        }
        return { consumed: 100, remaining: 0 };
      },
      calorieGoalRecommendation() {
        if (this.remainingValue < 0)
          return "You are over your recommended Calorie goal. Try not to eat too much!";
        else if (this.remainingValue < 100)
          return "You are nearing your recommended Calorie goal. Try not to eat too much!";
        else
          return "Great job! You are still within your recommended Calorie intake!";
      },
      consumedMacroNutrient() {
        return (
          this.dailyNutrient["Carbohydrates"] +
          this.dailyNutrient["Fat"] +
          this.dailyNutrient["Protein"]
        );
      },
      idealNutrientBreakdown() {
        return {
          Carbohydrates: [
            0.45 * this.consumedMacroNutrient,
            0.65 * this.consumedMacroNutrient,
          ],
          Fat: [
            0.25 * this.consumedMacroNutrient,
            0.35 * this.consumedMacroNutrient,
          ],
          Protein: [
            0.1 * this.consumedMacroNutrient,
            0.35 * this.consumedMacroNutrient,
          ],
        };
      },
      carbohydratesLower() {
        return (
          this.dailyNutrient["Carbohydrates"] <
          this.idealNutrientBreakdown["Carbohydrates"][0]
        );
      },
      carbohydratesUpper() {
        return (
          this.dailyNutrient["Carbohydrates"] >
          this.idealNutrientBreakdown["Carbohydrates"][1]
        );
      },
      fatLower() {
        return (
          this.dailyNutrient["Fat"] < this.idealNutrientBreakdown["Fat"][0]
        );
      },
      fatUpper() {
        return (
          this.dailyNutrient["Fat"] > this.idealNutrientBreakdown["Fat"][1]
        );
      },
      proteinLower() {
        return (
          this.dailyNutrient["Protein"] <
          this.idealNutrientBreakdown["Protein"][0]
        );
      },
      proteinUpper() {
        return (
          this.dailyNutrient["Protein"] >
          this.idealNutrientBreakdown["Protein"][1]
        );
      },
      nutrientRecommendation() {
        return (
          !this.carbohydratesLower &&
          !this.carbohydratesUpper &&
          !this.fatLower &&
          !this.fatUpper &&
          !this.proteinLower &&
          !this.proteinUpper
        );
      },
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
          this.findGoal();
          this.findDailyNutrient("Breakfast");
          this.findDailyNutrient("Lunch");
          this.findDailyNutrient("Dinner");
          this.findDailyNutrient("Snack");
        }
      });
    },
    methods: {
      async findDailyNutrient(mealType) {
        var a = doc(db, String(this.fbuser), "daily_nutrient");
        var meal = await getDoc(doc(a, this.date, mealType));
        if (meal.data() != undefined) {
          Object.entries(meal.data()).forEach((entry) => {
            this.dailyNutrient["Calorie"] += entry[1]["calorie"];
            this.dailyNutrient["Protein"] += entry[1]["protein"];
            this.dailyNutrient["Carbohydrates"] += entry[1]["carbohydrates"];
            this.dailyNutrient["Fat"] += entry[1]["fat"];
          });
        }
      },
      async findGoal() {
        var a = doc(db, String(this.fbuser), "profile");
        var b = await getDoc(a);
        this.goalValue = Math.round(b.data()["calorie"]);
      },
    },
  };
</script>

<style>
  #dailySummary {
    display: flex;
  }
  #halfDailySummary1 {
    width: 40%;
    margin: 0% 5% 0% 5%;
    text-align: left;
    vertical-align: middle;
 
  }
  #halfDailySummary2 {
    width: 40%;
    margin: 0% 5% 0% 5%;
    text-align: center;
  }
  #dailyNutrientPieChart {
    width: 5px;
    background-color: rgb(1, 40, 49);
  }

  #piechart {
    height: 85% !important;
  }

  canvas {
    width: 100%  !important;
    height: 100% !important;
  }

  h3 {
    margin-bottom: 2px;
    margin-top: 10px;
  }

  #calorieSummary {
    margin-top: 10%;
    margin-bottom: 40%;     
  }

  #dailySummaryHeader {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom:10px;
    display: flex;
    justify-content: center;
  }

</style>

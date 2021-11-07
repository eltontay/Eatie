<template>
  <div class="container">
    <h2>My Journey</h2>
    <div id="myJourney">
      <div id="halfMyJourney">
        <LineChart 
          v-if = "loaded"
          v-bind:chartData="weight_linechart"
          v-bind:maxWeight="maxWeight"
          v-bind:minWeight="minWeight"
        ></LineChart >
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
  import LineChart from './LineChart.vue'
  const db = getFirestore(firebaseApp);

  export default {
    components: {
      LineChart
    },
    data() {
      return {
        myJourneyDiagnosis: "Diagnosis Message",
        weeklyWeightLineData: [{},{}], //change value
        weight_linechart:null,
        weightlist:[],
        weeklyFat: 0,
        weeklyProtein: 0,
        weeklyCarb: 0,
        refresh:0,
        loaded: false,
        
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
        for (const val of (this.weightlist)) {
          if (val > maxValue) {
            maxValue = val;
          }
        }
        return maxValue + 5;
      },
      minWeight() {
        let minValue = 1000;

        for (const val of (this.weightlist)) {
          if (val < minValue) {
            minValue = val;
          }
        }
        if (minValue - 5 < 0) {
          return 0;
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
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
          await this.createLineChart();
          this.findWeeklyNutrient("Breakfast");
          this.findWeeklyNutrient("Lunch");
          this.findWeeklyNutrient("Dinner");
          this.findWeeklyNutrient("Snack");
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
      async findWeeklyNutrient(mealType) {
        let a = doc(db, String(this.fbuser), "daily_nutrient");
        let currDate = new Date();
        let i = currDate.getDay();
        while (i >= 0) {
          let meal = await getDoc(
            doc(a, this.convertToDateString(currDate), mealType)
          );
          if (meal.data() != undefined) {
            Object.entries(meal.data()).forEach((entry) => {
              this.weeklyFat += entry[1]["fat"];
              this.weeklyProtein += entry[1]["protein"];
              this.weeklyCarb += entry[1]["carbohydrates"];
            });
          }
          currDate.setDate(currDate.getDate() - 1);
          i--;
        }
      },
      currentDate(num) {
        var today = new Date();
        today.setDate(today.getDate() - num);
        return (
          today.getFullYear() +
          "-" +
          String(today.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(today.getDate()).padStart(2, "0")
        );
      },

      lastestWeight(lst_dates, curr) {
        let flag = -1000;
        for (var i = lst_dates.length - 1; i > -1; i--) {
          if (lst_dates[i] > curr) {
            continue;
          } else {
            flag = i;
            break;
          }
        }
        if (flag == -1000) {
          return 0;
        }
        return lst_dates[flag];
      },

      async findWeeklyWeight() {
        let cur_weight = await getDoc(doc(db, this.fbuser, "weight_progress"));
        let availdate = 0;

        if (cur_weight.data() != undefined) {
          let availkeys = Object.keys(cur_weight.data()).sort();

          for (let i = 0; i < 29; i++) {
            let cur_date = this.currentDate(i);

            if (cur_weight.data()[cur_date] != undefined) {
              this.weeklyWeightLineData[0][cur_date] = cur_weight.data()[cur_date];
            } else {
              availdate = this.lastestWeight(availkeys, cur_date);
              if (cur_weight.data()[availdate] == undefined) {
                this.weeklyWeightLineData[0][cur_date] = 0;
              } else {
                this.weeklyWeightLineData[0][cur_date] = cur_weight.data()[
                  availdate
                ];
              }
            }
          }
        } else {
          for (let i = 0; i < 29; i++) {
            let cur_date = this.currentDate(i);
            this.weeklyWeightLineData[0][cur_date] = availdate;
          }
        }
        this.weightlist = Object.values(this.weeklyWeightLineData[0]);
        // console.log(this.weeklyWeightLineData)
      },

      async findWeeklyGoal() {
        let goal_weight = await getDoc(doc(db, this.fbuser, "profile"));
        

        if (goal_weight.data() != undefined) {
          let ideal_weight = await parseInt(goal_weight.data()["weightGoal"]);
          console.log("My weight goal: " + ideal_weight)
          
          for (let i = 0; i < 29; i++) {
            let cur_date = this.currentDate(i);
            this.weeklyWeightLineData[1][cur_date] = ideal_weight;
          }
        } else {
          for (let i = 0; i < 29; i++) {
            let cur_date = this.currentDate(i);
            this.weeklyWeightLineData[1][cur_date] = 0;
          }
        }
        console.log(this.weeklyWeightLineData);
      },

      async createLineChart() {
        try{
        await this.findWeeklyWeight()
        await this.findWeeklyGoal()
        } catch(e) {
          console.log(e)
        }

        this.weight_linechart = {
          labels: Object.keys(this.weeklyWeightLineData[0]).reverse(),
          datasets: [
            {
              label:'Weight',
              data:Object.values(this.weeklyWeightLineData[0]).reverse(),
              borderColor: "rgb(0,168,0)",
              fill: false,
            } , {
              label:'Goal',
              data:Object.values(this.weeklyWeightLineData[1]).reverse(),
              borderColor: "rgb(255,0,0)",
              fill: false,
              pointRadius: 0,

            }
          ]
        }
        // this.chartOptions = 
        console.log(this.weight_linechart)
        this.loaded = true;
        console.log("it has been assigned")
      }
  }

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

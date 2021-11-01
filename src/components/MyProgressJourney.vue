<template>
  <div class="container">
      <h2>My Journey</h2>
      <div id="myJourney">
        <div id="halfMyJourney">
            <line-chart v-bind:min=minWeight v-bind:max=maxWeight :data = "weeklyWeightLineData"></line-chart>
            <h3>My Weight Journey</h3>
        </div>
        <div id="halfMyJourney">
            <column-chart :data = "weeklyNutrientDistribution"></column-chart>
            <h3>Weekly Nutrient Distribution</h3>
        </div>
      </div>
      <h3>Diagnosis</h3>
      <div>{{myJourneyDiagnosis}}</div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            myJourneyDiagnosis: "Diagnosis Message",
            weeklyWeightLineData: {"Week1": 90, 'Week2': 89, 'Week3': 86, 'Week4': 88, 'Week5': 85}, //change value
            weeklyNutrientDistribution: {"carbohydrates": 10000, "fat": 3500, "protein": 2000} //change value
        }
    }, computed:{
        maxWeight(){
            let maxValue=0
            for(const val of Object.entries(this.weeklyWeightLineData)) {
                  if(val[1] > maxValue){
                      maxValue = val[1];
                  }
            }
            return maxValue + 5;
        },
        minWeight(){
            let minValue=1000
            for(const val of Object.entries(this.weeklyWeightLineData)) {
                  if(val[1] < minValue){
                      minValue = val[1];
                  }
            }
            return minValue - 5;
        },
        totalConsumedCalorie(){
            return this.weeklyNutrientDistribution["carbohydrates"] + this.weeklyNutrientDistribution["fat"] +
                this.weeklyNutrientDistribution["protein"]
        },
        idealNutrientBreakdown() {
            return {
                'Carbohydrates': [0.45*this.totalConsumedCalorie, 0.65*this.totalConsumedCalorie], 
                'Fat': [0.25*this.totalConsumedCalorie,0.35*this.totalConsumedCalorie], 
                'Protein': [0.1*this.totalConsumedCalorie,0.35*this.totalConsumedCalorie]
                }
        },
    }
}
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
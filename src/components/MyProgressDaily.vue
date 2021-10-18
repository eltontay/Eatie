<template>
  <div class="container">
      <h2>Daily Summary</h2>
      <div id="dailySummary">
        <div id="halfDailySummary1">
            <h3>{{calorieGoalRecommendation}}</h3><br>
            <div id="dailySummary">
                <div id="halfDailySummary1">
                    <div style="font-size: 120%;">Calories Goal: <strong>{{goalValue}}</strong></div>
                    <div style="font-size: 120%;">Calories Consumed: <strong style="color: green">{{consumedValue}}</strong></div>
                    <div style="font-size: 120%;">Calories Remaining: <strong style="color: red">{{remainingValue}}</strong></div>
                </div>
                <div id="halfDailySummary2">
                    <pie-chart :colors="['rgb(17, 207, 255)', 'rgb(1, 40, 49)']" donut=true height=50% 
                        legend=hide :data = "dailyCaloriePieData"></pie-chart>
                    <h3>{{percentageCalorie}}%</h3>
                </div>
            </div>
            <h3>Just had a meal? Add it to My Journal now!</h3>
            <!-- add link here -->
        </div>
        <div id="halfDailySummary2">
            <pie-chart :colors="['rgb(7, 4, 155)', 'rgb(5, 52, 155)', 'rgb(36, 105, 255)']"  height=300px
                :data = "dailyNutrientPieData"></pie-chart>
            <h3 v-if="carbohydratesLower">You should increase your consumption of carbohydrates!</h3>
            <h3 v-if="carbohydratesUpper">You should reduce your consumption of carbohydrates!</h3>
            <h3 v-if="fatLower">You should increase your consumption of fat!</h3>
            <h3 v-if="fatUpper">You should reduce your consumption of fat!</h3>
            <h3 v-if="proteinLower">You should increase your consumption of protein!</h3>
            <h3 v-if="proteinUpper">You should reduce your consumption of protein!</h3>
            <h3 v-if="nutrientRecommendation">Your nutrient breakdown is within recommendation!</h3>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            goalValue: 2500, //change value
            dailyNutrientPieData: {'Carbohydrates': 1500, 'Fat': 600, 'Protein': 200}, //change value
        }
    }, computed:{
        consumedValue(){
            return this.dailyNutrientPieData['Carbohydrates'] + 
            this.dailyNutrientPieData['Fat'] + 
            this.dailyNutrientPieData['Protein']
        },
        remainingValue(){
            return this.goalValue - this.consumedValue
        },
        percentageCalorie(){
            return Math.round(this.consumedValue/this.goalValue*100)
        },
        dailyCaloriePieData(){
            return {'consumed': this.consumedValue, 'remaining': this.remainingValue}
        },
        calorieGoalRecommendation(){
            return this.remainingValue < 100
            ? "You are nearing your recommended Calorie goal. Try not to eat too much!"
            : "Great job! You are still within your recommended Calorie intake!"
        },
        idealNutrientBreakdown() {
            return {
                'Carbohydrates': [0.45*this.consumedValue, 0.65*this.consumedValue], 
                'Fat': [0.25*this.consumedValue,0.35*this.consumedValue], 
                'Protein': [0.1*this.consumedValue,0.35*this.consumedValue]
                }
        },
        carbohydratesLower(){
            return this.dailyNutrientPieData['Carbohydrates'] < this.idealNutrientBreakdown['Carbohydrates'][0]
        },
        carbohydratesUpper(){
            return this.dailyNutrientPieData['Carbohydrates'] > this.idealNutrientBreakdown['Carbohydrates'][1]
        },
        fatLower(){
            return this.dailyNutrientPieData['Fat'] < this.idealNutrientBreakdown['Fat'][0]
        },
        fatUpper(){
            return this.dailyNutrientPieData['Fat'] > this.idealNutrientBreakdown['Fat'][1]
        },
        proteinLower(){
            return this.dailyNutrientPieData['Protein'] < this.idealNutrientBreakdown['Protein'][0]
        },
        proteinUpper(){
            return this.dailyNutrientPieData['Protein'] > this.idealNutrientBreakdown['Protein'][1]
        },
        nutrientRecommendation(){
            return !this.carbohydratesLower && !this.carbohydratesUpper 
                && !this.fatLower && !this.fatUpper && !this.proteinLower && !this.proteinUpper
        }
    }
}
</script>

<style>
#dailySummary {
    display: flex;
}
#halfDailySummary1 {
    width: 40%;
    margin: 0% 5% 0% 5%;
    text-align: left;
}
#halfDailySummary2 {
    width: 40%;
    margin: 0% 5% 0% 5%;
    text-align: center;
}
#dailyNutrientPieChart {
    width: 5px;
    background-color: rgb(1, 40, 49)
}


</style>
<template>
  <div class="container">
      <h2>Daily Summary</h2>
      <div id="dailySummary">
        <div id="halfDailySummary">
            <h3>{{calorieGoalRecommendation}}</h3>
            <div id="dailySummary">
                <div id="halfDailySummary">
                    <div>Calories Goal: {{goalValue}}</div>
                    <div>Calories Consumed: {{consumedValue}}</div>
                    <div>Calories Remaining: {{remainingValue}}</div>
                </div>
                <div id="halfDailySummary">
                    <pie-chart :colors="['rgb(17, 207, 255)', 'rgb(1, 40, 49)']" donut=true height=100px 
                        legend=hide :data = "dailyCaloriePieData"></pie-chart>
                    <h3>{{percentageCalorie}}%</h3>
                </div>
            </div>
            <h3>Just had a meal? Add it to My Journal now!</h3>
            <!-- add link here -->
        </div>
        <div id="halfDailySummary">
            <pie-chart :colors="['rgb(7, 4, 155)', 'rgb(5, 52, 155)', 'rgb(36, 105, 255)']" 
                :data = "dailyNutrientPieData"></pie-chart>
            <h3>{{nutrientBreakdownRecommendation}}</h3>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            goalValue: 2300, //change value
            consumedValue: 2000, //change value
            dailyNutrientPieData: {'Carbohydrates': 4, 'Fat': 1, 'Protein': 2} //change value
        }
    }, computed:{
        remainingValue(){
            return this.goalValue - this.consumedValue
        },
        dailyCaloriePieData(){
            return {'consumed': this.consumedValue, 'remaining': this.remainingValue}
        },
        percentageCalorie(){
            return Math.round(this.consumedValue/this.goalValue*100)
        },
        calorieGoalRecommendation(){
            return this.remainingValue < 100
            ? "You are nearing your recommended Calorie goal. Try not to eat too much!"
            : "Great job! You are still within your recommended Calorie intake!"
        },
        nutrientBreakdownRecommendation(){
            return this.remainingValue < 100 // change conditions and message
            ? "Your nutrient breakdown is within recommendation!"
            : "Your nutrient breakdown is within recommendation!"
        }
    }
}
</script>

<style>
#dailySummary {
    display: flex;
}
#halfDailySummary {
    width: 40%;
    margin: 0% 5% 0% 5%;
    text-align: left;
}
#dailyNutrientPieChart {
    width: 5px;
    background-color: rgb(1, 40, 49)
}


</style>
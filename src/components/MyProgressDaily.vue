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
                    Insert graph here
                </div>
            </div>
            <h3>Just had a meal? Add it to My Journal now!</h3>
            <!-- add link here -->
        </div>
        <div id="halfDailySummary">
            <h3>Insert graph here</h3>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            goalValue: 0,
            consumedValue: 0
        }
    }, computed:{
        remainingValue(){
            return this.goalValue - this.consumedValue
        },
        calorieGoalRecommendation(){
            return this.remainingValue < 100
            ? "You are nearing your recommended Calorie goal. Try not to eat too much!"
            : "Great job! You are still within your recommended Calorie intake!"
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
</style>
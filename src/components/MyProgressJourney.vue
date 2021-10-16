<template>
  <div class="container">
      <h2>My Journey</h2>
      <div id="myJourney">
        <div id="halfMyJourney">
            <h3>Insert graph here</h3>
        </div>
        <div id="halfMyJourney">
            <h3>Insert graph here</h3>
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
            myJourneyDiagnosis: "Diagnosis Message"
        }
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
<template>
<div class="container">
  <h2>Step (3/4)</h2>
<form >
      <h3>What is your weight?</h3>
      <label for="weight">My weight (kg) is</label>
      <input type="text" id="weight">
      <button @click="Step3()">Next</button>
</form>
</div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
    methods:{
        Step3(){
            this.$router.push('./CreateGoal4');
        }
    }
}
</script>

<style>

</style>

<template>
<div class="container">
  <h2>Step (2/4)</h2>
<form >
      <h3>What is your height?</h3>
      <label for="height">My height (cm) is</label>
      <input type="text" id="height">
      <button @click="Step2()">Next</button>
</form>
</div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
    methods:{
        Step2(){
            this.$router.push('./CreateGoal3');
        }
    }
}
</script>

<style>

</style>

<template>
<div class="container">
  <h2>Step (4/4)</h2>
<form >
      <h3>What is your daily activity level?</h3>
      <div>
        <button @click="Step4()">
        <h3>I am seated most of the time</h3>
      </button>
      <button @click="Step4()">
        <h3>I am standing half of the time</h3>
      </button>
      <button @click="Step4()">
        <h3>I am walking half of the time</h3>
      </button>
      <button @click="Step4()">
        <h3>I am constantly on the move</h3>
      </button>
      </div>
</form>
</div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
    methods:{
        Step4(){
            this.$router.push('./MyGoals');
        }
    }
}
</script>

<style>

</style>

<template>
  <div class="container">
    <h2>Step (3/4)</h2>
    <h3>What is your weight?</h3>
    <div id="flex-container">
      <div id="flex-child">
        <img src="@/assets/weight.png" alt="" class="" />
      </div>
      <form id="flex-child">
        <label for="height">My weight (kg) is</label>
        <input type="text" id="height" />
        <button @click="Step3()">Next</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  methods: {
    Step3() {
      this.$router.push('./goalStep4');
    },
  },
};
</script>

<style></style>

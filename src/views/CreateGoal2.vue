<template>
  <div class="container">
    <h2>Step (2/4)</h2>
    <h3>What is your height?</h3>
    <div id="flex-container">
    <div id="flex-child">
      <img src="@/assets/height.png" alt="" class="" />
    </div>
    <form id="flex-child">
      <label for="height">My height (cm) is</label>
      <input type="text" id="height" />
      <button @click="Step2()">Next</button>
    </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    Step2() {
      this.$router.push("./CreateGoal3");
    },
  },
};
</script>

<style></style>

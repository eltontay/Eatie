<template>
  <div class="container">
    <h2>Step (1/4)</h2>
    <div>
      <h3>What is your gender?</h3>
      <div>
        <button @click="Step1" id="image-container">
          <img class = "boy" src="@/assets/boy.png" alt=""> 
        </button>
        <button @click="Step1" id="image-container">
          <img class = "girl" src="@/assets/girl.png" alt=""> 
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    Step1() {
      this.$router.push("./CreateGoal2");
    },
  },
};
</script>

<style></style>

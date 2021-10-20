<template>
  <div class="container">
    <h2>Step (1/4)</h2>
    <div>
      <h3>What is your gender?</h3>
      <v-form id="gender">
        <button @click="Step1()" value="boy" id="image-container">
          <img src="@/assets/boy.png" alt="" />
        </button>
        <button @click="Step1()" value="girl" id="image-container">
          <img src="@/assets/girl.png" alt="" />
        </button>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},

  methods: {
    async Step1() {
      // var gender = document.getElementById("id").value;
      this.$router.push('./goalStep2');
    },
  },
};
</script>

<style></style>

<template>
  <div v-if="user">
    <h2>Welcome to Eatie</h2>
    <FoodDisplay :date="date[0]" />
    <FoodDisplay :date="date[1]" />
    <FoodDisplay :date="date[2]" />
    <FoodDisplay :date="date[3]" />
    <FoodDisplay :date="date[4]" />
    <FoodDisplay :date="date[5]" />
    <FoodDisplay :date="date[6]" />
  </div>
  <div v-if="!user">
    <h3>Welcome to Eatie</h3>
    <h4>We can insert the ABOUT page component here</h4>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import FoodDisplay from "@/components/FoodDisplay.vue";

  export default {
    name: "App",
    components: {
      FoodDisplay,
    },
    data() {
      return {
        user: false,
      };
    },
    computed: {
      date() {
        console.log("hello")
        let currDate = new Date();
        let d = {};
        for (let i = 0; i < 7; i++) {
          d[i] = this.convertToDateString(currDate);
          currDate.setDate(currDate.getDate() - 1);
        }
        return d;
      },
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
    },
    methods: {
      convertToDateString(date) {
        return (
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0")
        );
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

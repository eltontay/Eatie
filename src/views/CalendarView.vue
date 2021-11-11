<template>
  <h2>Food history for the past week</h2>
  <FoodCalendar />
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import FoodCalendar from "@/components/FoodCalendar.vue";

  export default {
    name: "CalendarView",
    components: {
      FoodCalendar,
    },
    data() {
      return {
        user: false,
      };
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
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

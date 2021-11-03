<template>
  <div v-if="user">
    <h2>Welcome to Eatie</h2>
    <FoodCalendar />
  </div>
  <div v-if="!user">
    <h3>Welcome to Eatie</h3>
    <h4>We can insert the ABOUT page component here</h4>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import FoodCalendar from "@/components/FoodCalendar.vue";

  export default {
    name: "App",
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

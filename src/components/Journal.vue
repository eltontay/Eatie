<template>
  <div class="container">
    <h2>My Journal</h2>
    <div>Today's date: {{date}}</div>
    <AddFood mealType="Breakfast" :mealDate="date"/>
    <AddFood mealType="Lunch" :mealDate="date"/>
    <AddFood mealType="Dinner" :mealDate="date"/>
    <AddFood mealType="Snack" :mealDate="date"/>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import AddFood from "./AddFood.vue";

  export default {
    computed: {
      date() {
        var today = new Date();
        return (
          today.getFullYear() +
          "-" +
          String(today.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(today.getDate()).padStart(2, "0")
        );
      },
    },
    components: {
      AddFood,
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
</style>

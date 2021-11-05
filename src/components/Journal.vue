<template>
  <div class="container">
    <h2>My Journal</h2>
    <div>Just had a meal? Add it to My Journal now!</div>
    <br />
    <!-- <div>Today's date: {{ currentDate }}</div> -->
    <input id="dateInput" type="date" v-model="date" />

    <AddFood mealType="Breakfast" :mealDate="date" :key="date" />
    <AddFood mealType="Lunch" :mealDate="date" :key="date" />
    <AddFood mealType="Dinner" :mealDate="date" :key="date" />
    <AddFood mealType="Snack" :mealDate="date" :key="date" />
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import AddFood from "./AddFood.vue";

  export default {
    data() {
      return {
        date: "",
      };
    },
    computed: {
      currentDate() {
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
          this.fbuser = auth.currentUser.email;
        }
      });
      this.date = this.currentDate;
    },
  };
</script>

<style></style>

<template>
  <div class="container">
    <form id="myform">
      <h2>My Journal</h2>
      <div id="addFood">
        <div id="addFoodMeal">
          <h3>Breakfast</h3>
          <button id="addFoodButton" v-on:click="displayCalc('breakfast')">
            Add Food</button
          ><br /><br />
          <button id="addFoodButton">Upload Image</button>
          <div v-if="displayBreakfast">
            <APIQuery />
          </div>
        </div>
        <div id="addFoodMeal">
          <h3>Lunch</h3>
          <button id="addFoodButton" v-on:click="displayCalc('lunch')">
            Add Food</button
          ><br /><br />
          <button id="addFoodButton">Upload Image</button>
          <div v-if="displayLunch">
            <APIQuery />
          </div>
        </div>
        <div id="addFoodMeal">
          <h3>Dinner</h3>
          <button id="addFoodButton" v-on:click="displayCalc('dinner')">
            Add Food</button
          ><br /><br />
          <button id="addFoodButton">Upload Image</button>
          <div v-if="displayDinner">
            <APIQuery />
          </div>
        </div>
        <div id="addFoodMeal">
          <h3>Snack</h3>
          <button id="addFoodButton" v-on:click="displayCalc('snack')">
            Add Food</button
          ><br /><br />
          <button id="addFoodButton">Upload Image</button>
          <div v-if="displaySnack">
            <APIQuery />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  // import firebaseApp from "../firebase.js";
  // import { getFirestore, setDoc } from "firebase/firestore";
  // import { doc } from "firebase/firestore";

  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import APIQuery from "./APIQuery.vue";
  // const db = getFirestore(firebaseApp);

  export default {
    data() {
      return {
        displayBreakfast: false,
        displayLunch: false,
        displayDinner: false,
        displaySnack: false,
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
    components: {
      APIQuery,
    },
    methods: {
      async displayCalc(mealName) {
        this.displayBreakfast = false;
        this.displayLunch = false;
        this.displayDinner = false;
        this.displaySnack = false;
        if (mealName == "breakfast") this.displayBreakfast = true;
        if (mealName == "lunch") this.displayLunch = true;
        if (mealName == "dinner") this.displayDinner = true;
        if (mealName == "snack") this.displaySnack = true;
      },
    },
  };
</script>

<style>
  #addFood {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

  #addFoodMeal {
    width: 100%;
  }

  #addFoodButton {
    width: 15%;
    border-radius: 5px;
  }
</style>

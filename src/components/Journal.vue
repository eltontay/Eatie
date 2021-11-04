<template>
  <div class="container">
    <h2>My Journal</h2>
    <form id="myform">
      <input id="dateInput" type="date" />
      <div id="addFood">
        <div id="addFoodMeal">
          <h3>Breakfast</h3>
          <button
            type="button"
            id="addFoodButton"
            v-on:click="displayCalc('breakfast')"
          >
            Add Food</button
          ><br /><br />
          <button type="button" id="addFoodButton">Upload Image</button>
          <div v-if="displayBreakfast">
            <APIQuery @chosenFood="foodChosen($event, 'breakfast')" />
          </div>
        </div>
      </div>
      <div id="addFood">
        <div id="addFoodMeal">
          <h3>Lunch</h3>
          <button
            type="button"
            id="addFoodButton"
            v-on:click="displayCalc('lunch')"
          >
            Add Food</button
          ><br /><br />
          <button type="button" id="addFoodButton">Upload Image</button>
          <div v-if="displayLunch">
            <APIQuery @chosenFood="foodChosen($event, 'lunch')" />
          </div>
        </div>
      </div>
      <div id="addFood">
        <div id="addFoodMeal">
          <h3>Dinner</h3>
          <button
            type="button"
            id="addFoodButton"
            v-on:click="displayCalc('dinner')"
          >
            Add Food</button
          ><br /><br />
          <button type="button" id="addFoodButton">Upload Image</button>
          <div v-if="displayDinner">
            <APIQuery @chosenFood="foodChosen($event, 'dinner')" />
          </div>
        </div>
      </div>
      <div id="addFood">
        <div id="addFoodMeal">
          <h3>Snack</h3>
          <button
            type="button"
            id="addFoodButton"
            v-on:click="displayCalc('snack')"
          >
            Add Food</button
          ><br /><br />
          <button type="button" id="addFoodButton">Upload Image</button>
          <div v-if="displaySnack">
            <APIQuery @chosenFood="foodChosen($event, 'snack')" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js";
  import { getFirestore, setDoc } from "firebase/firestore";
  import { doc } from "firebase/firestore";

  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import APIQuery from "./APIQuery.vue";
  const db = getFirestore(firebaseApp);

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
      async foodChosen(recipe, meal) {
        const auth = getAuth();
        this.fbuser = auth.currentUser.email;
        var date = document.getElementById("dateInput").value;
        try {
          setDoc(
            doc(doc(db, String(this.fbuser), "daily_nutrient"), date, meal),
            {
              food: recipe["label"],
              calorie: Math.round(recipe["calories"]),
              fat: Math.round(recipe["totalNutrients"]["FAT"]["quantity"]),
              protein: Math.round(recipe["totalNutrients"]["PROCNT"]["quantity"]),
              carbohydrates: Math.round(recipe["totalNutrients"]["CHOCDF"]["quantity"]),

            }
          );
        } catch (error) {
          console.error("Error adding document: ", error);
        }
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

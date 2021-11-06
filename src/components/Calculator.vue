<template>
  <div class="container">
    <div id="foodCalcHeader">
      <img class="foodIcon" src="@/assets/burger.png" alt="" /> &nbsp;
      <img class="foodIcon" src="@/assets/salad.png" alt="" />
      <div>
        <h2>Food Calculator</h2>
        <h3>Plan your next meal with our food calculator!</h3>
      </div>
      <img class="foodIcon" src="@/assets/noodle.png" alt="" /> &nbsp;
      <img class="foodIcon" src="@/assets/tomato.png" alt="" />
    </div>
    <hr />
    <div v-show="!haveRecipe">
      <APIQuery
        @chosenFood="foodDetailedDisplay($event)"
        foodTableID="foodCalculator"
      />
    </div>
    <div v-show="haveRecipe">
      <h3>{{ foodName }}</h3>

      <button type="button" v-on:click="returnToCalc">
        Back
      </button> <br><br>

      <table id="detailedFoodTable" style="width: 50%; margin-left: 25%">
        <tr>
          <th>Nutrient</th>
          <th>Quantity</th>
          <th>Unit</th>
        </tr>
      </table>

      <br /><br />

      <button type="button" v-on:click="returnToCalc">
        Back
      </button>
    </div>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import APIQuery from "@/components/APIQuery.vue";

  export default {
    data() {
      return {
        haveRecipe: false,
        foodName: "",
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
      async foodDetailedDisplay(recipe) {
        var ind = 1;
        Object.entries(recipe["totalNutrients"]).forEach((entry) => {
          var row = document.getElementById("detailedFoodTable").insertRow(ind);
          row.insertCell(0).innerHTML = entry[1]["label"];
          row.insertCell(1).innerHTML = Math.round(entry[1]["quantity"]);
          row.insertCell(2).innerHTML = entry[1]["unit"];
        });
        this.haveRecipe = true;
        this.foodName = recipe["label"];
        ind++;
      },
      returnToCalc() {
        this.haveRecipe = false;
      },
    },
  };
</script>

<style>
  #foodCalcHeader {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    justify-content: center;
  }
</style>

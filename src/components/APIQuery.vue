<template>
  <div>
    <div id="searchBar">
      <h3>Search Food</h3>
      <form v-on:submit.prevent="onSubmit" style="display: flex">
        <input
          type="text"
          class="foodSearch"
          :id="foodSearchID"
          required=""
          v-on:keyup.enter="searchFood"
          placeholder="e.g. durian, french fries"
        />
        <button type="button" id="searchButton" v-on:click="searchFood">
          Search
        </button>
      </form>
      <br /><br />
    </div>
    <table class="foodTable" :id="foodTableID">
      <tr>
        <th>Food item</th>
        <th>Calorie</th>
        <th>Fat</th>
        <th>Protein</th>
        <th>Carbohydrates</th>
      </tr>
    </table>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    props: {
      foodTableID: String,
    },
    computed: {
      foodSearchID() {
        return this.foodTableID + "search";
      }
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
      async searchFood() {
        var foodName = String(document.getElementById(this.foodSearchID).value);
        if (foodName == "") {
          alert("Fill in something!");
        } else {
          for (
            var i = document.getElementById(this.foodTableID).rows.length;
            i > 1;
            i--
          ) {
            document.getElementById(this.foodTableID).deleteRow(i - 1);
          }
          var axios = require("axios").default;
          let auth = require("../dbconfig.json");

          var options = {
            method: "GET",
            url: "https://edamam-recipe-search.p.rapidapi.com/search",
            params: { q: foodName },
            headers: {
              "x-rapidapi-host": auth["x-rapidapi-host"],
              "x-rapidapi-key": auth["x-rapidapi-key"],
            },
          };

          var req = await axios.request(options);
          var results = req.data["hits"];
          var ind = 1;
          results.forEach((doc) => {
            var recipe = doc["recipe"];
            var y = recipe["yield"];
            var row = document.getElementById(this.foodTableID).insertRow(ind);
            let bu = document.createElement("button");
            bu.id = "foodNameButton";
            bu.type = "button";
            bu.innerHTML = recipe["label"];
            bu.onclick = () => this.$emit("chosenFood", recipe);
            row.insertCell(0).appendChild(bu);
            row.insertCell(1).innerHTML = Math.round(recipe["calories"] / y);
            row.insertCell(2).innerHTML = Math.round(
              recipe["totalNutrients"]["FAT"]["quantity"] / y
            );
            row.insertCell(3).innerHTML = Math.round(
              recipe["totalNutrients"]["PROCNT"]["quantity"] / y
            );
            row.insertCell(4).innerHTML = Math.round(
              recipe["totalNutrients"]["CHOCDF"]["quantity"] / y
            );
          });
        }
      },
    },
  };
</script>

<style scope>
  #foodNameButton {
    /* background: none;
    border: none; */
    width: 100%;
  }
  #searchBar {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

  #searchButton {
    width: 10%;
    margin-left: 5%;
    border-radius: 10px;
  }

  .foodSearch {
    width: 85%;
    height: 25px;
    font-size: 100%;
  }

  .foodTable {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 80%;
    align-self: center;
    border: 3px solid black;
    margin-left: 10%;
    margin-right: 10%;
  }

  tr:nth-child(even) {
    background-color: #dadada;
  }

  tr:nth-child(odd) {
    background-color: #bebaba;
  }

  .foodTable th,
  td {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }

  .foodTable th {
    border: 3px solid black;
    text-align: center;
    background-color: #575454;
    color: white;
  }
</style>

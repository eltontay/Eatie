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
    <div id="searchBar">
      <h3>Search Food</h3>
      <input
        type="text"
        id="foodSearch"
        required=""
        v-on:keyup.enter="searchFood"
        placeholder="e.g. durian, french fries"
      />
      <br /><br />
    </div>
    <table id="table">
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
  // import firebaseApp from "../firebase.js";
  // import { getFirestore } from "firebase/firestore";
  // import { collection, getDocs, getDoc, doc } from "firebase/firestore";

  import { getAuth, onAuthStateChanged } from "firebase/auth";

  // const db = getFirestore(firebaseApp);

  export default {
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
        var foodName = String(document.getElementById("foodSearch").value);
        if (foodName == "") {
          alert("Fill in something!");
        } else {
          for (
            var i = document.getElementById("table").rows.length;
            i > 1;
            i--
          ) {
            document.getElementById("table").deleteRow(i - 1);
          }
          var axios = require("axios").default;
          let auth = require('../dbconfig.json');

          var options = {
            method: "GET",
            url: "https://edamam-recipe-search.p.rapidapi.com/search",
            params: { q: foodName },
            headers: {
              "x-rapidapi-host": auth["x-rapidapi-host"],
              "x-rapidapi-key": auth["x-rapidapi-key"],
            },
          };

          var req = await axios.request(options)
          var results = req.data['hits']
          var ind = 1
          results.forEach((doc) => {
            var recipe = doc["recipe"];
            var row = document.getElementById("table").insertRow(ind);
            row.insertCell(0).innerHTML = recipe["label"];
            row.insertCell(1).innerHTML = Math.round(recipe["calories"]);
            row.insertCell(2).innerHTML = Math.round(recipe["totalNutrients"]["FAT"]["quantity"]);
            row.insertCell(3).innerHTML = Math.round(recipe["totalNutrients"]["PROCNT"]["quantity"]);
            row.insertCell(4).innerHTML = Math.round(recipe["totalNutrients"]["CHOCDF"]["quantity"]);
          });
        }
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

  .foodIcon {
    height: 70px;
  }

  #searchBar {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

  #foodSearch {
    width: 100%;
    height: 25px;
    font-size: 100%;
  }

  table {
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

  th,
  td {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }

  #table th {
    border: 3px solid black;
    text-align: center;
    background-color: #575454;
    color: white;
  }
</style>

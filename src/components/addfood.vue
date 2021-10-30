<template>
  <div class ="container">
            <form id = "myform" >
                <h2>Add Meal name and date</h2>    
                <div class = "formli">
                    <label for="Meal">Meal Name: </label>
                    <input type="text" id = "Meal" required="" placeholder="Enter Meal Name"> <br><br>

                    <label for="Date">Date: </label>
                    <input type="text" id = "Date" required="" placeholder="Enter Date"> <br><br>

                    <div class = "search">
                    <button id = "searchbutton"  type="button" v-on:click="searchFood()"> search </button><br><br>
                    </div>
                </div>
            </form>     
    </div>
</template>

<script>
import firebaseApp from '../firebase.js'
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);


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

          var options = {
            method: "GET",
            url: "https://edamam-recipe-search.p.rapidapi.com/search",
            params: { q: foodName },
            headers: {
              "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
              "x-rapidapi-key":
                "7dec6e7bd5mshf7509e10686593cp1d65d3jsn77e86bb54eb0",
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
h2{
    background-color: rgb(129,184,99);
}
.formli{
    display: inline-block;
    text-align: center;
    margin: auto;
}
input:hover{
    box-shadow: 3px 3px purple;
    border-radius: 2px;
}
.save{
    text-align: center;
}
</style>
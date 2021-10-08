<template>
  <div class="container">
      <div id="foodCalcHeader">
          <img class = "foodIcon" src="@/assets/burger.png" alt="">  &nbsp;
          <img class = "foodIcon" src="@/assets/salad.png" alt="">
          <div>
            <h2>Food Calculator</h2>
            Plan your next meal with our food calculator! <br><br>
          </div>
          <img class = "foodIcon" src="@/assets/noodle.png" alt="">  &nbsp;
          <img class = "foodIcon" src="@/assets/tomato.png" alt="">
      </div>
      <hr>
      <div id="searchBar">
          <h3>Search Food</h3>
          <input type="text" id="foodSearch" required="" placeholder="e.g. durian, french fries"> <br><br>
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
import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
    mounted() {
        async function display() {
            let z = await getDocs(collection(db, "food_nutrient")) 
            let ind = 1; // index
            z.forEach((docs) => {
                let yy = docs.data();
                var row = document.getElementById("table").insertRow(ind);
                let cells = new Array()

                var food = docs.id
                var calorie = yy.calorie
                var carbohydrates = yy.carbohydrates
                var fat = yy.fat
                var protein = yy.protein

                for (let i = 0; i < 5; i++) {
                    cells[i] = row.insertCell(i);
                }

                cells[0].innerHTML = food;
                cells[1].innerHTML = calorie;
                cells[2].innerHTML = carbohydrates;
                cells[3].innerHTML = fat;
                cells[4].innerHTML = protein;
                });
                ind++;
            }
            display()
    }
}
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

th,td {
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
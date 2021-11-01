<template>
  <div class ="container">
            <form id = "myform" >
                <h2>Add Meal</h2>    
                <div class = "formli">
                    <label for="Meal">Meal Name: </label>
                    <input type="text" id = "Meal" required="" placeholder="Enter Meal"> <br><br>

                    <label for="Calories">Calories: </label>
                    <input type="number" id = "Calories" required="" placeholder="Enter Calories"> <br><br>

                    <label for="Protein">Protein: </label>
                    <input type="number" id = "Protein" required="" placeholder="Enter Protein"> <br><br>

                    <label for="Fat">Fat: </label>
                    <input type="number" id = "Fat" required="" placeholder="Enter Fat"> <br><br>

                    <label for="Carbohydrates">Carbohydrates: </label>
                    <input type="number" id = "Carbohydrates" required="" placeholder="Enter Carbohydrates"> <br><br>

                    <label for="Date">Date: </label>
                    <input type="number" id = "Date" required="" placeholder="Enter Date"> <br><br>

                    <div class = "save">
                    <button id = "savebutton"  type="button" v-on:click="savetofs()"> Save </button><br><br>
                    </div>
                </div>
            </form>     
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(firebaseApp);


export default {
    components: {},
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
        }
        });
    },
    methods: {    
        async savetofs(){
            var a  = document.getElementById("Meal").value
            var b  = document.getElementById("Calories").value
            var c  = document.getElementById("Protein").value
            var d =  document.getElementById("Fat").value
            var e  = document.getElementById("Carbohydrates").value
            var f =  document.getElementById("Date").value


            alert(" Saving Coin : " + a) 

            try{
                const docRef = await setDoc(doc(db, String(this.fbuser), a),{
                    Meal: a,
                    Calories: b,
                    Protein: c,
                    Fat : d,
                    Carbohydrates: e,
                    Date : f
                })
                console.log(docRef)
                document.getElementById('myform').reset();
                this.$emit("added")
                }
            catch(error){
                console.error("Error adding document: ",error);
            }
            },
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
        }   
}

</script>

<style>
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
<template>
  <div class ="container">
            <form id = "myform" >
                <h2>Add Meal and it's respective Macronutrients</h2>    
                <div class = "formli">
                    <label for="Meal">Meal Name: </label>
                    <input type="text" id = "Meal" required="" placeholder="Enter Meal Name"> <br><br>

                    <label for="Calories">Calories: </label>
                    <input type="text" id = "Calories" required="" placeholder="Enter Calories"> <br><br>

                    <label for="Protein">Protein: </label>
                    <input type="number" id = "Protein" required="" placeholder="Enter Protein"> <br><br>

                    <label for="Fat">Fat: </label>
                    <input type="number" id = "Fat" required="" placeholder="Enter Fat"> <br><br>

                    <label for="Carbohydrates">Carbohydrates: </label>
                    <input type="number" id = "Carbohydrates" required="" placeholder="Enter Carbohydrates"> <br><br>

                    <div class = "save">
                    <button id = "savebutton"  type="button" v-on:click="savetofs()"> Save </button><br><br>
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
    methods: {    
        async saveFoodtoFs(){
            var a  = document.getElementById("Meal").value
            var b  = document.getElementById("Calories").value
            var c  = document.getElementById("Protein").value
            var d =  document.getElementById("Fat").value
            var e =  document.getElementById("Carbohydrates").value

            alert(" Saving your data for Meal : " + a) 

            try{
                const docRef = await setDoc(doc(db, "Portfolio", a),{
                    Meal: a,
                    Calories :b,
                    Protein: c,
                    Fat : d,
                    Carbohydrates : e
                })
                console.log(docRef)
                document.getElementById('myform').reset();
                this.$emit("added")
                }
            catch(error){
                console.error("Error adding document: ",error);
            }
            }      
        }   
      }

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
<template>
  <div class ="container">
            <form id = "myform" >
                <h2>Add Meal name and date</h2>    
                <div class = "formli">
                    <label for="Meal">Meal Name: </label>
                    <input type="text" id = "Meal" required="" placeholder="Enter Meal Name"> <br><br>

                    <label for="Date">Date: </label>
                    <input type="text" id = "Date" required="" placeholder="Enter Date"> <br><br>

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
            var a  = searchFood("Meal")

            alert(" Saving your data for Meal : " + a) 

            try{
                const docRef = await setDoc(doc(db, "Portfolio", a),{
                    Meal: a,
                    Date :b,
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
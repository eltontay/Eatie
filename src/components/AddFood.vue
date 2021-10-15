<!--// This component is temporary  -->

<template>
    <div class="container">
        <h2>Temporary Food Input</h2>
        This page is a temporary page for you guys to add food into your database so you can test the food calculator. <br>
        Just input the name and the rest of the info will autofill with random integers. <br><br>
        <input type="text" id="tempAddFood" required="" placeholder="Add food name"> <br><br>
        <button id = "tempButton" type="button" v-on:click="(addFoodToFirebase)">Add Food</button>
    </div>
</template>

<script>
import firebaseApp from "../firebase.js"
import {getFirestore} from "firebase/firestore"
import {doc,setDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    methods:{
        async addFoodToFirebase(){
            var a = String(document.getElementById("tempAddFood").value);

            try {
                await setDoc(doc(db, "food_nutrient", a),{
                    calorie: Math.floor(Math.random() * 500),
                    carbohydrates: Math.floor(Math.random() * 500),
                    fat: Math.floor(Math.random() * 500),
                    protein: Math.floor(Math.random() * 500)
                })
                console.log("Successfully added " + a)
                document.getElementById('tempAddFood').value = "";
            } catch(error) {
                console.error("Error adding food")
            }
        }
    }
}
</script>

<style>

</style>
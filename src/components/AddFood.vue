<template>
  <div id="addFood">
    <div></div>
    <div id="addFoodMeal">
      <h3>{{mealType}}</h3>
      <!-- <img id="lalala" :src="previewImage" /> -->
      <button
        type="button"
        id="addFoodButton"
        v-on:click="displayCalc()"
      >
        Add Food</button
      ><br /><br />
      <input type="file" accept="image/*" @change="uploadImage" />
      <div v-if="displayTable">
        <APIQuery @chosenFood="foodChosen($event)" />
      </div>
    </div>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js";
  import { getFirestore, setDoc } from "firebase/firestore";
  import { doc } from "firebase/firestore";

  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import APIQuery from "./APIQuery.vue";
  import { getStorage, ref, uploadBytes } from "firebase/storage";
  const db = getFirestore(firebaseApp);

  export default {
    data() {
      return {
        displayTable: false,
        previewImage: null,
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
    props:{
        mealType:String,
        mealDate:String
    },
    methods: {
      async displayCalc() {
        this.displayTable = true
      },
      async foodChosen(recipe) {
        const auth = getAuth();
        this.fbuser = auth.currentUser.email;
        // var date = document.getElementById("dateInput").value;
        try {
          setDoc(
            doc(
              doc(db, String(this.fbuser), "daily_nutrient"),
              this.mealDate,
              this.mealType
            ),
            {
              food: recipe["label"],
              calorie: Math.round(recipe["calories"]),
              fat: Math.round(recipe["totalNutrients"]["FAT"]["quantity"]),
              protein: Math.round(
                recipe["totalNutrients"]["PROCNT"]["quantity"]
              ),
              carbohydrates: Math.round(
                recipe["totalNutrients"]["CHOCDF"]["quantity"]
              ),
            }
          );
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      },

      uploadImage(e) {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
          this.previewImage = e.target.result;
          console.log(this.previewImage);
        };

        const auth = getAuth();
        this.fbuser = auth.currentUser.email;
        const storage = getStorage();
        const storageRef = ref(
          storage,
          this.fbuser + "/" + this.mealDate + "/" + this.mealType
        );

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
          console.log("Uploaded a blob or file!");
          console.log(snapshot);
        });
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

<template>
  <div id="addFood">
    <h3>{{ mealType }}</h3>
    <div id="mealInfo" v-if="displayFoodInfo">
      <div>
        <div>Meal: {{ mealName }}</div>
        <div>Calorie: {{ mealCal }}</div>
        <div>Fat: {{ mealFat }}</div>
        <div>Protein: {{ mealProtein }}</div>
        <div>Carbohydrates: {{ mealCarb }}</div>
      </div>
      <img :id="mealImageID" :src="null" style="mealImageStyle" />
      <button type="button" id="addFoodButton" v-on:click="deleteMeal">
        Delete meal
      </button>
    </div>
    <button type="button" id="addFoodButton" v-on:click="displayCalc()">
      Add Food</button
    ><br /><br />
    <input type="file" accept="image/*" @change="imageChange" />
    <div v-if="displayTable">
      <APIQuery @chosenFood="foodChosen($event)" /><br><br>
      <div v-if="recipe">Current food selected: {{recipe["label"]}}</div>
      <div v-else>Select a food!</div>
      <button type="button" id="addFoodButton" v-on:click="submitToFS()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js";
  import { getDoc, getFirestore, setDoc, deleteDoc } from "firebase/firestore";
  import { doc } from "firebase/firestore";

  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import APIQuery from "./APIQuery.vue";
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage";
  const db = getFirestore(firebaseApp);

  export default {
    data() {
      return {
        displayTable: false,
        displayFoodInfo: false,
        recipe: null,
        currUploadedImage: null,
        mealName: "",
        mealProtein: "",
        mealCarb: "",
        mealFat: "",
        mealCal: "",
      };
    },
    computed: {
      storageRef() {
        return ref(
          getStorage(),
          this.fbuser + "/" + this.mealDate + "/" + this.mealType
        );
      },
      mealImageID() {
        return this.mealType + "Image";
      },
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
          this.getFoodData();
        }
      });
    },
    components: {
      APIQuery,
    },
    props: {
      mealType: String,
      mealDate: String,
    },
    methods: {
      async displayCalc() {
        this.displayTable = true;
      },
      async foodChosen(recipe) {
        this.recipe = recipe;
      },
      imageChange(e) {
        this.currUploadedImage = e;
      },
      async uploadImage() {
        if (this.currUploadedImage == null) return;
        uploadBytes(this.storageRef, this.currUploadedImage.target.files[0]);
        this.loadImage();
      },
      async loadImage() {
        getDownloadURL(this.storageRef)
          .then((url) => {
            const img = document.getElementById(this.mealImageID);
            img.setAttribute("src", url);
          })
          .catch((e) => e); // generates an error, try to remove
      },
      async submitToFS() {
        if (this.recipe == null) {
            alert("Select a meal!");
            return
        }
        try {
          setDoc(
            doc(
              doc(db, String(this.fbuser), "daily_nutrient"),
              this.mealDate,
              this.mealType
            ),
            {
              food: this.recipe["label"],
              calorie: Math.round(this.recipe["calories"]),
              fat: Math.round(this.recipe["totalNutrients"]["FAT"]["quantity"]),
              protein: Math.round(
                this.recipe["totalNutrients"]["PROCNT"]["quantity"]
              ),
              carbohydrates: Math.round(
                this.recipe["totalNutrients"]["CHOCDF"]["quantity"]
              ),
            }
          );
        } catch (error) {
          console.error("Error adding document: ", error);
        }
        this.uploadImage();
        this.displayTable=false;
        this.displayFoodInfo=true;
        this.getFoodData();
      },
      async getFoodData() {
        let a = doc(
          doc(db, String(this.fbuser), "daily_nutrient"),
          this.mealDate,
          this.mealType
        );
        let b = await getDoc(a);
        let c = b.data();
        if (c == undefined) return;
        this.mealName = c.food;
        this.mealProtein = c.protein;
        this.mealCarb = c.carbohydrates;
        this.mealFat = c.fat;
        this.mealCal = c.calorie;
        this.displayFoodInfo = true;
        this.loadImage();
      },
      async deleteMeal() {
        alert("You are going to delete " + this.mealType);
        await deleteDoc(
          doc(
            doc(db, String(this.fbuser), "daily_nutrient"),
            this.mealDate,
            this.mealType
          )
        );
        deleteObject(this.storageRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            error;
            // Uh-oh, an error occurred!
          });
          this.displayFoodInfo=false;
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

  #mealInfo {
    display: flex;
    height: 110px;
    margin: 20px 20px 20px 20px;
  }

  #BreakfastImage,
  #LunchImage,
  #DinnerImage,
  #SnackImage {
    height: 100%;
    margin: 0% 10% 0% 10%;
  }

  #addFoodButton {
    width: 15%;
    border-radius: 5px;
  }
</style>

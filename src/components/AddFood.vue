<template>
  <div id="addFood">
    <h3>{{ mealType }}</h3>
    <div id="mealInfo">
      <div>
        <div>Meal: {{ mealName }}</div>
        <div>Calorie: {{ mealCal }}</div>
        <div>Fat: {{ mealFat }}</div>
        <div>Protein: {{ mealProtein }}</div>
        <div>Carbohydrates: {{ mealCarb }}</div>
      </div>
      <img id="mealImage" :src="previewImage" />
    </div>
    <button type="button" id="addFoodButton" v-on:click="displayCalc()">
      Add Food</button
    ><br /><br />
    <input type="file" accept="image/*" @change="uploadImage" />
    <div v-if="displayTable">
      <APIQuery @chosenFood="foodChosen($event)" />
    </div>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js";
  import { getDoc, getFirestore, setDoc } from "firebase/firestore";
  import { doc } from "firebase/firestore";

  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import APIQuery from "./APIQuery.vue";
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
  const db = getFirestore(firebaseApp);

  export default {
    data() {
      return {
        displayTable: false,
        previewImage: null,
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
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
          this.getFoodData();
          this.loadImage();
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
        uploadBytes(this.storageRef, e.target.files[0]);
        this.loadImage();
      },
      loadImage() {
        getDownloadURL(this.storageRef)
          .then((url) => {
            const img = document.getElementById("mealImage");
            img.setAttribute("src", url);
          })
          .catch((e) => e);
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
        console.log(this.storageRef);
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

  #mealImage {
    height: 100%;
    margin-left: 20%;
  }

  #addFoodButton {
    width: 15%;
    border-radius: 5px;
  }
</style>

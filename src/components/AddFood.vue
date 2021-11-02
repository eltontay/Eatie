<template>
  <div id="addFood">
    <h3>{{ mealType }}</h3>

    <div id="mealInfo" v-if="displayFoodInfo">
      <div style="width: 20%">
        <img
          :id="mealImageID"
          :src="imageSource"
          style="mealImageStyle"
        />
        <h4>{{ mealName }}</h4>
        <input
          v-if="!haveImage"
          type="file"
          accept="image/*"
          @change="imageChange"
        /><br /><br />
        <button
          v-if="!haveImage"
          type="button"
          id="addImageButton"
          v-on:click="uploadImage"
        >
          Upload Image
        </button>
      </div>
      <div id="mealNutrient">
        <table id="mealTable">
          <tr>
            <th>Calorie</th>
            <th>Fat</th>
            <th>Protein</th>
            <th>Carbohydrates</th>
          </tr>
          <tr>
            <td>{{ mealCal }}</td>
            <td>{{ mealFat }}</td>
            <td>{{ mealProtein }}</td>
            <td>{{ mealCarb }}</td>
          </tr>
        </table>

        <br /><br />

        <button type="button" id="addFoodButton" v-on:click="deleteMeal">
          Delete meal
        </button>
      </div>
    </div>
    <br /><br />

    <button type="button" id="addFoodButton" v-on:click="displayCalc()">
      Add Food</button
    ><br /><br />
    <div v-if="displayTable">
      <APIQuery @chosenFood="foodChosen($event)" /><br /><br />
      <div v-if="recipe">Current food selected: {{ recipe["label"] }}</div>
      <div v-else>Select a food!</div>
      <br /><br />
      <div>Add a picture of your meal:</div>
      <input type="file" accept="image/*" @change="imageChange" />
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
        haveImage: false,
        imageSource: "@/assets/no_image_uploaded.png",
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
        this.displayTable = !this.displayTable;
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
            // const img = document.getElementById(this.mealImageID);
            // img.setAttribute("src", url);
            this.haveImage = true;
            this.imageSource = url
          })
          .catch((e) => e); // generates an error, try to remove
      },
      async submitToFS() {
        if (this.recipe == null) {
          alert("Select a meal!");
          return;
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
              calorie: Math.round(
                this.recipe["calories"] / this.recipe["yield"]
              ),
              fat: Math.round(
                this.recipe["totalNutrients"]["FAT"]["quantity"] /
                  this.recipe["yield"]
              ),
              protein: Math.round(
                this.recipe["totalNutrients"]["PROCNT"]["quantity"] /
                  this.recipe["yield"]
              ),
              carbohydrates: Math.round(
                this.recipe["totalNutrients"]["CHOCDF"]["quantity"] /
                  this.recipe["yield"]
              ),
            }
          );
        } catch (error) {
          console.error("Error adding document: ", error);
        }
        this.uploadImage();
        this.displayTable = false;
        this.displayFoodInfo = true;
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
        this.displayFoodInfo = false;
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
    width: 100%;
    text-align: center;
  }

  #mealNutrient {
    width: 80%;
    height: 100%;
    margin-top: 75px;
  }

  #BreakfastImage,
  #LunchImage,
  #DinnerImage,
  #SnackImage {
    width: 100%;
  }

  #addFoodButton {
    width: 15%;
    height: 30px;
    border-radius: 5px;
  }

  #mealTable {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 90%;
    align-self: center;
    border: 3px solid black;
    margin-left: 5%;
    margin-right: 5%;
  }

  #mealTable th {
    border: 3px solid black;
    text-align: center;
    background-color: #575454;
    color: white;
  }
</style>

<template>
  <div id="addFood">
    <h3>{{ mealType }}</h3>

    <div id="mealInfo" v-show="displayFoodInfo">
      <div style="width: 20%">
        <img id="foodImageID" v-bind:src="imageSource" style="mealImageStyle" />
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
        <table class="mealTable" :id="mealTableID">
          <tr>
            <th>Food Name</th>
            <th>Calorie</th>
            <th>Fat</th>
            <th>Protein</th>
            <th>Carbohydrates</th>
            <th>Options</th>
          </tr>
        </table>

        <br /><br />
        <button type="button" id="addFoodButton" v-on:click="deleteMeal">
          Delete meal
        </button>
      </div>
    </div>

    <button
      v-show="!displayTable"
      type="button"
      id="addFoodButton"
      v-on:click="displayCalc()"
    >
      Add Food
    </button>
    <div v-show="displayTable">
      <div id="APIQueryDiv">
        <APIQuery @chosenFood="foodChosen($event)" :foodTableID="mealType" />
      </div>
      <br /><br />
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
  import {
    getDoc,
    getFirestore,
    setDoc,
    deleteDoc,
    updateDoc,
    deleteField,
  } from "firebase/firestore";
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
  import no_image_loaded from "@/assets/no_image_uploaded.png";
  const db = getFirestore(firebaseApp);
  export default {
    data() {
      return {
        displayTable: false,
        displayFoodInfo: false,
        recipe: null,
        currUploadedImage: null,
        haveImage: false,
        imageSource: no_image_loaded,
        mealDetail: {},
        refreshCounter: 0,
      };
    },
    computed: {
      storageRef() {
        return ref(
          getStorage(),
          this.fbuser + "/" + this.mealDate + "/" + this.mealType
        );
      },
      mealTableID() {
        return "mealTable" + this.mealType;
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
        if (this.currUploadedImage == null) {
          // alert("Choose a picture");
          return;
        }
        await uploadBytes(
          this.storageRef,
          this.currUploadedImage.target.files[0]
        );
        await this.loadImage();
      },
      async loadImage() {
        getDownloadURL(this.storageRef)
          .then((url) => {
            this.haveImage = true;
            this.imageSource = url;
          })
          .catch((error) => {
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
        this.refreshCounter++;
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
              [this.recipe["label"]]: {
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
              },
            },
            { merge: true }
          );
        } catch (error) {
          console.error("Error adding document: ", error);
        }
        this.uploadImage();
        this.displayTable = false;
        this.getFoodData();
      },
      async getFoodData() {
        try {
          let a = doc(
            doc(db, String(this.fbuser), "daily_nutrient"),
            this.mealDate,
            this.mealType
          );
          let b = await getDoc(a);
          let c = b.data();
          if (c == undefined) return;
          this.mealDetail = {};
          Object.entries(c).forEach((entry) => {
            this.mealDetail[entry[0]] = {
              protein: entry[1].protein,
              carbohydrates: entry[1].carbohydrates,
              fat: entry[1].fat,
              calorie: entry[1].calorie,
            };
          });
          this.updateMealTable();
          this.loadImage();
        } catch (error) {
          if (error.code == "invalid-argument") return;
          console.error("Error getting document: ", error.code);
        }
      },
      async updateMealTable() {
        for (
          var i = document.getElementById(this.mealTableID).rows.length;
          i > 1;
          i--
        ) {
          document.getElementById(this.mealTableID).deleteRow(i - 1);
        }
        var ind = 1;
        Object.entries(this.mealDetail).forEach((entry) => {
          var row = document.getElementById(this.mealTableID).insertRow(ind);
          row.insertCell(0).innerHTML = entry[0];
          row.insertCell(1).innerHTML = entry[1]["calorie"];
          row.insertCell(2).innerHTML = entry[1]["fat"];
          row.insertCell(3).innerHTML = entry[1]["protein"];
          row.insertCell(4).innerHTML = entry[1]["carbohydrates"];
          let bu = document.createElement("button");
          bu.id = "deleteFoodButton";
          bu.type = "button";
          bu.innerHTML = "Delete";
          bu.onclick = () => this.deleteFood(entry[0]);
          row.insertCell(5).appendChild(bu);
          ind++;
        });
        if (ind == 1) {
          this.displayFoodInfo = false;
        } else {
          this.displayFoodInfo = true;
        }
        this.refreshCounter++;
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
        this.imageSource = no_image_loaded;
        this.haveImage = false;
      },
      async deleteFood(foodName) {
        updateDoc(
          doc(
            doc(db, String(this.fbuser), "daily_nutrient"),
            this.mealDate,
            this.mealType
          ),
          {
            [foodName]: deleteField(),
          }
        );
        this.getFoodData();
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
  }
  #foodImageID {
    width: 100%;
  }
  #addFoodButton {
    width: 15%;
    height: 30px;
    border-radius: 5px;
  }
  #deleteFoodButton {
    width: 80%;
    border-radius: 5px;
  }
  .mealTable {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 90%;
    align-self: center;
    border: 3px solid black;
    margin-left: 5%;
    margin-right: 5%;
  }
  .mealTable th {
    border: 3px solid black;
    text-align: center;
    background-color: #575454;
    color: white;
  }

  #APIQueryDiv {
    background-color: rgb(115, 135, 190);
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 20px;
    border: 1px solid black;
  }
</style>

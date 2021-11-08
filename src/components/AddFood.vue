<template>
  <div id="addFood">
    <h3>{{ mealType }}</h3>

    <div id="mealInfo" v-show="displayFoodInfo">
      <div id="foodImageContainer" @click="imageChange">
        <img id="foodImageID" v-bind:src="imageSource" />
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          style="display: none"
          @change="uploadImage"
        />
        <div class="foodOverlay">
          <fa icon="pencil-alt" /> Change image
        </div>
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
        <button
          class="redButton"
          type="button"
          id="addFoodButton"
          v-on:click="deleteMeal"
        >
          Delete meal <fa icon="trash-alt" />
        </button>
      </div>
    </div>
    <br /><br />

    <button
      v-show="!displayTable"
      type="button"
      id="addFoodButton"
      v-on:click="displayCalc()"
    >
      Add Food <fa icon="plus" />
    </button>
    <div v-show="displayTable">
      <div id="APIQueryDiv">
        <APIQuery @chosenFood="submitToFS($event)" :foodTableID="mealType" />
      </div>
      <br /><br />
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
  const db = getFirestore(firebaseApp);
  export default {
    data() {
      return {
        displayTable: false,
        displayFoodInfo: false,
        haveImage: false,
        imageSource: null,
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
      imageChange() {
        this.$refs.fileInput.click();
      },
      async uploadImage(e) {
        await uploadBytes(this.storageRef, e.target.files[0]);
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
                this.haveImage = false;
                getDoc(
                  doc(
                    doc(db, String(this.fbuser), "daily_nutrient"),
                    this.mealDate,
                    "default_image"
                  )
                ).then((a) => {
                  this.imageSource = a.data()[this.mealType][
                    Object.keys(a.data()[this.mealType])[0]
                  ];
                });
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
        this.refreshCounter++;
      },
      async submitToFS(recipe) {
        try {
          setDoc(
            doc(
              doc(db, String(this.fbuser), "daily_nutrient"),
              this.mealDate,
              this.mealType
            ),
            {
              [recipe["label"]]: {
                calorie: Math.round(recipe["calories"] / recipe["yield"]),
                fat: Math.round(
                  recipe["totalNutrients"]["FAT"]["quantity"] / recipe["yield"]
                ),
                protein: Math.round(
                  recipe["totalNutrients"]["PROCNT"]["quantity"] /
                    recipe["yield"]
                ),
                carbohydrates: Math.round(
                  recipe["totalNutrients"]["CHOCDF"]["quantity"] /
                    recipe["yield"]
                ),
              },
            },
            { merge: true }
          );
          setDoc(
            doc(
              doc(db, String(this.fbuser), "daily_nutrient"),
              this.mealDate,
              "default_image"
            ),
            {
              [this.mealType]: {
                [recipe["label"]]: recipe["image"],
              },
            },
            { merge: true }
          );
        } catch (error) {
          console.error("Error adding document: ", error);
        }
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
          bu.class = "redButton";
          bu.id = "deleteFoodButton";
          bu.type = "button";
          bu.innerHTML = "Delete";
          bu.onclick = () => this.deleteFood(entry[0]);
          row.insertCell(5).appendChild(bu);
          ind++;
        });
        if (ind == 1) {
          this.deleteMeal();
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
        updateDoc(
          doc(
            doc(db, String(this.fbuser), "daily_nutrient"),
            this.mealDate,
            "default_image"
          ),
          {
            [this.mealType]: deleteField(),
          }
        );
        this.displayFoodInfo = false;
        this.imageSource = null;
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
        var a = await getDoc(
          doc(
            doc(db, String(this.fbuser), "daily_nutrient"),
            this.mealDate,
            "default_image"
          )
        );
        var b = a.data();
        delete b[this.mealType][foodName];
        updateDoc(
          doc(
            doc(db, String(this.fbuser), "daily_nutrient"),
            this.mealDate,
            "default_image"
          ),
          b
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
  #foodImageContainer {
    width: 200px;
    position: relative;
  }
  #foodImageID {
    width: 200px;
    height: 200px;
    border-radius: 20px;
    object-fit: cover;
    background-size: cover;
    background-position: center;
  }
  .foodOverlay {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px;
    height: 200px;
    border-radius: 20px;
    opacity: 0;
    transition: 0.3s ease;
    background-color: rgb(41, 83, 41);
    text-align: center;
    line-height: 200px;
    font-size: 120%;
    color: white;
  }
  .foodOverlay:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  #addFoodButton {
    width: 15%;
    height: 30px;
    border-radius: 5px;
  }
  #deleteFoodButton {
    width: 80%;
    border-radius: 5px;
    color: rgba(172, 37, 37, 0.863);
    border: 2px solid rgba(172, 37, 37, 0.863);
  }
  #deleteFoodButton:hover {
    background-color: rgba(172, 37, 37, 0.863);
    color: white;
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
    background-color: rgb(127, 179, 149);
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 20px;
    border: 1px solid black;
  }
</style>

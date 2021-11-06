<template>
  <div id="addFood">
    <h3>{{ mealType }}</h3>

    <div id="mealInfo" v-if="displayFoodInfo" :key="refreshCounter">
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
      
      <table>
        <tr>
        <td>
            <table>
                <thead>
                    <tr>
                        <td>Food Name</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in mealName" :key="item">
                      <td>{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </td>

        <td>
            <table>
                <thead>
                    <tr>
                        <td>Calories</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in mealCal" :key="item">
                      <td>{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </td>

        <td>
            <table>
                <thead>
                    <tr>
                        <td>Fat</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in mealFat" :key="item">
                      <td>{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </td>

        <td>
            <table>
                <thead>
                    <tr>
                        <td>Protein</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in mealProtein" :key="item">
                      <td>{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </td>

        <td>
            <table>
                <thead>
                    <tr>
                        <td>Carbohydrates</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in mealCarb" :key="item">
                      <td>{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </td>
        
        </tr>
      </table>
             
        
        <br /><br />

        <button type="button" id="addFoodButton" v-on:click="deleteMeal">
          Delete meal
        </button>
      </div>
    </div>

    <button
      v-if="!displayTable"
      type="button"
      id="addFoodButton"
      v-on:click="displayCalc()"
    >
      Add Food
    </button>
    <div v-if="displayTable">
      <APIQuery @chosenFood="foodChosen($event)" :foodTableID="mealType"/><br /><br />
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
  import { getDoc, getFirestore, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
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
        mealName: new Array(),
        mealProtein: new Array(),
        mealCarb: new Array(),
        mealFat: new Array(),
        mealCal: new Array(),
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
          let a = doc(
            doc(db, String(this.fbuser), "daily_nutrient"),
            this.mealDate,
            this.mealType
          );
          let b = await getDoc(a);
          let c = b.data();
          if (c == undefined){
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
            }
            );
          }else{
            updateDoc(
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
            }
            );
          }
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
          var i = 0;
          Object.entries(c).forEach((entry) => {
            this.mealName[i] = entry[0];
            this.mealProtein[i] = entry[1].protein;
            this.mealCarb[i] = entry[1].carbohydrates;
            this.mealFat[i] = entry[1].fat;
            this.mealCal[i] = entry[1].calorie;

    /*        var table = document.getElementById("mealTable")
            var row = table.insertRow(i+1)

            var cell1 = row.insertCell(0); 
            var cell2 = row.insertCell(1); 
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3); 
            var cell5 = row.insertCell(4); 
            

            cell1.innerHTML = this.mealName[i]; 
            cell2.innerHTML = this.mealProtein[i]; 
            cell3.innerHTML = this.mealCarb[i]; 
            cell4.innerHTML = this.mealFat[i]; 
            cell5.innerHTML = this.mealFat[i];*/
            i++;
     
            
          });
          this.displayFoodInfo = true;
          this.loadImage();
        } catch (error) {
          if (error.code == "invalid-argument") return;
          console.error("Error getting document: ", error.code);
        }
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
        this.recipe = null;
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

  #foodImageID {
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

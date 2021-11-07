<template>
  <h2>{{ date }}</h2>
  <hr />
  <div id="foodDisplay">
    <div id="mealDisplay" :key="haveMeal">
      <h3>Breakfast</h3>
      <img
        id="homeFoodIcon"
        :src="mealImg['Breakfast']"
        v-if="haveMeal['Breakfast']"
      />
      <div v-if="haveMeal['Breakfast']">
        <h4 :key="item" v-for="item in mealName['Breakfast']">{{ item }}</h4>
      </div>
      <router-link to="/myJournal" v-else>Add a meal</router-link>
    </div>
    <div id="mealDisplay" :key="haveMeal">
      <h3>Lunch</h3>
      <img id="homeFoodIcon" :src="mealImg['Lunch']" v-if="haveMeal['Lunch']" />
      <div v-if="haveMeal['Lunch']">
        <h4 :key="item" v-for="item in mealName['Lunch']">{{ item }}</h4>
      </div>
      <router-link to="/myJournal" v-else>Add a meal</router-link>
    </div>
    <div id="mealDisplay" :key="haveMeal">
      <h3>Dinner</h3>
      <img
        id="homeFoodIcon"
        :src="mealImg['Dinner']"
        v-if="haveMeal['Dinner']"
      />
      <div v-if="haveMeal['Dinner']">
        <h4 :key="item" v-for="item in mealName['Dinner']">{{ item }}</h4>
      </div>
      <router-link to="/myJournal" v-else>Add a meal</router-link>
    </div>
    <div id="mealDisplay" :key="haveMeal">
      <h3>Snack</h3>
      <img id="homeFoodIcon" :src="mealImg['Snack']" v-if="haveMeal['Snack']" />
      <div v-if="haveMeal['Snack']">
        <h4 :key="item" v-for="item in mealName['Snack']">{{ item }}</h4>
      </div>
      <router-link to="/myJournal" v-else>Add a meal</router-link>
    </div>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js";
  import { getDoc, getFirestore } from "firebase/firestore";
  import { doc } from "firebase/firestore";

  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { getStorage, ref, getDownloadURL } from "firebase/storage";
  const db = getFirestore(firebaseApp);

  export default {
    data() {
      return {
        fbuser: "",
        mealName: {
          Breakfast: new Array(),
          Lunch: new Array(),
          Dinner: new Array(),
          Snack: new Array(),
        },
        mealImg: {
          Breakfast: null,
          Lunch: null,
          Dinner: null,
          Snack: null,
        },
        haveMeal: {
          Breakfast: false,
          Lunch: false,
          Dinner: false,
          Snack: false,
        },
      };
    },
    props: {
      date: String,
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
          this.loadMeal("Breakfast");
          this.loadMeal("Lunch");
          this.loadMeal("Dinner");
          this.loadMeal("Snack");
        }
      });
    },
    methods: {
      async loadMeal(mealType) {
        try {
          var a = doc(db, String(this.fbuser), "daily_nutrient");
          var meal = await getDoc(doc(a, this.date, mealType));
          if (meal.data() != undefined) {
            var i = 0;
            Object.entries(meal.data()).forEach((entry) => {
              this.mealName[mealType][i] = entry[0];
              i++;
            });
            this.haveMeal[mealType] = true;
            this.loadImage(mealType);
          }
        } catch (error) {
          if (error.code == "invalid-argument") return;
          console.error("Error getting document: ", error.code);
        }
      },
      async loadImage(mealType) {
        let storageRef = ref(
          getStorage(),
          this.fbuser + "/" + this.date + "/" + mealType
        );
        getDownloadURL(storageRef)
          .then((url) => {
            this.mealImg[mealType] = url;
          })
          .catch((error) => {
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                getDoc(
                  doc(
                    doc(db, String(this.fbuser), "daily_nutrient"),
                    this.date,
                    "default_image"
                  )
                ).then((a) => {
                  this.mealImg[mealType] = a.data()[mealType][Object.keys(a.data()[mealType])[0]];
                });
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
      },
    },
  };
</script>

<style scope>
  #foodDisplay {
    display: flex;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
  }

  #mealDisplay {
    width: 15%;
    margin-left: 5%;
    margin-right: 5%;
  }

  #homeFoodIcon {
    width: 100%;
    border-radius: 20px;
  }
</style>

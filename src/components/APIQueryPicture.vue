<template>
  <div>
    <div id="addFoodSearchBar">
      <h3>Search Food</h3>
      <form v-on:submit.prevent="onSubmit" style="display: flex">
        <input
          type="text"
          class="addFoodSearch"
          :id="foodSearchPic"
          required=""
          v-on:keyup.enter="searchFood"
          placeholder="e.g. durian, french fries"
        />
        <button type="button" id="addFoodSearchButton" v-on:click="searchFood">
          Search <fa icon="search" />
        </button>
      </form>
      <br /><br />
    </div>
    <div id="foodRow">
      <div
        v-for="item in mealRowOne"
        id="oneMeal"
        :key="item"
        @click="this.$emit('chosenFood', item)"
      >
        <img id="queryPic" :src="item['image']" alt="" />
        <h3>{{ item["label"] }}</h3>
        <div class="foodQueryOverlay"><fa icon="plus" /> Add food</div>
      </div>
    </div>
    <div id="foodRow">
      <div
        v-for="item in mealRowTwo"
        id="oneMeal"
        :key="item"
        @click="this.$emit('chosenFood', item)"
      >
        <img id="queryPic" :src="item['image']" alt="" />
        <h3>{{ item["label"] }}</h3>
        <div class="foodQueryOverlay"><fa icon="plus" /> Add food</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    data() {
      return {
        mealRowOne: new Array(),
        mealRowTwo: new Array(),
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
    props: {
      foodSearchPic: String,
    },
    methods: {
      async searchFood() {
        var foodName = String(
          document.getElementById(this.foodSearchPic).value
        );
        if (foodName == "") {
          alert("Fill in something!");
        } else {
          var axios = require("axios").default;
          let auth = require("../dbconfig.json");

          var options = {
            method: "GET",
            url: "https://edamam-recipe-search.p.rapidapi.com/search",
            params: { q: foodName },
            headers: {
              "x-rapidapi-host": auth["x-rapidapi-host"],
              "x-rapidapi-key": auth["x-rapidapi-key"],
            },
          };

          var req = await axios.request(options);
          var results = req.data["hits"];
          this.mealRowOne = new Array();
          this.mealRowTwo = new Array();
          var ind = 0;
          results.forEach((doc) => {
            var recipe = doc["recipe"];
            if (ind < 5) this.mealRowOne[ind] = recipe;
            else this.mealRowTwo[ind - 5] = recipe;
            ind++;
          });
        }
      },
    },
  };
</script>

<style scope>
  #addFoodSearchBar {
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
    text-align: left;
  }

  #addFoodSearchButton {
    width: 22.5%;
    margin-left: 2.5%;
    border-radius: 10px;
  }

  .addFoodSearch {
    width: 75%;
    height: 25px;
    font-size: 100%;
  }

  #foodRow {
    display: flex;
  }

  #oneMeal {
    width: 18%;
    margin-left: 1%;
    margin-right: 1%;
    text-align: center;
    position: relative;
  }

  #queryPic {
    width: 100%;
    border-radius: 20px;
  }

  .foodQueryOverlay {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 20px;
    opacity: 0;
    transition: 0.3s ease;
    background-color: rgb(41, 83, 41);
    text-align: center;
    line-height: 200px;
    font-size: 120%;
    color: white;
  }
  .foodQueryOverlay:hover {
    opacity: 0.8;
    cursor: pointer;
  }
</style>

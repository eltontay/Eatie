<template>
  <div class="container">
    <div id="foodCalcHeader">
      <img class="foodIcon" src="@/assets/burger.png" alt="" /> &nbsp;
      <img class="foodIcon" src="@/assets/salad.png" alt="" />
      <div>
        <h2>Food Calculator</h2>
        <h3>Plan your next meal with our food calculator!</h3>
      </div>
      <img class="foodIcon" src="@/assets/noodle.png" alt="" /> &nbsp;
      <img class="foodIcon" src="@/assets/tomato.png" alt="" />
    </div>
    <hr />
    <div v-show="!haveRecipe">
      <APIQuery
        @chosenFood="foodDetailedDisplay($event)"
        foodTableID="foodCalculator"
      />
    </div>
    <div v-show="haveRecipe">
      <button
        class="redButton"
        id="foodDetailedBtn"
        type="button"
        v-on:click="returnToCalc"
      >
        Back
      </button>
      <br /><br />
      <h3>{{ foodName }}</h3>
      <br />
      <div id="detailFoodImgDiv" @click ="openURL">
        <img id="detailFoodImg" :src="detailFoodImage" alt="" />
        <div id="linkOverlay">Click for more details</div>
      </div>
      <table id="detailedFoodTable" style="width: 50%; margin-left: 25%">
        <tr>
          <th>Nutrient</th>
          <th>Quantity</th>
          <th>Unit</th>
        </tr>
      </table>

      <br /><br />
      <button type="button" id="foodDetailedBtn" v-on:click="scrollToTop">
        Back to top
      </button>
    </div>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import APIQuery from "@/components/APIQuery.vue";

  export default {
    data() {
      return {
        haveRecipe: false,
        foodName: "",
        detailFoodImage: "",
        url: "",
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
    methods: {
      async foodDetailedDisplay(recipe) {
        var ind = 1;
        Object.entries(recipe["totalNutrients"]).forEach((entry) => {
          var row = document.getElementById("detailedFoodTable").insertRow(ind);
          row.insertCell(0).innerHTML = entry[1]["label"];
          row.insertCell(1).innerHTML = Math.round(entry[1]["quantity"]);
          row.insertCell(2).innerHTML = entry[1]["unit"];
        });
        this.haveRecipe = true;
        this.foodName = recipe["label"];
        this.detailFoodImage = recipe["image"];
        this.url = recipe["url"];
        ind++;
      },
      returnToCalc() {
        this.haveRecipe = false;
      },
      scrollToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      },
      openURL() {
        window.open(this.url, '_blank').focus();
      }
    },
  };
</script>

<style>
  #foodCalcHeader {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    justify-content: center;
  }

  #detailedFoodTable th {
    border: 3px solid black;
    text-align: center;
    background-color: #575454;
    color: white;
  }

  #foodDetailedBtn {
    width: 10%;
    border-radius: 5px;
  }

  #detailFoodImgDiv {
    width: 300px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }

  #detailFoodImg {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
  }

  #linkOverlay {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 300px;
    height: 300px;
    border-radius: 20px;
    opacity: 0;
    transition: 0.3s ease;
    background-color: rgb(41, 83, 41);
    text-align: center;
    line-height: 300px;
    font-size: 120%;
    color: white;
  }

  #linkOverlay:hover {
    opacity: 0.8;
    cursor: pointer;
  }
</style>

<template>
  <div class="container">
    <div id="journalHeader">
      <img class="foodIcon" src="@/assets/journal1.png" alt="" /> &nbsp; &nbsp;
      &nbsp;
      <h2>My Journal</h2>
      &nbsp; &nbsp; &nbsp;
      <img class="foodIcon" src="@/assets/journal2.png" alt="" />
    </div>
    <h3>Just had a meal? Add it to My Journal now!</h3>
    <br />
    <!-- <div>Today's date: {{ currentDate }}</div> -->
    <input id="dateInput" type="date" v-model="date" />

    <div class="tab-wrap">
      <input type="radio" id="tab1" name="tabGroup1" class="tab" checked />
      <label for="tab1">Breakfast</label>

      <input type="radio" id="tab2" name="tabGroup1" class="tab" />
      <label for="tab2">Lunch</label>

      <input type="radio" id="tab3" name="tabGroup1" class="tab" />
      <label for="tab3">Dinner</label>

      <input type="radio" id="tab4" name="tabGroup1" class="tab" />
      <label for="tab4">Snack</label>

      <div class="tab__content">
        <h3>Breakfast</h3><br>
        <AddFood mealType="Breakfast" :mealDate="date" :key="date" />
      </div>
      <div class="tab__content">
        <h3>Lunch</h3><br>
        <AddFood mealType="Lunch" :mealDate="date" :key="date" />
      </div>
      <div class="tab__content">
        <h3>Dinner</h3><br>
        <AddFood mealType="Dinner" :mealDate="date" :key="date" />
      </div>
      <div class="tab__content">
        <h3>Snack</h3><br>
        <AddFood mealType="Snack" :mealDate="date" :key="date" />
      </div>
    </div>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import AddFood from "./AddFood.vue";

  export default {
    data() {
      return {
        date: "",
      };
    },
    computed: {
      currentDate() {
        var today = new Date();
        return (
          today.getFullYear() +
          "-" +
          String(today.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(today.getDate()).padStart(2, "0")
        );
      },
    },
    components: {
      AddFood,
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
        }
      });
      this.date = this.currentDate;
    },
  };
</script>

<style>
  #journalHeader {
    width: 80%;
    margin-left: 10%;
    margin-right: 15%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  .tab-wrap {
    -webkit-transition: 0.3s box-shadow ease;
    transition: 0.3s box-shadow ease;
    border-radius: 20px;
    max-width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
    list-style: none;
    background-color: rgb(202, 255, 200);
    margin: 40px 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .tab-wrap:hover {
    box-shadow: 0 12px 23px rgba(0, 0, 0, 0.23), 0 10px 10px rgba(0, 0, 0, 0.19);
  }

  .tab {
    display: none;
  }
  .tab:checked:nth-of-type(1) ~ .tab__content:nth-of-type(1) {
    opacity: 1;
    -webkit-transition: 0.5s opacity ease-in, 0.2s transform ease;
    transition: 0.5s opacity ease-in, 0.2s transform ease;
    position: relative;
    top: 0;
    z-index: 100;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    text-shadow: 0 0 0;
  }
  .tab:checked:nth-of-type(2) ~ .tab__content:nth-of-type(2) {
    opacity: 1;
    -webkit-transition: 0.5s opacity ease-in, 0.2s transform ease;
    transition: 0.5s opacity ease-in, 0.2s transform ease;
    position: relative;
    top: 0;
    z-index: 100;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    text-shadow: 0 0 0;
  }
  .tab:checked:nth-of-type(3) ~ .tab__content:nth-of-type(3) {
    opacity: 1;
    -webkit-transition: 0.5s opacity ease-in, 0.2s transform ease;
    transition: 0.5s opacity ease-in, 0.2s transform ease;
    position: relative;
    top: 0;
    z-index: 100;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    text-shadow: 0 0 0;
  }
  .tab:checked:nth-of-type(4) ~ .tab__content:nth-of-type(4) {
    opacity: 1;
    -webkit-transition: 0.5s opacity ease-in, 0.2s transform ease;
    transition: 0.5s opacity ease-in, 0.2s transform ease;
    position: relative;
    top: 0;
    z-index: 100;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    text-shadow: 0 0 0;
  }
  .tab:first-of-type:not(:last-of-type) + label {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .tab:not(:first-of-type):not(:last-of-type) + label {
    border-radius: 0;
  }
  .tab:last-of-type:not(:first-of-type) + label {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .tab:checked + label {
    background-color: rgb(202, 255, 200);
    box-shadow: 0 -1px 0 #rgb(202, 255, 200) inset;
    cursor: default;
  }
  .tab:checked + label:hover {
    box-shadow: 0 -1px 0 rgb(202, 255, 200) inset;
    background-color: rgb(202, 255, 200);
  }
  .tab + label {
    width: 100%;
    box-shadow: 0 -1px 0 #eee inset;
    border-radius: 20px 20px 0 0;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: #333;
    -webkit-box-flex: 3;
    -webkit-flex-grow: 3;
    -ms-flex-positive: 3;
    flex-grow: 3;
    text-align: center;
    background-color: #f2f2f2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    -webkit-transition: 0.3s background-color ease, 0.3s box-shadow ease;
    transition: 0.3s background-color ease, 0.3s box-shadow ease;
    height: 50px;
    box-sizing: border-box;
    padding: 15px;
  }
  @media (min-width: 768px) {
    .tab + label {
      width: auto;
    }
  }
  .tab + label:hover {
    background-color: rgb(121, 224, 117);
    box-shadow: 0 1px 0 rgb(202, 255, 200) inset;
  }
  .tab__content {
    padding: 10px 25px;
    background-color: transparent;
    position: absolute;
    width: 100%;
    z-index: -1;
    opacity: 0;
    left: 0;
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    border-radius: 6px;
  }
</style>

<template>
  <div class="container">
    <h2>My Journal</h2>
    <div>Just had a meal? Add it to My Journal now!</div>
    <br />
    <!-- <div>Today's date: {{ currentDate }}</div> -->
    <input id="dateInput" type="date" v-model="date" />

    <br><br>
    <table id = "mealTable">
                <tr>            
                    <th>Food Name</th>
                    <th>Calorie</th>
                    <th>Fat</th>
                    <th>Protein</th>
                    <th>Carbohydrates</th>
                    <th>Meal</th>
                    <th>Date</th>
                </tr>
    </table>
    <br>
    
    <AddFood mealType="Breakfast" :mealDate="date" :key="date" />
    <AddFood mealType="Lunch" :mealDate="date" :key="date" />
    <AddFood mealType="Dinner" :mealDate="date" :key="date" />
    <AddFood mealType="Snack" :mealDate="date" :key="date" />
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
    myFunction() {
      document.getElementById("myTable").deleteRow(0);
    }
  };
</script>

<style>
  #mealTable {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    text-align: center;
    border: 3px solid black;
    margin-left: auto;
    margin-right: auto;
  }

  #mealTable th {
    border: 3px solid black;
    text-align: center;
    background-color: #575454;
    color: white;
  }
</style>

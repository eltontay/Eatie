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
    <APIQuery/>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import APIQuery from "@/components/APIQuery.vue";

  export default {
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

  .foodIcon {
    height: 70px;
  }
</style>

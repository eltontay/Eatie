<template>
  <div class="container">
    <h2>Step (1/4)</h2>
    <div>
      <h3>What is your gender?</h3>
      <v-form id="gender">
        <button @click="Step1" value="boy" id="image-container">
          <img src="@/assets/boy.png" alt="" />
        </button>
        <button @click="Step1" value="girl" id="image-container">
          <img src="@/assets/girl.png" alt="" />
        </button>
      </v-form>
    </div>
  </div>
</template>

<script>
// import firebaseApp from "../firebase.js"
// import {getFirestore} from "firebase/firestore"
// import {doc,setDoc} from "firebase/firestore";
// const db = getFirestore(firebaseApp);

export default {
  name: 'App',
  components: {},
  methods: {
    Step1() {
      // var gender = document.getElementById("id").value;

      this.$router.push('./CreateGoal2');
    },
  },
};
</script>

<style></style>

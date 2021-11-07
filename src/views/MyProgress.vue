<template>
  <!-- <h2>My Progress</h2> -->
  <div v-if="goalSet">
    <MyProgressDaily />
    <CheckWeight />
    <MyProgressJourney />
  </div>
  <div v-else>
    <h3>Set your goals <router-link to="/myGoals">here</router-link>!</h3>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js";
  import { getDoc, getFirestore, doc } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  import MyProgressDaily from "@/components/MyProgressDaily.vue";
  import MyProgressJourney from "@/components/MyProgressJourney.vue";
  import CheckWeight from "@/components/CheckWeight.vue";

  const db = getFirestore(firebaseApp);

  export default {
    name: "MyProgress",
    components: {
      MyProgressDaily,
      MyProgressJourney,
      CheckWeight,
    },
    data() {
      return {
        goalSet: false,
      };
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
          this.goalIdSet();
        }
      });
    },
    methods: {
      async goalIdSet() {
        var a = doc(db, String(this.fbuser), "profile");
        var b = await getDoc(a);
        this.goalSet = b.data() != undefined;
      },
    },
  };
</script>

<style></style>

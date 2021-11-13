<template>
  <div v-if="user">
    <div v-if="goalSet">
      <MyProgressDaily />
    </div>
    <div v-else>
      <h3>Set your goals <router-link to="/MyGoals">here</router-link>!</h3>
    </div>
  </div>
  <div v-if="!user" style="padding-top: 25vh">
    <h3>You have not signed in yet</h3>
    <h4>
      Please <router-link to="/SignIn">sign in</router-link> to enjoy the full
      functionality of our application
    </h4>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js";
  import { getDoc, getFirestore, doc } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  import MyProgressDaily from "@/components/MyProgressDaily.vue";

  const db = getFirestore(firebaseApp);

  export default {
    name: "DailyProgress",
    components: {
      MyProgressDaily,
    },
    data() {
      return {
        user: false,
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

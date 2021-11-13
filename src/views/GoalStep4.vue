<template>
  <div v-if="user">
    <CreateGoal4 />
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
  import CreateGoal4 from "@/components/CreateGoal4.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    name: "GoalStep4",
    components: {
      CreateGoal4,
    },
    data() {
      return {
        user: false,
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
  };
</script>

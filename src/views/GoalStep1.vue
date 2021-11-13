<template>
  <div v-if="user">
    <CreateGoal1 />
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
  import CreateGoal1 from "@/components/CreateGoal1.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    name: "GoalStep1",
    components: {
      CreateGoal1,
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

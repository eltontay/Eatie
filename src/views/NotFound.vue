<template>
  <div style="text-align:center;" v-if="user">
    <h3>Page Not Found!!</h3>
    <h4>
      Please use the navigation panel to choose where you would like to go
    </h4>
    <SignOut />
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
  import SignOut from "@/components/SignOut.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    name: "NotFound",
    components: {
      SignOut,
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

<style></style>

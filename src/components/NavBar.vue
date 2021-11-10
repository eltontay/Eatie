<template>
  <div id="nav" v-if="user">
    <router-link to="/"><fa icon="home" /> Home</router-link> |
    <router-link to="/foodCalculator"><fa icon="calculator" /> Food Calculator</router-link> |
    <router-link to="/myJournal"><fa icon="book" /> My Journal</router-link> |
    <router-link to="/mygoals"><fa icon="bullseye" /> My Goals</router-link> |
    <router-link to="/myProgress"><fa icon="chart-line" /> My Progress</router-link> |
    <router-link to="/ContactUs"><fa icon="comments" /> Contact Us</router-link> |
    <router-link to="/Profile"><fa icon="user-circle" /> Profile</router-link>
  </div>
  <div id="nav" v-if="!user">
    <router-link to="/SignIn">Sign In</router-link>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    name: "NavBar",

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

<style scoped>
  #nav {
    text-align: right;
  }

  #nav a {
    font-weight: bold;
    color: #929fac;
  }

  #nav a.router-link-exact-active {
    color: #424141;
  }
</style>

<template>
  <div id = 'nav' v-if="user">
    <router-link to="/">Home</router-link> |
    <router-link to="/foodCalculator">Food Calculator</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/mygoals">My Goals</router-link> | 
    <router-link to="/myProgress">My Progress</router-link> | 
    <router-link to="/Profile">Profile</router-link>
  </div>
  <div id = 'nav' v-if="!user">
      <router-link to="/SignIn">Sign In</router-link>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
    name: 'NavBar',

    data() {
        return {
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    }
}
</script>


<style scoped>
#nav {
  width: 50%;
  text-align: right;
}

#nav a {
  font-weight: bold;
  color: #2c3e50
}

#nav a.router-link-exact-active {
    color: #42b983
}

</style>
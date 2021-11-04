<template>
<button id = "btn" @click="signOut()" v-if="user">Logout</button>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  name: "Logout",

  data() {
      return{
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
  },

  methods: {
      async signOut() {
          const auth = getAuth();
          const user = auth.currentUser;
          signOut(auth, user)
          await this.$router.push({name:'Home'})
          window.location.reload();

      }
  }
};
</script>

<style scoped>
#btn{
    text-align: center;
    margin: auto;
}
#btn:hover{
    color: rgb(243, 236, 236);
    background-color: #2e815c;
    box-shadow: 3px 3px grey;
}
</style>

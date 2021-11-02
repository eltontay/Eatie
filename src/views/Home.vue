<template>
  <div>
    <div v-if="user">
      <h2>Welcome back {{ this.user.displayName }}</h2>
      <div>
        <h2>What would you like to do today?</h2>
        <br />
        <button>View My Progress</button>
        <br />
        <button>View My Goals</button>
        <br />
        <button>View My Journal</button>
      </div>
    </div>
    <div v-if="!user">
      <h3>Welcome to Eatie</h3>
      <AboutUs />
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AboutUs from '@/components/AboutUs.vue';

export default {
  name: 'Home',
  components: {
    AboutUs,
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
        console.log(user);
      }
    });
  },
};
</script>

<style></style>

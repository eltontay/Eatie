<template>
  <div>
    <div v-if="user">
      <h2>Welcome to Eatie</h2>
      <p>
        There should be a component of a calendar with the food the user ate.
      </p>
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

<template>
  <div style="text-align:center;" class="container">
    <div id="">
      <img class="foodIcon" src="@/assets/h1.png" alt="" /> &nbsp;
      <img class="foodIcon" src="@/assets/h3.png" alt="" />
      <div>
        <h1>Welcome to Eatie!</h1>
        <h2>How does it work?</h2>
      </div>
      <img class="foodIcon" src="@/assets/h2.png" alt="" /> &nbsp;
      <img class="foodIcon" src="@/assets/h4.png" alt="" />
    </div>
    <h3>
      <br />
      “Eatie” is a food journal web application that promotes weight-loss
      through pictorial food logs, calorie tracking and detailed nutritional
      breakdowns.
      <br />
      <br />
      With Eatie’s health profile algorithm, users will be able to get
      personalised calorie targets according to their unique profiles. Eatie's
      extensive food database that can assist users to get a more accurate
      nutritional breakdown of their food intake. This allows users to take
      better control of their goals and understand which nutrition they are
      lacking.
      <br />
      <br />
      Eatie adopts a pictorial food journal to make journaling fun and easy!
      <br />
      <br />
    </h3>

    <h5>copyright@Eatie</h5>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
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

<template>
  <div class="container">
    <h2>Step (4/4)</h2>
    <form>
      <h3>What is your daily activity level?</h3>
      <div>
        <button @click="Step4()">
          <img class="activity1" src="@/assets/activity1.png" alt="" />
          <h3>I am seated most of the time</h3>
        </button>
        <button @click="Step4()">
          <img class="activity2" src="@/assets/activity2.png" alt="" />
          <h3>I am standing half of the time</h3>
        </button>
        <button @click="Step4()">
          <img class="activity3" src="@/assets/activity3.png" alt="" />
          <h3>I am walking half of the time</h3>
        </button>
        <button @click="Step4()">
          <img class="activity4" src="@/assets/activity4.png" alt="" />
          <h3>I am constantly on the move</h3>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  methods: {
    Step4() {
      this.$router.push('./MyGoals');
    },
  },
};
</script>

<style></style>

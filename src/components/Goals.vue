<template>
  <div class="container">
    <h2>My Goals</h2>
    <h3>You have not created a goal yet.</h3>

    <button @click="Create()">
      <h3>Create Goal</h3>
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  methods: {
    Create() {
      this.$router.push('./goalStep1');
    },
  },
};
</script>

<style></style>

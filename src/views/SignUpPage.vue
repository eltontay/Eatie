<template>
  <div style="margin-top: 200px">
    <h2>Sign In</h2>
    <SignIn /> <br /><br />
  </div>
</template>

<script>
  import SignIn from "@/components/SignIn.vue";

  export default {
    name: "SignUpPage",
    components: {
      SignIn,
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

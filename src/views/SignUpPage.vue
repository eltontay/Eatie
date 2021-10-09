<template>
  <h2>Sign In</h2>
  <SignUp/> <br><br>
</template>

<script>
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'SignUpPage',
  components: {
    SignUp,
  }
}
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

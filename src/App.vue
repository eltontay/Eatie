<template>
<div class="header">
  <div style="width: 50%">
    <img id="logo" src="@/assets/Eatie_logo.png" alt="">
  </div>
  <div id = 'nav'>
    <router-link to="/">Home</router-link> |
    <router-link to="/foodCalculator">Food Calculator</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/signUpPage">Sign Up</router-link>
  </div>
</div>
<hr>
<router-view/>
</template>

<script>
export default {
  name: 'App'
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }

.header {
  width: 80%;
  height: 100px;
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
}

hr {
    height: 3px;
    width: 80%;
    border-color: black;
    background-color: black;
}

h2 {
    font-size: 30px;
}

#logo {
  float: left;
  height: 100px;
}

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

.container {
    background-color: rgb(162, 180, 199);
    box-shadow: 10px 10px;
    margin: 0px 150px 150px 150px;
    padding: 20px;
    border: 3px solid #313131;
}
</style>

<template>
  <header>
    <div style="width: 50%">
      <img
        id="logo"
        src="@/assets/Eatie_logo.png"
        alt=""
        @click="$router.push('/')"
      />
    </div>
    <NavBar />
  </header>
  <hr />
  <body>
    <router-view />
  </body>
  <footer>
    <hr />
    &copy;2021 Eatie
  </footer>
</template>

<script>
  import NavBar from "./components/NavBar.vue";

  export default {
    name: "App",
    components: {
      NavBar,
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
  }

  header {
    width: 80%;
    height: 100px;
    margin-left: 10%;
    margin-right: 10%;
    text-align: right;
    display: flex;
  }

  body {
    min-height: 70vh;
  }

  footer {
    margin-top: auto;
  }

  hr {
    height: 3px;
    width: 80%;
    border-color: black;
    background-color: black;
  }

  .h2 {
    font-size: 30px;
  }

  .h3 {
    font-size: 24px;
  }

  button {
    width: 30%;
    border-radius: 10px;
  }

  #logo {
    float: left;
    height: 100px;
  }

  #flex-container {
    display: flex;
    flex-wrap: wrap;
  }

  #flex-child {
    flex: 1;
    align-content: center;
    align-items: center;
  }

  #image-container {
    justify-content: center;
  }

  #flex-child:first-child {
    margin-right: 20px;
    align-content: center;
    align-items: center;
  }

  .container {
    background-color: rgb(162, 180, 199);
    box-shadow: 10px 10px;
    margin: 0px 150px 150px 150px;
    padding: 20px;
    border: 3px solid #313131;
  }

  .foodIcon {
    height: 70px;
  }
</style>

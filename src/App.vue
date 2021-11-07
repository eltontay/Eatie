<template>
  <header>
    <div id="logoDiv">
      <img
        id="logo"
        src="@/assets/Eatie_logo.png"
        alt=""
        @click="$router.push('/')"
      />
    </div>
    <div id="navbarDiv">
      <NavBar />
    </div>
  </header>
  <div style="height: 120px"></div>
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
    width: 100%;
    height: 120px;
    text-align: right;
    display: flex;
    background-color: rgb(19, 43, 34);
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    border: 5px solid black;
  }

  body {
    min-height: 80vh;
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
    height: 80%;
    cursor: pointer;
  }

  #logo:hover {
    cursor: pointer;
  }

  #logoDiv {
    width: 30%;
    margin-left: 10%;
    margin-right: 0%;
  }

  #navbarDiv {
    width: 40%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 20px;
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
    background-color: rgb(150, 180, 169);
    box-shadow: 10px 10px;
    margin: 0px 150px 150px 150px;
    padding: 20px;
    border: 3px solid #313131;
  }

  .foodIcon {
    width: 70px;
    height: 70px;
  }
</style>

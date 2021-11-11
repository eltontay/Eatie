<template>
  <div class="wrap">
    <span class="decor"></span>
    <nav>
      <ul class="primary">
        <li>
          <router-link to="/"><fa icon="home" /> Home</router-link>
        </li>
        <li>
          <router-link to="/myJournal"><fa icon="book" /> My Journal</router-link>
          <ul class="sub">
            <li><router-link to="/myJournal"><fa icon="book" /> My Journal</router-link></li>
            <li><router-link to="/foodCalculator"><fa icon="calculator" /> Food Calculator</router-link></li>
          </ul>
        </li>
        <li>
          <router-link to="/myProgress"><fa icon="chart-line" /> My Progress</router-link>
          <ul class="sub">
            <li><router-link to="/mygoals"><fa icon="bullseye" /> My Goals</router-link></li>
            <li><router-link to="/myProgress"><fa icon="chart-line" /> My Progress</router-link></li>
          </ul>
        </li>
        <li>
          <router-link to="/Profile"><fa icon="user-circle" /> Profile</router-link>
          <ul class="sub">
            <li><router-link to="/Profile"><fa icon="user-circle" /> Profile</router-link></li>
            <li><router-link to="/editProfile"><fa icon="user-circle" /> Edit Profile</router-link></li>
            <li><router-link to="/ContactUs"><fa icon="comments" /> Contact Us</router-link></li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    name: "NavBar",

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

<style scoped>
 .wrap {
    display: inline-block;
    box-shadow: 0 0 0px #fff;
  }

  .decor {
    background: #6eaf8d;
    padding: 2px;
    display: block;
  }

  a {
    text-decoration: none;
    color: #fff;
    display: block;
  }

  ul {
    list-style: none;
    position: relative;
    text-align: left;
  }

  li {
    float: left;
  }

  /* clear'n floats */
  ul:after {
    clear: both;
  }

  ul:before,
  ul:after {
    content: " ";
    display: table;
  }

  nav {
    position: relative;
    background: #2b2b2b;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 1px #0e0e0e;
    -webkit-box-shadow: 2px 2px 3px #888;
    -moz-box-shadow: 2px 2px 3px #888;
    box-shadow: 2px 2px 3px #888;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  /* prime */
  ul.primary li a {
    display: block;
    padding: 5% 30px;
    border-right: 1px solid #3d3d3d;
  }

  ul.primary li:last-child a {
    border-right: none;
  }

  ul.primary li a:hover {
    color: #000;
  }

  /* subs */
  ul.sub {
    position: absolute;
    z-index: 200;
    box-shadow: 2px 2px 0 #bebebe;
    width: 35%;
    display: none;
  }

  ul.sub li {
    float: none;
    margin: 0;
  }

  ul.sub li a {
    border-bottom: 1px dotted #ccc;
    border-right: none;
    color: #000;
    padding: 10px 30px;
  }

  ul.sub li:last-child a {
    border-bottom: none;
  }

  ul.sub li a:hover {
    color: #000;
    background: #eeeeee;
  }

  /* sub display*/
  ul.primary li:hover ul {
    display: block;
    background: #fff;
  }

  /* keeps the tab background white */
  ul.primary li:hover a {
    background: #fff;
    color: #666;
    text-shadow: none;
  }

  ul.primary li:hover > a {
    color: #000;
  }
</style>

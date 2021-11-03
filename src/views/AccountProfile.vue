<template>
  <div style="text-align:center;" v-if="user" class="container">
    <div id="displayPictureContainer">
      <img :src="profileImg" id="displayPic" />
      <button type="button" id="profileButton" @click="$router.push('/editProfile')">
        Edit Profile
      </button>
      <br />
    </div>
    <br /><br />
    <div id="profileInfoContainer">
      <p>
        Name: <strong>{{ user.displayName }}</strong
        ><br />
        Email:<strong>{{ user.email }}</strong>
      </p>
      <br />
    </div>
    <LogOut />
  </div>
</template>

<script>
  import LogOut from "@/components/SignOut.vue";
  import GirlPic from "@/assets/girl.png";

  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    name: "AccountProfile",
    components: {
      LogOut,
    },
    data() {
      return {
        user: false,
        profileImg: GirlPic,
      };
    },

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          if (user.photoURL != null) this.profileImg = user.photoURL;
        }
      });
    },
  };
</script>

<style scoped>
  p {
    text-align: left;
    width: 50%;
    float: middle;
    margin: 0 auto;
  }

  #profileButton {
    width: 25%;
    height: 30px;
    margin-left: 12.5%;
    margin-right: 12.5%;
    margin-top: 75px;
    border-radius: 10px;
  }

  #displayPictureContainer {
    display: flex;
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
  }

  #profileInfoContainer {
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
  }

  #displayPic {
    width: 30%;
    margin-left: 10%;
    margin-right: 10%;
    border: 4px solid #333;
  }
</style>

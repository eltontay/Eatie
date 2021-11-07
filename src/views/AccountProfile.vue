<template>
  <div style="text-align:center;" v-if="user" class="container">
    <div id="displayPictureContainer">
      <img :src="profileImg" id="displayPic" />
      <button
        type="button"
        id="profileButton"
        @click="$router.push('/editProfile')"
      >
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
  import firebaseApp from "../firebase.js";
  import { getDoc, getFirestore, doc } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  import LogOut from "@/components/SignOut.vue";
  import girlPic from "@/assets/girl.png";
  import boyPic from "@/assets/boy.png";

  const db = getFirestore(firebaseApp);

  export default {
    name: "AccountProfile",
    components: {
      LogOut,
    },
    data() {
      return {
        user: false,
        profileImg: null,
      };
    },

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
          this.setDP();
        }
      });
    },
    methods: {
      async setDP() {
        if (this.user.photoURL != null) {
          this.profileImg = this.user.photoURL;
          return;
        }
        var a = doc(db, String(this.fbuser), "profile");
        var b = await getDoc(a);
        if (b.data() == undefined) {
          this.profileImg = boyPic;
        } else if (b.data()["gender"] === "Boy") {
          this.profileImg = boyPic;
        } else {
          this.profileImg = girlPic;
        }
      },
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
    width: 200px;
    height: 200px;
    object-fit: cover;
    background-size: cover;
    background-position: center;
    border-radius: 100%;
    border: 4px solid black;
  }
</style>

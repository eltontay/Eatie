<template>
  <div style="text-align:center;" v-if="user" class="container">
    <div id="displayPictureContainer">
      <img :src="profileImg" id="displayPic" />
      <div id="profileInfoContainer">
        <h2>{{ user.displayName }}</h2>
        <h3>{{ user.email }}</h3>
        <button
          type="button"
          id="profileButton"
          @click="$router.push('/EditProfile')"
        >
          Edit Profile <fa icon="edit" />
        </button>
      </div>
    </div>
    <br /><br />
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
  #profileButton {
    width: 100%;
    height: 30px;
    margin-left: 12.5%;
    margin-right: 12.5%;
    margin-top: 25px;
    border-radius: 10px;
  }

  #displayPictureContainer {
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
    display: flex;
  }

  #profileInfoContainer {
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
    margin-top: 50px;
    text-align: left;
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

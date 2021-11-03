<template>
  <div style="text-align:center;" v-if="user" class="container">
    <h2>Edit Profile</h2>
    <div id="displayPictureContainer">
      <img :src="profileImg" id="displayPic" />
      <br />
      <div id="editProfile">
      <h3>Upload image:</h3>
              <input type="file" accept="image/*" @change="imageChange" /><br /><br />
      <button type="button" id="submitButton" v-on:click="uploadDP()">
        Submit
      </button>
      </div>
    </div>
    <br /><br />
          <form>
        <label for="profileName">New name: </label>
        <input type="text" id="profileName" required="" placeholder="Enter new name"> <br><br>
        <label for="password1">New password: </label>
        <input type="password" id="password1" required="" placeholder="Enter new password"> <br><br>
        <label for="password2">Confirm password: </label>
        <input type="password" id="password2" required="" placeholder="Confirm password"> <br><br>
      </form>
    <div id="profileInfoContainer">
      <p>
        Name: <strong>{{ user.displayName }}</strong
        ><br />
        Email:<strong>{{ user.email }}</strong>
      </p>
      <br />
    </div>
  </div>
</template>

<script>
  import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";

  import girlPic from "@/assets/girl.png";
  // import boyPic from "@/assets/boy.png";

  export default {
    name: "AccountProfile",
    components: {},
    data() {
      return {
        user: false,
        fbuser: "",
        profileImg: girlPic,
        currUploadedImage: null,
        newName: "",
        newPassword: "",
        confirmPassword: "",
      };
    },

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fbuser = auth.currentUser.email;
          if (user.photoURL != null) {
            this.profileImg = user.photoURL;
          }
        }
      });
    },
    methods: {
      imageChange(e) {
        this.currUploadedImage = e;
        console.log(e);
      },
      async uploadDP() {
        if (this.currUploadedImage == null) return;
        let storageRef = ref(getStorage(), this.fbuser + "/displayPic");
        await uploadBytes(storageRef, this.currUploadedImage.target.files[0]);
        getDownloadURL(storageRef)
          .then((url) => {
            const auth = getAuth();
            updateProfile(auth.currentUser, {
              photoURL: url,
            });
            this.profileImg = url;
            console.log(url);
          })
          .catch((error) => {
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
      },
    },
  };
</script>

<style scoped>
  #editProfile {
    width: 50%;
    height: 30px;
    border-radius: 10px;
  }

  #submitButton {
    width: 25%;
    height: 30px;
    margin-left: 12.5%;
    margin-right: 12.5%;
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

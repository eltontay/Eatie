<template>
  <div style="text-align:center;" v-if="user" class="container">
    <h2>Edit Profile</h2>
    <div>
      <div id="displayPictureContainer">
        <img :src="profileImg" id="displayPic" />
        <div id="editProfile">
          <h3>Upload Profile Picture:</h3>
          <input
            type="file"
            accept="image/*"
            @change="imageChange"
          /><br /><br />
          <button type="button" id="uploadPhoto" v-on:click="uploadDP()">
            Upload
          </button>
        </div>
      </div>
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
    <form id="profileForm">
      <label for="profileName">New name: </label>
      <input type="text" id="profileName" required="" v-model="newName" />
      <br /><br />
      <label for="password1">Current password: </label>
      <input
        type="password"
        id="password1"
        required=""
        v-model="currentPassword"
      />
      <br /><br />
      <label for="password2">New password: </label>
      <input type="password" id="password2" required="" v-model="newPassword" />
      <br /><br />
      <label for="password3">Confirm password: </label>
      <input
        type="password"
        id="password3"
        required=""
        v-model="confirmPassword"
      />
      <br /><br />
      <button type="button" id="submitButton" v-on:click="updateProf()">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
  import firebaseApp from "../firebase.js";
  import {
    getAuth,
    onAuthStateChanged,
    updateProfile,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
  } from "firebase/auth";
  import { getDoc, getFirestore, doc } from "firebase/firestore";
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";

  import router from "@/router/index.js";
  import girlPic from "@/assets/girl.png";
  import boyPic from "@/assets/boy.png";

  const db = getFirestore(firebaseApp);

  export default {
    name: "AccountProfile",
    components: {},
    data() {
      return {
        user: false,
        fbuser: "",
        profileImg: null,
        currUploadedImage: null,
        newName: "",
        currentPassword: "",
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
          this.newName = user.displayName;
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
      imageChange(e) {
        this.currUploadedImage = e;
        console.log(e);
      },
      async uploadDP() {
        if (this.currUploadedImage == null) {
          alert("Choose a picture");
          return;
        }
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
      updateProf() {
        var name = this.newName;
        if (
          this.newName == "" ||
          this.currentPassword == "" ||
          this.newPassword == "" ||
          this.confirmPassword == ""
        ) {
          alert("Fill in all fields!");
          return;
        } else if (this.newPassword !== this.confirmPassword) {
          alert("Passwords do not match!");
          return;
        } else if (this.currentPassword === this.newPassword) {
          alert("Provide a new password!");
          return;
        }
        const credential = EmailAuthProvider.credential(
          this.fbuser,
          this.currentPassword
        );
        reauthenticateWithCredential(this.user, credential)
          .then(() => {
            // User re-authenticated.
            updatePassword(this.user, this.newPassword)
              .then(() => {
                alert("Profile updated!");
                updateProfile(this.user, {
                  displayName: name,
                })
                  .then(() => {
                    // Profile updated!
                  })
                  .catch((error) => {
                    console.error("Problem updating username: " + error.code);
                  });
                router.push("/Profile");
              })
              .catch((error) => {
                switch (error.code) {
                  case "auth/weak-password":
                    alert(
                      "Weak password! Password must be at least 6 characters long"
                    );
                    break;
                }
                console.error("Problem updating password: " + error.code);
              });
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/wrong-password":
                alert("Wrong password!");
                return;
            }
            console.error("Problem with authentication: " + error.code);
          });
      },
    },
  };
</script>

<style scoped>
  #editProfile {
    width: 50%;
  }

  #submitButton,
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

  #profileForm {
    display: inline-block;
    text-align: right;
  }
</style>

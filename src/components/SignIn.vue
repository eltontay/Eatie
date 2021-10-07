<template>
  <form id="signInPortal">
      <label for="login_username">Username:</label>
      <input type="text" id = "login_username" required = True, placeholder = "Enter your username"> <br><br>
      <label for="login_password">Password:</label>
      <input type="text" id = "login_password" required = True, placeholder = "Enter your password"> <br><br>

      <button id = "authUser" type="button" v-on:click="authenticateUser()">Sign In</button>
      
  </form>
</template>

<script>
import firebaseApp from "../firebase.js"
import {getFirestore} from "firebase/firestore"
import {getDoc, doc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    methods:{
        async authenticateUser(){
            var a = String(document.getElementById("login_username").value);
            var b = String(document.getElementById("login_password").value);
            console.log(a)

            const acct = await getDoc(doc(db,"acct_detail", a))
            console.log("working...")

            if (acct.exists()) {
                console.log("User exists")
                if ( b == acct.data().password ) {
                    console.log("User is authenticated")
                }
            } else {
                console.log("No User Found")
            }
            
        }
    }

}
</script>

<style>

</style>
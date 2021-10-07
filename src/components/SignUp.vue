<template>
  <form id="detailCollection">
      <label for="username">Username:</label>
      <input type="text" id = "username" required = True, placeholder = "Enter your desired username"> <br><br>
      <label for="password">Password:</label>
      <input type="text" id = "password" required = True, placeholder = "Password must be 8 characters"> <br><br>

      <button id = "createAcct" type="button" v-on:click="createUserAccount()">Create Account</button>
      
  </form>
</template>

<script>
import firebaseApp from "../firebase.js"
import {getFirestore} from "firebase/firestore"
import {doc,setDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    methods:{
        async createUserAccount(){
            var a = document.getElementById("username").value;
            var b = document.getElementById("password").value;

            try {
                const docRef = await setDoc(doc(db, "acct_detail", a),{
                    username: a,
                    password: b
                })
                console.log(docRef)
                document.getElementById('detailCollection').reset();
            } catch(error) {
                console.error("Error creating account")
            }
            
        }
    }

}
</script>

<style>

</style>
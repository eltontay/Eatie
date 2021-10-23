<template>

<div style="text-align:center;" v-if="user">

    <NavBar/>

    <h3>About</h3>
    <h2>Welcome to Eatie!</h2>
    <h3>How does it work? 
        <br> “Eatie” is a food journal web application that promotes weight-loss through pictorial food logs, calorie tracking and detailed nutritional breakdowns. 
            With Eatie’s health profile algorithm, users will be able to get personalised calorie targets according to their unique profiles. Eatie also has an extensive 
            food database that can assist users to get a more accurate nutritional breakdown of their food intake. This would allow users to take better control of their goals 
            and understand which nutrition they are lacking. Eatie adopts a pictorial food journal to make journaling fun and easy. 
        <br> <br>
    </h3>
    <SignOut /> <br><br>    

</div>
  
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SignOut from '@/components/SignOut.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
    name:"About" ,

    components:{
    NavBar,
    SignOut

    },

    data() {
    return {
      user:false,        
        }
    },

    mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
      this.user = user;      
      }
  })

    },

}   
</script>

<style scoped>

.about{
   
    text-align: left;
    border: 2px solid black;
    box-shadow: 3px 3px grey 

}



</style>


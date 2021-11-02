<template>
 <div class="container">
 
   <h2 class = "Title">Step (2/4)</h2>
   <h3>What is your height?</h3>
 
   <div id="flex-container">
 
     <div id="flex-child">
       <img src="@/assets/height.png" alt="" class="" />
     </div>
 
        
     <form id="flex-child" class="form">       
       <input class = "input" type="text" placeholder = "ph" id="height" />
       <label for="height">My height (cm) is</label>
     </form>
    
 
     <button class ="Btn" @click="step2()">Next</button>
   </div>
 </div>
</template>




<script>
import firebaseApp from '../firebase.js';
import { getFirestore, setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
const db = getFirestore(firebaseApp);

export default {
  components: {},
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    async step2() {
      try {
        var height = document.getElementById('height').value;
        await setDoc(doc(db, 'profile', 'height'), {
          height: height,
        });
        console.log('pushing?');
        this.$router.push('./goalStep3');
        console.log('pushed');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


 
<style type="text/css">
/*
Color Theme
006d77
83c5be
edf6f9
ffddd2
e29578
*/
 
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

body {
 box-sizing: border-box;
 margin: 0;
 padding: 0;
 background-color: white;
 font-family: "lato", sans-serif;
 text-align: center;
}

 
 
img { 
max-width: 100%; 
height: auto; 
} 
 
 
 
 
.form {
 display:inline-block;
 background-color: white;
 width: 500px;
 border-radius: 8px;
 padding: 20px 40px;
 box-shadow: 0 10px 25px rgba(92, 99, 105, .2);
 align-items: center;
}
 
 
.title {
 font-size: 50px;
 margin-bottom: 100px;
}
 
/* Hide the placeholder texts (a) */
::placeholder {
 color: transparent;
}
 
 
.input {
 position: relative;
 top: 0px;
 left: 0px;
 height: 100%;
 width: 100%;
 border: 3px solid #DADCE0;
 border-radius: 3px;
 font-size: 18px;
 outline: none;
 background: none;
 z-index: 1;
}
 
.input:focus {
 border: 3px solid#83c5be;
}
 
 
.label {
 position: absolute;
 top: 15px;
 left: 15px;
 padding: 0 4px;
 background-color: white;
 color: #006d77;
 font-size: 16px;
 transition: 0.5s;
 z-index: 0;
}
 
 
.Btn {
 display: block;
 margin-left: auto;
 padding: 15px 30px;
 border: none;
 background-color: #e29578;
 color: white;
 border-radius: 6px;
 cursor: pointer;
 font-size: 16px;
 margin-top: 30px;
}
 
.Btn:hover {
 background-color: #f1c9bb;
 transform: translateY(-2px);
}
 
 
 
 
</style>
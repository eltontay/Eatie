<template>
 <div class="container">
   <h2>Step (4/4)</h2>
   <h3>What is your daily activity level?</h3>
   <div class = "activity">
     <button @click="activity1()" id = "btn1">
       <img class="activity1" src="@/assets/activity1.png" alt="" />
       <p class = "text">I am seated most of the time</p>
     </button>
     <br />
     <button @click="activity2()" id = "btn2">
       <img class="activity2" src="@/assets/activity2.png" alt="" />
       <p class = "text">I am standing half of the time</p>
     </button>
     <br />
     <button @click="activity3()" id = "btn3">
       <img class="activity3" src="@/assets/activity3.png" alt="" />
       <p class = "text">I am walking half of the time</p>
     </button>
     <br />
     <button @click="activity4()" id = "btn4">
       <img class="activity4" src="@/assets/activity4.png" alt="" />
       <p class = "text">I am constantly on the move</p>
     </button>
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
    async activity1() {
      try {
        await setDoc(doc(db, 'profile', 'activity'), {
          activity: 'activity1',
        });
        this.$router.push('./myGoals');
      } catch (error) {
        console.log(error);
      }
    },
    async activity2() {
      try {
        await setDoc(doc(db, 'profile', 'activity'), {
          activity: 'activity2',
        });
        this.$router.push('./myGoals');
      } catch (error) {
        console.log(error);
      }
    },
    async activity3() {
      try {
        await setDoc(doc(db, 'profile', 'activity'), {
          activity: 'activity3',
        });
        this.$router.push('./myGoals');
      } catch (error) {
        console.log(error);
      }
    },
    async activity4() {
      try {
        await setDoc(doc(db, 'profile', 'activity'), {
          activity: 'activity4',
        });
        this.$router.push('./myGoals');
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
 
h2, h3{
 color:#006d77;
}
 
p {
 color:#006d77;
 font-weight: 900;
}
 
.container {
 
 justify-content: center;
 align-items: center;
 height: 100vh;
}
 
.activity{
 justify-content: center;
 align-items: center;
 display: grid;
 grid-template-columns: 300px 50px 300px 0px ;
}
 
#btn1 .text{
 position:relative;
 bottom:10px;
 visibility:hidden;
}
 
#btn1:hover .text {
visibility:visible;
}
 
#btn2 .text{
 position:relative;
 bottom:10px;
 visibility:hidden;
}
 
#btn2:hover .text {
visibility:visible;
}
 
#btn3 .text{
 position:relative;
 bottom:10px;
 visibility:hidden;
}
 
#btn3:hover .text {
visibility:visible;
}
 
#btn4 .text{
 position:relative;
 bottom:10px;
 visibility:hidden;
}
 
#btn4:hover .text {
visibility:visible;
}
 
 
 
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
 background-color: #0f0a08;
 transform: translateY(-10px);
}
 
.button:active {
 background-color: #3e8e41;
 box-shadow: 0 5px #666;
 transform: translateY(4px);
}
 
 
</style>
 
 


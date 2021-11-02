 <template>
 <div class="container">
 
   <h3>What is your current weight?</h3>
 
   <div id="flex-container">
 
     <div id="flex-child">
       <img src="@/assets/weight.png" alt="" class="" />
     </div>
        
     <form id="flex-child" class="form">       
       <input class = "input" type="float" placeholder = "ph" id="weight" />
       <label for="weight">My weight (kg) is</label>
     </form>
  
     <button class ="Btn" @click="updateweight()">Submit</button>

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
    data() {
        return {    
        date: ""
        }
    },
    computed: {
        currentDate() {
            var today = new Date();
            return (
            today.getFullYear() +
            "-" +
            String(today.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(today.getDate()).padStart(2, "0")
        );
      },
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            this.fbuser = auth.currentUser.email;
        }
        });
        this.date = this.currentDate
    },

    methods: {
    async updateweight() {
      try {
        var weight = parseFloat(parseFloat(document.getElementById('weight').value).toFixed(1));
        await setDoc(doc(db, String(this.fbuser), 'weight_progress'), {
          [this.date]: weight,
        });
        console.log('pushing?');
        this.$router.push('./MyProgress');
        console.log('pushed');
      } catch (error) {
        console.log(error);
      }
    },
  },

}
</script>

<style>

</style>
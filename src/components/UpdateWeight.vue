 <template>
 <div class="container">
 
   <h3>What is your current weight?</h3>
   <input id="dateInput" type="date" v-model="weightDate"/>
   <br/> <br/>
 
   <div id="flex-container">
 
     <div id="flex-child">
       <img src="@/assets/weight.png" alt="" class="" />
     </div>
        
     <form id="flex-child" class="form" v-on:submit= "updateweight">   
       <label for="weight">My weight (kg) is</label>    
       <input type="text" id="weight" placeholder="ph" name="weight" pattern="\d{2,3}(\.\d{0,2})?" title="Please input weight up to 2 decimals" required>
       <button type="submit" class ="Btn">Enter</button>
     </form>
   </div>
 </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {    
        weightDate: '',
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
    beforeMount() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            this.fbuser = auth.currentUser.email;
        }
        });
        this.weightDate = this.currentDate
    },

    methods: {
    async updateweight(e) {
      e.preventDefault()
      try {
        let weight = parseFloat(parseFloat(document.getElementById('weight').value).toFixed(2));
        let weightDoc = doc(db, String(this.fbuser), 'weight_progress');
        let weightdb = await getDoc(weightDoc);
        if (weightdb.data() == undefined) {
          await setDoc(weightDoc, {
          [this.weightDate]: weight,
        });
        } else {
          await updateDoc(weightDoc, {
          [this.weightDate]: weight,
          }, { merge: true }); 
        }
        
        this.$router.push('./MyProgress');
      } catch (error) {
        alert("Hav")
        console.log(error);
      }
    },
  },

}
</script>

<style>

</style>
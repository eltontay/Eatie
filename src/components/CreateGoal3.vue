<template>
  <div class="container">
    <h2>Step (3/4)</h2>
    <h3>What is your weight?</h3>
    <div class="mx-600 mb-50">
      <div class="left">
        <div class="img-box">
          <img src="@/assets/weight.png" alt="" class="" />
        </div>
      </div>
      <form  class="right">
        <label for="height">My weight (kg) is</label>
        <input type="text" v-model="weight" id="weight" />
        <button @click.prevent="step3()">Next</button>
      </form>
    </div>
  </div>
</template>


<script>
// import firebaseApp from '../firebase.js';
// import { getFirestore, setDoc } from 'firebase/firestore';
// import { doc } from 'firebase/firestore';

// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// const db = getFirestore(firebaseApp);

export default {
  components: {},
  mounted() {
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     this.user = user;
    //   }
    // });
  },
  data (){
    return {
      weight: 0,
    }
  },
  methods: {
    async step3() {
      try {
        var weight = this.weight;
        
        if (weight < 5) {
          alert('Please enter a correct weight in KG')
          return false;
        }

        this.$store.commit('setWeight', weight);
        this.$router.push('./goalStep4');
        
        // await setDoc(doc(db, 'profile', this.user.uid), { 
        //   weight: weight,
        // });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created(){

    if(!this.$store.getters.getGoal.gender){
      this.$router.push('./goalStep1');
    }
  }
};
</script>

<style scoped>
.mb-50{
  padding-bottom: 50px;
}
.right{
  left: -40px;
}
</style>

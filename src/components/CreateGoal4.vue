<template>
  <div class="container">
    <h2>Step (4/4)</h2>
    <h3>What is your daily activity level?</h3>
    <div class="last-box">
      <div @click="setActivity('activity1')" class="single-box">
        <div class="img-b"> <img class="activity1" src="@/assets/activity1.png" alt="" /> </div>
        <h3>I am seated most of the time</h3>
      </div>
      <div @click="setActivity('activity2')" class="single-box">
        <div class="img-b"> <img class="activity2" src="@/assets/activity2.png" alt="" /> </div>
        <h3>I am standing half of the time</h3>
      </div>
      <div @click="setActivity('activity3')" class="single-box">
        <div class="img-b"> <img class="activity3" src="@/assets/activity3.png" alt="" /> </div>
        <h3>I am walking half of the time</h3>
      </div>
      <div @click="setActivity('activity4')" class="single-box">
        <div class="img-b"> <img class="activity4" src="@/assets/activity4.png" alt="" /> </div>
        <h3>I am constantly on the move</h3>
      </div>
    </div>
  </div>
</template>

<script>
// import firebaseApp from '../firebase.js÷';
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
  methods: {
    async setActivity(activity) {
      if(!['activity1', 'activity2', 'activity3', 'activity4'].includes(activity)){
        alert('Activity does not exist')
        return false;
      }

      try {
        this.$store.commit('setActivity', activity);        
        this.$router.push('./goalReport');

        // await setDoc(doc(db, 'profile', this.user.uid), {
        //   activity: 'activity1',
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

<style scoped lang="scss">
.last-box{
  display: flex;
  flex-wrap: wrap;
}
.single-box{
flex: 0 0 25%;
max-width: 25%;
text-align: center;
cursor: pointer;
h3{
 padding-left: 15px;
 padding-right: 15px;
 font-size: 20px;
 text-align: center;
}
.img-b{
  width: 100%;
  img{
    display: block;
    width: 100%;
    object-fit: cover;
  }
}
}

</style>

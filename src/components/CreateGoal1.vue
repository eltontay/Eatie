<template>
  <div class="container">
    <h2>Step (1/4)</h2>
    <div>
      <h3>What is your gender?</h3>
      <div class="gender-box">
        <div @click="setGender('Boy')" id="boy" value="boy">
          <img src="@/assets/boy.png" alt="" />
          <span>Male</span>
        </div>
        <br />
        <div @click="setGender('Girl')" id="girl" value="girl">
          <img src="@/assets/girl.png" alt="" />
          <span>Female</span>
        </div>
      </div>
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
  methods: {
    async setGender(gender) {
      try {
        if(!(gender == 'Boy' || gender == 'Girl')){
          alert('Something went wrong, please try again')
          return false;
        }

        this.$store.commit('setGender', gender);
        this.$router.push('./goalStep2');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.gender-box{
  display: flex;
  justify-content: space-between;
 
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}
.gender-box div{
  max-width: 100%;
  background: transparent;
  border:none;
  width: 150px;
  cursor: pointer;
  height: 200px;

}
.gender-box div img{
  object-fit: cover;
  display: block;
  height: 100%;
  width: 100%;
}
.gender-box div span{
  font-size: 20px;
  font-weight: 600;
}
</style>

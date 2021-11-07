<template>
  <div class="container">
  <h2>Step (2/4)</h2>
  <h3>What is your height?</h3>
  <div class="mx-600">
    <div class="left">
      <div class="img-box">
        <img src="@/assets/height.png" alt="" class="" />
      </div>
    </div>
    <form class="right">
      <label for="height">My height (cm) is</label>
      <input type="number" v-model="height" id="height" />
      <button @click.prevent="step2()">Next</button>
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
  data (){
    return {
      height: 0,
    }
  },
  mounted() {
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     this.user = user;
    //   }
    // });
  },
  methods: {
    async step2() {
      try {
        let height = this.height;

        if (height < 30) {
          alert('Please enter a correct height in CM')
          return false;
        }
        
        this.$store.commit('setHeight', height);
        this.$router.push('./goalStep3');

        // await setDoc(doc(db, 'profile', this.user.uid), {
        //   height: height,
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

<style  lang="scss">
.mx-600{
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  display: flex;
  align-items: center;
  button{
    width: 100%;
    max-width: 100px;
    padding: 7px 10px;
    border: 1px solid #2C3D50;
    cursor: pointer;
    margin-top: 15px;
  }
}
.left{
  .img-box{
    width: 350px;
    height: 300px;
    img{
      display: block;
      width: 100%;
      position: relative;
      top: -30px;
      height: 100%;
      object-fit: cover;
    }
  }
}
.right{
  position: relative;
  left: -100px;
  top: -30px;
  label{
    display: block;
    margin: 0px;
    font-size: 16px;
    font-weight: 600;
    margin-left: -20px;
  }
  input{
    max-width: 200px;
    display: block;
    border: none;
    background: #D9D9D9;
    height: 35px;
    padding-left: 15px;
    margin-top: 10px;
    border-radius: 2px;
    &:focus{
    outline: none;
    border: none;
    }
  }
}

</style>

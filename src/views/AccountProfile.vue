<template>
  <div style="text-align:center;" v-if="user" class="container">
      <br/>
      <img src="@/assets/girl.png" style="width:150px;height:150px;border:4px solid #333"/>
      <br/>
      <br/>
      <p> Name: <strong>{{user.displayName}}</strong><br/>
      Email:<strong>{{user.email}}</strong><br/>
      Uid:<strong>{{user.uid}}</strong><br/>
      Provider: <strong>{{user.providerData[0].providerId}}</strong></p>
      <br/>
      <LogOut/>
  </div>
</template>

<script>
import LogOut from '@/components/SignOut.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
    name: 'AccountProfile',
    components: {
        LogOut
    },
    data() {
        return {
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    }
}
</script>

<style scoped>
p{
    text-align: left;
    width: 50%;
    float:middle;
    margin:0 auto;

}
</style>
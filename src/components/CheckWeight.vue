<template>
    <div style="margin-bottom:20px">
        <div v-if = "!flag">
            <h3>You have not updated your weight this week! Go to <router-link to="/WeightUpdate">Weight Update</router-link> now!</h3>
        </div>
        <div v-else>
            <h3>If you would like to update your weight today, click <router-link to="/WeightUpdate">Weight Update</router-link></h3>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, getDoc} from 'firebase/firestore';
import { doc } from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            fbuser: "",
            flag: false
        }
    },
    beforeMount() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.fbuser = auth.currentUser.email;
                this.checkWeight()
            }
        });
    },
    methods: {
        currentDate(num) {
            var today = new Date() ;
            today.setDate(today.getDate() - num)
            return (today.getFullYear() +
            "-" +
            String(today.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(today.getDate()).padStart(2, "0"))
        },
        async checkWeight() {
            let cur_weight = await getDoc(doc(db, this.fbuser , "weight_progress"));
            if (cur_weight.data() != undefined) {
                for (let i = 0; i < 7; i++) {
                    let cur_date = this.currentDate(i);
                    if (cur_weight.data()[cur_date] != undefined) {
                        console.log("updated liao")
                        this.flag = true;
                        return ;
                    }
                }
                console.log("updated not")
                this.flag = false;
                return ;
            }
            console.log("fbuser not loaded")
            this.flag = false;
            return; 
        },
  },

}
</script>

<style>

</style>
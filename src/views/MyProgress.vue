<template>
    <h2>My Progress</h2>
    <MyProgressDaily/>
    <h3>{{weightUpdateCheckMessage}}</h3>
    <MyProgressJourney/>
</template>

<script>
import MyProgressDaily from '@/components/MyProgressDaily.vue'
import MyProgressJourney from '@/components/MyProgressJourney.vue'

export default {
  name: 'MyProgress',
  components: {
    MyProgressDaily,
    MyProgressJourney
  },
  data(){
    return{
      weightUpdateCheckMessage: "You have not updated your weight for this week! Update here" // change message
    }
  }
}
</script>

<style>

</style>
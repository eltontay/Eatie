<template>
    <h2>My Progress</h2>
    <MyProgressDaily/>
    <CheckWeight/>
    <MyProgressJourney/>
</template>

<script>
import MyProgressDaily from '@/components/MyProgressDaily.vue'
import MyProgressJourney from '@/components/MyProgressJourney.vue'
import CheckWeight from '@/components/CheckWeight.vue'

export default {
  name: 'MyProgress',
  components: {
    MyProgressDaily,
    MyProgressJourney,
    CheckWeight,
  },
}
</script>

<style>

</style>
<template>
<div class="container">
  <h2>My Goals</h2>
  <CreateGoal/>
</div>
</template>

<script>
import CreateGoal from '../components/CreateGoal.vue'

export default {
  name: 'App',
  components: {
      CreateGoal
  }
}
</script>

<style>

</style>

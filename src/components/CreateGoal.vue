<template>
  <div>
      <h3>You have not created a goal yet</h3>
      <button @click="Step1">
          <h3>Create Goal</h3>
      </button>
  </div>
</template>

<script>


export default {
    methods:{
        Step1(){
            this.$router.push('./About');
        }
    }
}
</script>

<style>

</style>
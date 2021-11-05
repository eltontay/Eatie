<template>
  <div class="container">
    <FoodDisplay :date="date[0]" />
    <FoodDisplay :date="date[1]" />
    <FoodDisplay :date="date[2]" />
    <FoodDisplay :date="date[3]" />
    <FoodDisplay :date="date[4]" />
    <FoodDisplay :date="date[5]" />
    <FoodDisplay :date="date[6]" />
  </div>
</template>

<script>
  import FoodDisplay from "@/components/FoodDisplay.vue";

  export default {
    components: {
      FoodDisplay,
    },
    computed: {
      date() {
        let currDate = new Date();
        let d = {};
        for (let i = 0; i < 7; i++) {
          d[i] = this.convertToDateString(currDate);
          currDate.setDate(currDate.getDate() - 1);
        }
        return d;
      },
    },
    methods: {
      convertToDateString(date) {
        return (
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0")
        );
      },
    },
  };
</script>

<style></style>

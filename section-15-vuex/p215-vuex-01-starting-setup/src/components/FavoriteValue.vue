<template>
  <h3>I am two times of store counter: {{ counter }}</h3>
  <p>We do more...</p>
</template>

<script>

export default {
  computed: {
    counter(){
      return this.$store.getters.finalCounter;
    }
  },
};
</script>



<style scoped>

</style>
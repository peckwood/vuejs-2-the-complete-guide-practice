<script>
export default {
  methods: {
    addOne(){
      this.$store.state.counter++;
    }
  }
};
</script>

<template>
  <button @click='addOne'>Add 1</button>
</template>

<style scoped>

</style>
<script>
export default {
  methods: {
    addOne(){
      this.$store.commit('increase', 10);
    }
  }
};
</script>

<template>
  <button @click='addOne'>Add 10</button>
</template>

<style scoped>

</style>
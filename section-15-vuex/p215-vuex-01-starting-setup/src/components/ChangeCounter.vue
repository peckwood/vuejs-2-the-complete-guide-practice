<script>
export default {
  methods: {
    addOne(){
      this.$store.commit('increment');
    }
  }
};
</script>

<template>
  <button @click='addOne'>Add 1</button>
</template>

<style scoped>

</style>
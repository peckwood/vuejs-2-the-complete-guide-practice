<script>
export default {
  methods: {
    add(){
      this.$store.dispatch('increase', {type: 'increase',value: 10});
    }
  }
};
</script>

<template>
  <button @click='add'>ChangeCounter Add 10</button>
</template>

<style scoped>

</style>
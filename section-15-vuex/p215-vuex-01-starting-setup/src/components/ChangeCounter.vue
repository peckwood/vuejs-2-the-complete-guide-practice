<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    add(){
      this.$store.dispatch('increase', {type: 'increase',value: 10});
    },

    // ...mapActions(['increase'])
    ...mapActions({
      add2: 'increase',
      inc: 'increment'
    })
  }
};
</script>

<template>
  <button @click='add'>ChangeCounter Add 10</button>
<!--  <button @click='increase({value: 11})'>ChangeCounter Add 11 with mapAction</button>-->
  <button @click='add2({value: 11})'>ChangeCounter Add 11 with mapAction</button>
</template>

<style scoped>

</style>
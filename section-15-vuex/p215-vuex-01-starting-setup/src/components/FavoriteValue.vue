<template>
  <h3>I am two times of store counter: {{ counter }}</h3>
  <p>We do more...</p>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters({
      counter: 'numbers/finalCounter'
    })
  },
};
</script>



<style scoped>

</style>
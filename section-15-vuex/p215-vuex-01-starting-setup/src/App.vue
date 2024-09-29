<template>
  <base-container title="Vuex">
    <the-counter></the-counter>
    <favorite-value></favorite-value>
    <button @click='addOne'>Add 2</button>
    <change-counter></change-counter>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from '@/components/TheCounter.vue';
import ChangeCounter from '@/components/ChangeCounter.vue';
import FavoriteValue from '@/components/FavoriteValue.vue';

export default {
  components: {
    ChangeCounter,
    TheCounter,
    BaseContainer,
    FavoriteValue
  },

  methods: {
    addOne(){
      this.$store.commit('increase', 2);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>

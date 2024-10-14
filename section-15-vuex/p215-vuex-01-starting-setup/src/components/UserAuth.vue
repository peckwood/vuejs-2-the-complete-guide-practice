<template>
  <button v-if='!isLoggedIn' @click='logIn'>Login</button>
  <button v-if='isLoggedIn' @click='logOut'>Logout</button>
</template>

<script>


export default {
  computed: {
    isLoggedIn(){
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logIn(){
      this.$store.dispatch({type: 'logIn'});
    },
    logOut(){
      this.$store.dispatch({type: 'logOut'});
    }
  }
};
</script>



<style scoped>

</style>
<template>
  <button v-if='!isLoggedIn' @click='logIn'>Login</button>
  <button v-if='isLoggedIn' @click='logOut'>Logout</button>
  <p> testAuth1(there is nothing because loggedIn is not inside this state): {{ isTestAuth1 }}</p>
  <p> testAuth2(workaround): {{ isTestAuth2 }}</p>
</template>

<script>


export default {
  computed: {
    isLoggedIn(){
      return this.$store.getters.isLoggedIn;
    },
    isTestAuth1(){
      return this.$store.getters.testAuth1;
    },
    isTestAuth2(){
      return this.$store.getters.testAuth2;
    },
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
<template>
  <button @click='jump'>Jump to teams</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    jump(){
      this.$router.push('/teams')
    }
  },
  beforeCreate(){
    console.log('beforeCreate lifecycle hook')
  },
  beforeRouteEnter(to, from, next) {
    console.log('UserList Cmp beforeRouteEnter');
    console.log('to', to);
    console.log('from', from);
    next();
  },
  beforeRouteLeave(to, from, next){
    console.log('UserList Cmp beforeRouteLeave');
    console.log('to', to);
    console.log('from', from);
    const confirmLeave = confirm('Are you sure you want to leave?')
    next(confirmLeave);
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
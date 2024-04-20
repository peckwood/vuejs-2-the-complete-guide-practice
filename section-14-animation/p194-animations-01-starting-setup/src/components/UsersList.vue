<template>
  <ul>
    <li v-for='user in users' :key='user' @click='removeUser(user)'>
      {{user}}
    </li>
  </ul>
  <div>
    <input type='text' ref='newUserName'/>
    <button @click='addUser'>Add User</button>
  </div>
</template>

<script>

export default {
  data(){
    return {
      users: ['Max', 'Manu', 'Julie', 'Angela', 'Michael']
    }
  },
  methods: {
    addUser(){
      const user = this.$refs.newUserName.value;
      this.users.unshift(user);
    },
    removeUser(user){
      this.users = this.users.filter(existingUser => existingUser !== user);
    }
  }
};
</script>


<style scoped>
ul {
  list-style: none;
  margin: 1em 0;
  padding: 0;
  text-align: center;
}
li {
  padding: 1em;
  border: 1px solid #ccc;
}
</style>
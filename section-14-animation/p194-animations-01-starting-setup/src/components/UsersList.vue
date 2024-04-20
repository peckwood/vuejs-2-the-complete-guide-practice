<template>
  <transition-group tag='ul' name='user-list'>
    <li v-for='user in users' :key='user' @click='removeUser(user)'>
      {{ user }}
    </li>
  </transition-group>
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
.user-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.user-list-enter-active {
  transition: all 0.5s ease-out;
}
.user-list-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.user-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.user-list-leave-active {
  transition: all 0.5s ease-in;
  position: absolute;
}
.user-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.user-list-move {
  transition: transform 0.5s ease-out;
}
</style>
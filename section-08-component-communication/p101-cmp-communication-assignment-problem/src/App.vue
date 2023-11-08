<template>
  <section>
    <ActiveUser :username="user.username" :age="user.age"></ActiveUser>
    <UserData @submit2="updateUser"></UserData>
  </section>
</template>

<script>
import ActiveUser from "@/components/ActiveUser.vue";
import UserData from "@/components/UserData.vue";

export default {
  components: {ActiveUser, UserData},
  data() {
    return {
      user: {
        username: '',
        age: undefined
      }
    }
  },
  methods: {
    updateUser(newUser){
      this.user = newUser;
    }
  }
};
</script>
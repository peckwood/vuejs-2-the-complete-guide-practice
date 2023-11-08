<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>Username</label>
      <input type="text" v-model="newUser.username"/>
    </div>
    <div>
      <label>Age</label>
      <input type="number" v-model="newUser.age"/>
    </div>
    <button>Submit</button>
  </form>
</template>

<script>
export default {
  data(){
    return {
      newUser: {
        username: '',
        age: ''
      }
    }
  },
  methods: {
    submitForm(){
      const newUserCopy = {...this.newUser};
      this.$emit('submit2', newUserCopy);
    }
  }
};
</script>


<style scoped>

</style>
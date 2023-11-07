<template>
  <form>
    <div>
      <label>Name</label>
      <input type="text" v-model="newFriend.name"/>
    </div>
    <div>
      <label>Phone</label>
      <input type="tel" v-model="newFriend.phone"/>
    </div>
    <div>
      <label>Email</label>
      <input type="text" v-model="newFriend.email"/>
    </div>
    <div>
      <label>Is Favorite?</label>
      <select v-model="newFriend.isFavorite">
        <option :value="true">Yes</option>
        <option :value="false">No</option>
      </select>
    </div>
    <button @click.prevent="submit2">Submit</button>
  </form>
</template>

<script>
  export default {
    emits: ['submit3' ],
    data(){
      return {
        newFriend: {
          name: '',
          phone: '',
          email: '',
          isFavorite: false
        }
      }
    },
    methods: {
      submit2(){
        let newFriend2 = {
          ...this.newFriend
        };
        this.$emit('submit3', newFriend2);
        this.newFriend = {isFavorite: false};
      }
    }
  };
</script>

<style scoped>

</style>
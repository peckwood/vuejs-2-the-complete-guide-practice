<template>
  <base-card
  >
    <template #default>
      <form @submit.prevent='onSubmit'>
        <div class='form-control'>
          <label>Title</label>
          <input type='text' v-model='newResource.title' id='title' name='title'>
        </div>
        <div class='form-control'>
          <label>Description</label>
          <textarea v-model='newResource.description' id='description' name='description' rows='3'></textarea>
        </div>
        <div class='form-control'>
          <label>Link</label>
          <input v-model='newResource.link' id='link' name='link' >
        </div>
        <div>
          <base-button type='submit'>Submit</base-button>
        </div>
      </form>
    </template>
  </base-card>
</template>
<script>
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

export default {
  components: { BaseButton, BaseCard },
  emits: ['submit'],
  data() {
    return {
      newResource: {
        title: '',
        description: '',
        link: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.newResource.id = this.newResource.title;
      this.$emit('submit', this.newResource);
    }
  }
};
</script>


<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
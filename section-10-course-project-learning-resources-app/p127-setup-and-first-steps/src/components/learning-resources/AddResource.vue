<template>

  <base-dialog
    ref='baseDialog'
    title='Invalid Input'
    v-if='inputIsInvalid'
    @close='confirmError'>
    <template #default>
      <p>Invalid input is detected</p>
      <p>Please check your input</p>
    </template>
    <template #actions>
      <base-button @click='confirmError'>Okay</base-button>
    </template>
  </base-dialog>
  <base-card
  >
    <template #default>
      <form @submit.prevent='onSubmit'>
        <div class='form-control'>
          <label>Title</label>
          <input type='text' ref='titleInput' id='title' name='title'>
        </div>
        <div class='form-control'>
          <label>Description</label>
          <textarea ref='descInput' id='description' name='description' rows='3'></textarea>
        </div>
        <div class='form-control'>
          <label>Link</label>
          <input ref='linkInput' id='link' name='link' >
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
import BaseDialog from '@/components/UI/BaseDialog.vue';

export default {
  components: { BaseDialog, BaseButton, BaseCard },
  inject: ['addNewResource'],
  emits: ['submit'],
  data() {
    return {
      newResource: {
        title: '',
        description: '',
        link: ''
      },
      inputIsInvalid: false,
    }
  },
  methods: {
    onSubmit() {
      const title = this.$refs.titleInput.value;
      const description = this.$refs.descInput.value;
      const link = this.$refs.linkInput.value;
      if(title.trim() === ''
      || description.trim() === ''
      || link.trim() === ''){
        this.inputIsInvalid = true;
        return;
      }
      const newResource = {
        id: new Date().toISOString(),
        title: title,
        description: this.$refs.descInput.value,
        link: this.$refs.linkInput.value
      };
      this.addNewResource(newResource);
    },
    confirmError(){
      this.inputIsInvalid = false;
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
<template>
  <base-card>
    <base-button @click='switchToStored'>Stored Resources</base-button>
    <base-button @click='switchToAddResource'>Add Resource</base-button>
    <component :is='currentTab'></component>
  </base-card>
</template>
<script>

import LearningResource from '@/components/learning-resources/LearningResource.vue';
import AddResource from '@/components/learning-resources/AddResource.vue';
import StoredResources from '@/components/learning-resources/StoredResources.vue';

export default {
  components: { StoredResources, AddResource, LearningResource },
  data(){
    return {
      currentTab: 'stored-resources'
    }
  },
  methods: {
    switchToAddResource(){
      this.currentTab = 'add-resource';
    },
    switchToStored(){
      this.currentTab = 'stored-resources';
    }
  }
};
</script>


<style scoped>

</style>
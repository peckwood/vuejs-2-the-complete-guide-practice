<template>
  <base-card>
    <base-button
      @click="switchTab('stored-resources')"
      :mode='storedButtonMode'
    >Stored Resources
    </base-button>
    <base-button
      @click="switchTab('add-resource')"
      :mode='addButtonMode'
    >Add Resource
    </base-button>
    <component :is='currentTab' @submit='addNewResource'></component>
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
      currentTab: 'stored-resources',
      storedResources: [
        {
          id: 'official-guide',
          title: 'Official Guide',
          description: 'The official Vue.js documentation.',
          link: 'https://vuejs.org',
        },
        {
          id: 'google',
          title: 'Google',
          description: 'Learn to google...',
          link: 'https://google.org',
        },
      ],
    }
  },
  computed: {
    storedButtonMode(){
      return this.currentTab === 'stored-resources' ? null : 'flat';
    },
    addButtonMode(){
      return this.currentTab === 'add-resource' ? null : 'flat';
    }
  },
  provide() {
    return {
      storedResources: this.storedResources
    }
  },
  methods: {
    switchTab(tab){
      this.currentTab = tab;
    },
    addNewResource(data){
      this.storedResources.push(data);
    }
  }
};
</script>


<style scoped>

</style>
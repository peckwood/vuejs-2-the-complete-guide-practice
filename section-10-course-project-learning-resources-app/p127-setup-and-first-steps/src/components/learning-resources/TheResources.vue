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
    <keep-alive>
      <component :is='currentTab'></component>
    </keep-alive>
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
      storedResources: this.storedResources,
      addNewResource: this.addNewResource,
      deleteResource: this.removeResource
    }
  },
  methods: {
    switchTab(tab){
      this.currentTab = tab;
    },
    addNewResource(data){
      this.storedResources.unshift(data);
      this.currentTab = 'stored-resources';
    },
    removeResource(resId){
      console.log('resources length before ', this.storedResources.length);
      // this.storedResources = this.storedResources.filter((res) => res.id !== resId);
      this.storedResources.splice(this.storedResources.findIndex(res => res.id === resId), 1);
      console.log('resources length after ', this.storedResources.length);
    }
  }
};
</script>


<style scoped>

</style>
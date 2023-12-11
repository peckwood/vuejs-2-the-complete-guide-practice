<template>
  <ul>
    <learning-resource
      v-for='resource in storedResources'
      :key='resource.id'
      :title='resource.title'
      :description='resource.description'
      :link='resource.link'
    ></learning-resource>
  </ul>
</template>
<script>

import LearningResource from '@/components/learning-resources/LearningResource.vue';

export default {
  components: { LearningResource },
  props: ['storedResources']
};
</script>


<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin: auto;
  max-width: 40rem;
}
</style>
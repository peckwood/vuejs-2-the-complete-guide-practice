<template>
  <div>
    <TheHeader></TheHeader>
    <button @click="setActiveComponent('active-goals')">Active Goals</button>
    <button @click="setActiveComponent('manage-goals')">Manage Goals</button>
    <keep-alive>
      <component :is="activeComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import ActiveGoals from "@/components/ActiveGoals.vue";
import ManageGoals from "@/components/ManageGoals.vue";

export default {
  components: {
    // TheHeader is shown white because it doesn't have `export default`
    TheHeader,
    ActiveGoals,
    ManageGoals
  },
  data() {
    return {
      activeComponent: undefined
    };
  },
  methods: {
    setActiveComponent(comp){
      this.activeComponent = comp;
    }
  }
};
</script>

<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>

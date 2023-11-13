<template>
<BaseCard>
  <template v-slot:header>
    <h3>{{ fullName }}</h3>
    <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
  </template>
  <template v-slot:default>
    <p>{{ infoText }}</p>
  </template>
</BaseCard>
</template>

<script>
export default {
  props: ['fullName', 'infoText', 'role'],
};
</script>

<style scoped>
div {
  background-color: pink;
}

h3 {
  background-color: green;
}

</style>

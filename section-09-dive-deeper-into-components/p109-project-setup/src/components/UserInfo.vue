<template>
  <BaseCard>
    <div id="userinfo">
      <h3>{{ fullName }}</h3>
      <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
    </div>
    <p>{{ infoText }}</p>
  </BaseCard>
</template>

<script>
export default {
  props: ['fullName', 'infoText', 'role'],
};
</script>

<style scoped>

div#userinfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<template>
  <div>
    <header>
      <slot name="header"
            v-if="$slots.header"
            :title='myTitle'
      >
        Default Header
      </slot>
    </header>
    <slot
      :description='myDescription'
      :link='link'
    ></slot>
  </div>
</template>
<script>
// checkpoint
export default {
  props: ['myTitle', 'myDescription', 'link'],
  mounted() {
  }
}
</script>


<style scoped>
div {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>

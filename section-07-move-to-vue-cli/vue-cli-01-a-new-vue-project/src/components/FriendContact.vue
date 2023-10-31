<template>
  <h2>{{friend.name}}</h2>
  <button @click="toggleDetails">{{detailsAreVisible ? 'Hide' : 'Show'}} Details</button>
  <ul v-if="detailsAreVisible">
    <li><strong>Phone:</strong> {{friend.phone}}</li>
    <li><strong>Email:</strong> {{friend.email}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    friend: {
      required: false,
      type: Object
    }
  },
  data() {
    return {
      detailsAreVisible: true,
    }
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    }
  }
};

</script>
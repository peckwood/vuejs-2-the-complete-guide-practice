<template>
  <section>FILTER</section>
  <div class="controls">
    <button>refresh</button>
    <router-link to="/register">Register as a coach</router-link>
  </div>
  <section>
    <ul v-if="hasCoaches">
      <li v-for="coach in filteredCoaches" :key="coach.id">
        <coach-item
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
        ></coach-item>
      </li>

    </ul>
    <h3 v-else>No coaches found</h3>
  </section>
</template>

<script>
import CoachItem from "@/pages/coaches/CoachItem.vue";

export default {
  components: {CoachItem},
  computed: {
    filteredCoaches() {
      //namespace name / getter name
      return this.$store.getters['coaches/coaches']
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']
    }
  }
}
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
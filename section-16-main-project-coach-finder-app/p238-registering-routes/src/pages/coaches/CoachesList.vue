<template>
  <section>FILTER</section>
  <base-card>
    <div class="controls">
      <base-button mode="outline">Refresh</base-button>
      <base-button link="true" to="/register">Register as a coach</base-button>
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
  </base-card>
</template>

<script>
import CoachItem from "@/pages/coaches/CoachItem.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: {BaseButton, BaseCard, CoachItem},
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
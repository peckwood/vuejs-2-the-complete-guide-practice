<template>
  <section>
    <coach-filter @change-filter="onFilterChange">

    </coach-filter>
  </section>
  <base-card>
    <div class="controls">
      <base-button mode="outline">Refresh</base-button>
      <base-button
          :link="true"
          to="/register"
          v-if="canRegister"
      >
        Register as a coach
      </base-button>
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
import CoachFilter from "@/pages/coaches/CoachFilter.vue";

export default {
  components: {CoachFilter, BaseButton, BaseCard, CoachItem},
  data() {
    return {
      filters:{
        frontend: true,
        backend: true,
        career: true,
      }
    }
  },
  computed: {
    filteredCoaches() {
      //namespace name / getter name
      let filteredCoaches = this.$store.getters['coaches/coaches']
          .filter(coach => {
            return coach.areas.some(area => {
              return this.filters[area] != null;
            });
          });
      return filteredCoaches
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']
    },
    canRegister(){
      const isCoach = this.$store.getters['coaches/isCoach'];
      return !isCoach;
    }
  },
  methods: {
      onFilterChange(newFilters) {
        this.filters = newFilters;
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
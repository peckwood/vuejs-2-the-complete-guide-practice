<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click='loadData'>Load Submitted Experiences</base-button>
      </div>
      <p v-if='isLoading'>Loading...</p>
      <ul v-else-if='!isLoading && results && results.length > 0'>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
      <p v-else>You dont have any submitted experiences</p>
    </base-card>
  </section>
</template>

<script>
import axios from 'axios';
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: [],
      isLoading: false
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const url = 'http://localhost:8081/springbootapp/get-all-survey';

      this.isLoading = true;
      fetch(url).then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
        this.isLoading = false;
        this.results = data;
      });

/*      axios.get(url).then(res => {
        this.results = res.data;
      });*/
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
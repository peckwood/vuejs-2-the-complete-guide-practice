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
      <p v-else-if='!isLoading && error'>{{ error }}</p>
      <p v-else-if='!isLoading && (!results || results.length === 0)'>You dont have any submitted experiences</p>
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
      isLoading: false,
      error: null
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.error = null;
      // change the port to something new, like 8082, to trigger catch, just change url at the end wont trigger catch
      // http://localhost:8082/springbootapp/get-all-survey-404 wont trigger catch
      const url = 'http://localhost:8081/springbootapp/get-all-survey';

      this.isLoading = true;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          this.isLoading = false;
          this.results = data;
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
          this.error = 'Failed to fetch data, please try again later';
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
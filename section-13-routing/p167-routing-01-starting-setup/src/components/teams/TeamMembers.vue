<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in selectedMembers"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to='/teams/t2'>Go to team t2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem
  },
  inject: ['teams', 'users'],
  props: ['teamId'],
  created() {
    console.log('created with teamId', this.teamId);
    this.loadTeamMembers(this.teamId);
    console.log('this.$route.query: ', this.$route.query);
    console.log('this.$route.query.sort: ', this.$route.query.sort);
  },
  watch: {
    'teamId'(teamId) {
      console.log('prop teamId changed to', this.teamId);
      this.loadTeamMembers(teamId);
    }
  },
  beforeRouteUpdate(to, from, next){
    console.log('TeamMembers Cmp beforeRouteUpdate')
    console.log(to, from);
    // this.loadTeamMembers(to.params.teamId);
    next();
  },
  methods: {
    loadTeamMembers(teamIdProp){
      const teamId = teamIdProp;
      const selectedTeam = this.teams.find(team => team.id === teamId);
      this.teamName = selectedTeam.name;
      const members = selectedTeam.members;
      this.selectedMembers = [];
      members.forEach(memberId => {
        this.users.filter(u => u.id === memberId).forEach(m => this.selectedMembers.push(m));
      })
      console.log('selectedMembers', this.selectedMembers)
    }
  },
  data() {
    return {
      teamName: '',
      selectedMembers: [],
    };
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
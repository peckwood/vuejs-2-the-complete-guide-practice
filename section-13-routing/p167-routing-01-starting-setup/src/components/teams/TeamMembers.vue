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
    <router-link to='/teams/t2'>Go to team t2 (nothing happens)</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem
  },
  inject: ['teams', 'users'],
  watch: {
    '$route'(newRoute){
      this.loadTeamMembers(newRoute);
    }
  },
  created() {
    this.loadTeamMembers(this.$route);
  },
  methods: {
    loadTeamMembers(route){
      console.log('this.$route', route); // /teams/t1
      console.log('this.$route.path', route.path); // /teams/t1
      console.log('newRoute', route); // /teams/t1
      const teamId = route.params.teamId;
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
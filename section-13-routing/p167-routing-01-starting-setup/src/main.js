import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from '@/components/teams/TeamsList.vue';
import UsersList from '@/components/users/UsersList.vue';
import TeamMembers from '@/components/teams/TeamMembers.vue';
import notFound from '@/components/nav/NotFound.vue';
import TeamsFooter from '@/components/teams/TeamsFooter.vue';
import UsersFooter from '@/components/users/UsersFooter.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams'
      , components: {
        default: TeamsList,
        footer: TeamsFooter
      }
      , children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers, props: true } // our-domain.com/teams => TeamsList
      ]
    }, // our-domain.com/teams => TeamsList
    {
      path: '/users', components: {
        default: UsersList,
        footer: UsersFooter
      }
    }, // our-domain.com/users => UsersList
    // new must be above :teamId, or it will be recognized as an id
    // {path: '/teams/new', component: TeamsList}, // our-domain.com/teams => TeamsList

    { path: '/:notFound(.*)', component: notFound }
  ]
});

const app = createApp(App);

// use() connects our Vue app with a third party package
app.use(router);

app.mount('#app');

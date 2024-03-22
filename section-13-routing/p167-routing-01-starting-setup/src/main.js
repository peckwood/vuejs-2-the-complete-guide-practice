import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import App from './App.vue';
import TeamsList from '@/components/teams/TeamsList.vue';
import UsersList from '@/components/users/UsersList.vue';
import teamMembers from '@/components/teams/TeamMembers.vue';
import notFound from '@/components/nav/NotFound.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      path: '/teams', component: TeamsList, children: [
        { path: ':teamId', component: teamMembers, props: true } // our-domain.com/teams => TeamsList
      ]
    }, // our-domain.com/teams => TeamsList
    { path: '/users', component: UsersList }, // our-domain.com/users => UsersList
    // new must be above :teamId, or it will be recognized as an id
    // {path: '/teams/new', component: TeamsList}, // our-domain.com/teams => TeamsList

    { path: '/:notFound(.*)', component: notFound }
  ]
});

const app = createApp(App)

// use() connects our Vue app with a third party package
app.use(router);

app.mount('#app');

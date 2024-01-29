import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import App from './App.vue';
import TeamsList from '@/components/teams/TeamsList.vue';
import UsersList from '@/components/users/UsersList.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/teams', component: TeamsList}, // our-domain.com/teams => TeamsList
    {path: '/users', component: UsersList} // our-domain.com/users => UsersList
  ]
});

const app = createApp(App)

// use() connects our Vue app with a third party package
app.use(router);

app.mount('#app');
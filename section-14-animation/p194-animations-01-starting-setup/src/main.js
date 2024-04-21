import { createApp } from 'vue';

import App from './App.vue';
import BaseModal from './components/BaseModal.vue';

const app = createApp(App);

app.component('base-modal', BaseModal);

import AllUsers from '@/pages/AllUsers.vue';
import CourseGoals from '@/pages/CourseGoals.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
history: createWebHistory(),
  routes:[
    {
      path: '/', redirect: '/all-users'
    },
    {
      path: '/all-users',component: AllUsers
    },
    {
      path: '/course-goals',component: CourseGoals
    }
  ],

});
app.use(router);
router.isReady().then( function() {
  app.mount('#app');
});

import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from '@/pages/TeamsList.vue';
import UsersList from '@/pages/UsersList.vue';
import notFound from '@/pages/NotFound.vue';
import TeamsFooter from '@/pages/TeamsFooter.vue';
import UsersFooter from '@/pages/UsersFooter.vue';
import TeamMembers from '@/components/teams/TeamMembers.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      meta: {
        needsAuth: true
      }
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
      },
      beforeEnter(to, from, next) {
        console.log('users beforeEnter');
        console.log('to', to);
        console.log('from', from);
        next();
      }
    }, // our-domain.com/users => UsersList
    // new must be above :teamId, or it will be recognized as an id
    // {path: '/teams/new', component: TeamsList}, // our-domain.com/teams => TeamsList

    { path: '/:notFound(.*)', component: notFound }
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    // console.log('to', to, 'from', from, 'savedPosition', savedPosition);
    if(savedPosition){
      return savedPosition;
    }else {
      return {
        left: 0,
        top: 0
      }
    }
  }
});


router.beforeEach(function(to, from, next) {
  console.log('global beforeEach')
  console.log('to:', to);
  console.log('from:', from);
  //allow navigation
  next();
  console.log('to.meta.needAuth', to.meta.needsAuth);

  // allow
  // next(true);

  // cancel
  // next(false);

  //if you are navigating to 'team-members' page
  // , you will proceed. If you are going anywhere else
  // , you will navigate to 'team-members' page with t2 as teamId
  /*    if (to.name === 'team-members') {
        next();
      }else{
        next({
          name: 'team-members',
          params: {teamId: 't2'}
        })
      }*/

  // pass string
  /*    if (to.path !== '/teams') {
        next('/teams');
      }else{
        next();
      }*/
});

router.afterEach((to, from) => {
  console.log('global afterEach');
  console.log('to', to);
  console.log('from', from);
});

export default router;
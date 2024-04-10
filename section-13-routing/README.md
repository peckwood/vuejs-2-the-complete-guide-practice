# Section 13: Routing: Building "Multi-Page" Single Page Applications



### 166 module introduction

we will learn

- what and why?
- setting up the router and routes
- navigating and route config

### 167 what and why?

With Vue we build JavaScript driven client side web applications. When the user sees is **entirely** controlled by JavaScript.

We are also basically building a single page application.

This approach has one problem: All pages share the same url, we cannot share any else than the starting page of the application.

### 168 routing setup

1. shutdown running application

2. `npm install --save vue-router@next`

3. in main.js

   ```
   import { createApp } from 'vue';
   import {createRouter, createWebHistory} from 'vue-router';
   
   import App from './App.vue';
   const router = createRouter({
     history: createWebHistory(),
     routes: []
   });
   
   const app = createApp(App)
   
   app.mount('#app');
   ```

   

### 169. Registering & Rendering Routes

3 Steps

1. config
2. connect config with app
3. set where the component is rendered with `<router-view>`

#### Set up routes

```
import TeamsList from '@/components/teams/TeamsList.vue';

  routes: [
    {path: '/teams', component: TeamsList}, // our-domain.com/teams => TeamsList
  ]
  
  app.use(router);
```

#### main.js after:

```js
import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import App from './App.vue';
// 需要在这里导入可能加载的组件
import TeamsList from '@/components/teams/TeamsList.vue';
import UsersList from '@/components/users/UsersList.vue';
const router = createRouter({
    //使用默认历史
  history: createWebHistory(),
    //配置路由
  routes: [
    {path: '/teams', component: TeamsList}, // our-domain.com/teams => component TeamsList
    {path: '/users', component: UsersList} // our-domain.com/users => UsersList
  ]
});

const app = createApp(App)

//使用第三方包
app.use(router);

app.mount('#app');
```

#### App.vue

`<router-view>`取代`<component>`, 设置router展示位置, 使用路由的方式加载组件.

使用路由的方式加载组件, 不再需要在这里注册组件

If you load a component through routing, you dont need to register it as a global or local component.

`<router-view>`是vuex专有组件

```
<!--    <component :is="activePage"></component>-->
<router-view></router-view>
```

#### 启动

1. 重新加载
2. http://localhost:8080/的<main>里面是空白, 因为没有路由配置
3. http://localhost:8080/teams展示teams组件
4. http://localhost:8080/users展示users组件

But our navigation is not working anymore, we are going to navigate with route next.

### 170 Navigating with router-link

use `<router-link>` to 

- it is a anchor tag under the hood,
- preserve the state

we need to change the styles for the button to `<a>` since its an anchor under the hood

### 171 Styling Active Links

the active router-link will have a `router-link-active` class on it. You can style this class to style the active link.

```
a.router-link-active
{
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
```

`router-link-exact-active` will only apply to the navigation item that's **fully matched by the current path**

`router-link-active` will apply to any navigation item which contain a part of the currently active route.

you can override the default classes here:

```
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/teams', component: TeamsList}, // our-domain.com/teams => TeamsList
    {path: '/users', component: UsersList} // our-domain.com/users => UsersList
  ],
  linkActiveClass: 'customActive',
  linkExactActiveClass: 'customExactActive'
});
```

### 172 programmatic navigation

```
this.$router.push('/teams')
```

### 173 Passing Data with Route Params (Dynamic Segments )

At main.js:

```
{path: '/teams/:teamId', component: teamMembers}
```

teamId is the name of your parameter, it can be anything. teamMembers is the component

To get the value of teamId at TeamMmembers component: 

```
const teamId = this.$route.params.teamId;
```

#### the order of routes matters:

```
  routes: [
    {path: '/teams', component: TeamsList}, // our-domain.com/teams => TeamsList
    {path: '/users', component: UsersList}, // our-domain.com/users => UsersList
    // new must be above :teamId, or it will be recognized as an id
    // {path: '/teams/new', component: TeamsList}, // our-domain.com/teams => TeamsList
    {path: '/teams/:teamId', component: teamMembers}, // our-domain.com/teams => TeamsList
  ]
```

### 174 navigation and dynamic paths

```
<router-link :to="teamMembersLink">View Members</router-link>
```

```
  computed:{
    teamMembersLink() {
      return 'teams/' + this.teamId;
    }
  }
```

### 176 Updating Params Data with Watchers

#### behavior

When you click on `Go to team t2`, nothing happens

#### reason

when you are on a component, and you click on a <router-link> that points to the same component. nothing happens because vue router cache components instead of destroy and rebuild them. caching is more efficient

#### solution

however, we need to see a different page when the parameters change. we can solve this with a watcher. because when the parameter change, `this.$route` change since it holds the latest parameter, and you can add a watcher on it to trigger an reload of data

```
  watch: {
    '$route'(newRoute){
      this.loadTeamMembers(newRoute);
    }
  },
```

### 177 Passing Params as Props

set props to true will allow the dynamic param also sent as prop

```
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/teams/:teamId', component: teamMembers, props: true}, // our-domain.com/teams => TeamsList
  ]
});
```

Component TeamMembers will able to receive prop `teamId`

### 178 Redirecting & "Catch All" Routes

If you want to access 'teams' when you visit '/', you can:

#### redirect

you can redirect '/' to '/teams'

```
  routes: [
    {path: '/', redirect: '/teams'},
  ]
```

#### alias

you can also make '/teams' an alias of '/'

```
 {path: '/teams', component: TeamsList, alias: '/'}
```

the difference is, redirect will make the url change to 'teams', but alias will keep the url as '/'

#### catch all

```
{path: '/:notFound(.*)', component: notFound}
```

1. it's a dynamic segment
2. `.*` is a regular input, which means any character combination
3. it should come last, otherwise it would also overwrite other routes

### 179 nested routes

#### why you need?

You dont want to view your team members on a separate page, you want to view it inside /teams page. you can achieve this with nested routes.

#### how to add?

All the routes of the routes array

```
  routes: [
    {path: '/', redirect: '/teams'},
    {path: '/teams', component: TeamsList},
	...
  ]
```

are on the same level, they are root routs, they are siblings to each other. the <router-view> component in App.vue is responsible for all the root routes.

To set up a nested route, you need to add it as the children

```
  routes: [
    { path: '/', redirect: '/teams' }, 
    {
      path: '/teams', component: TeamsList, children: [ // /teams
        { path: ':teamId', component: teamMembers, props: true } // /teams/t1
      ]
    },
    ...
  ]
```

#### not full segments

Note that I removed the '/teams' part, as you just need to segment **after** parent segment.

#### add corresponding `<router-view>`

When you click a team, nothing happens. The reason is, since it is not a root route, it cannot be rendered into the `<router-view>`. Instead you need to a second `<router-view>`in the component(TeamList) where this route is defined as a child component.

```
<template>
  <router-view></router-view>
  <ul>
    <teams-item
      v-for="team in teams"
      :key="team.id"
      :name="team.name"
      :team-id='team.id'
      :member-count="team.members.length"
    >
    </teams-item>
  </ul>
</template>
```

#### parent is active if child is active

when you didnt use nested routes, and you go to a team member, you notice the teams link is not highlighted. visit `teams/t1` will not make `teams` active (CSS style)

but in nested route, visit `teams/t1` **does** make `teams` active (CSS style)

However, `router-link-exact-active` will not be added to the generated <a> element. because of `exact` 

### 180 More Fun with Named Routes & Location Objects

In bigger vue applications, if you have lots of nested routes, constructing links like recurring doing it like this

```
 <router-link :to="teamMembersLink">View Members</router-link>
```

```
  computed:{
    teamMembersLink() {
      return '/teams/' + this.teamId;
    }
  }
```

can be cumbersome

2 features for fixing this

1. ` <router-link>`'s `to` prop can take more than string, it also takes location objects

   ```
   <router-link :to="teamMembersLink">View Members</router-link>
   ```

   ```
       teamMembersLink() {
         // return '/teams/' + this.teamId;
         return {
           name: 'team-members',
           params: {
             teamId: this.teamId
           }
         }
       }
   ```

   

2. we can assign names to routes

   ```
       {
         name: 'teams',
         path: '/teams', component: TeamsList, children: [
           { name: 'team-members', path: ':teamId', component: teamMembers, props: true } // our-domain.com/teams => TeamsList
         ]
       },
   ```

#### advantages:

1. readable and maintainable
2. you can change path of routes without updating paths in components that use these routes

#### navigating programmatically

you can use the location object, as well

```
this.$router.push({
        name: 'team-members',
        params: {
          teamId: this.teamId
        }
      });
```

### 181 Using query parameters

add query parameter `sort` in `<team-item>`

```
    teamMembersLink() {
      // return '/teams/' + this.teamId;
      return {
        name: 'team-members
        query: { sort: 'asc' }
      };
    }
```

access query parameter in component `<team-members>`

```
  created() {
    console.log('this.$route.query.sort: ', this.$route.query.sort)
  },
```

#### Note: 

query parameters are not provided as props, you can only access query parameter via `this.$route`

### 182  Rendering Multiple Routes with Named Router Views

We already have multiple router views in this app, one in App.vue, and one in TeamsList.vue. but they are not on the same level. But you can have multiple router-views on the same level.

If you define 2 router views at the same level, every page loads twice

But with multiple router views on the same level, You can load multiple components per routes, and then sent them to different router views. 

You need to give router views **names**, just like **slots**. And just like slots, you can have 1 unnamed router view, which will be the default router view

```
  <footer>
    <router-view name='footer'></router-view>
  </footer>
```

in route config, You need to use **components** instead of **component** to support more than 1 component:

```
    {
      path: '/users', components: {
        default: UsersList,
        footer: UsersFooter
      }
    },
```

routes that still using **component** will go into the default (unamed) router view.

So named router views can be helpful to allow you to construct more complex user interfaces where you wanna load **more than one component for a given path.**

### 184 Controlling Scroll Behavior

#### needs:

scrollBehavior is a method that get called whenever your page changes.

it takes 3 parameters automatically: to, from and savedPosition

```
  scrollBehavior(to, from, savedPosition) {
    console.log('to', to, 'from', from, 'savedPosition', savedPosition);
  }
```

to and from are route objects, which is the same as what you get from `this.$route`

savedPosition is a object that has left and top

```
{
	left: 0,
	top: 100
}
```

the saved button is only set this way: 

1. you are at a position on page1
2. you jump to page2
3. you hit back button to go back to page1
4. savedPosition shows your position when you were at page1 at step 1

to always jump to top when you change page:

```
  scrollBehavior(to, from, savedPosition) {
    return {
      left: 0,
      top: 0
    }
  }
```

to go back to saved position if available:

```
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition){
      return savedPosition;
    }else {
      return {
        left: 0,
        top: 0
      }
    }
  }
```

### 185 Introducing Navigation Guards

guards are methods that called automatically by vue router when a navigation action started

beforeEach is called before each navigation action

```
router.beforeEach(function(to, from, next) {
  console.log('to:', to);
  console.log('from:', from);
})
```

you can use next to control the navigation:

#### pass true or false

to allow the navigation

```
next() or next(true)
```

to cancel the navigation

```
next(false);
```

#### pass string

```
    if (to.path !== '/teams') {
      next('/teams');
    }else{
      next();
    }
```



#### pass a location object

the following code will:

if you are navigating to 'team-members' page, you will proceed. If you are going anywhere else, you will navigate to 'team-members' page with t2 as teamId.

```
    if (to.name === 'team-members') {
      next();
    }else{
      next({
        name: 'team-members',
        params: {teamId: 't2'}
      })
    }
```

#### avoid infinite loop

just `next('/teams');` alone will not work:

chatgpt:

In your router's `beforeEach` navigation guard, you are using `next('/teams')` to redirect to the '/teams' route for all navigation. However, this approach might cause an infinite loop because every time you try to navigate to any route, it will redirect you back to '/teams', triggering the navigation guard again.

To fix this issue, you should add a condition to check if you are already on the '/teams' route before redirecting. Here's an updated version of your `beforeEach` guard:

```
router.beforeEach(function(to, from, next) {
  console.log('to:', to);
  console.log('from:', from);

  if (to.path !== '/teams') {
    next('/teams');
  } else {
    next();
  }
});
```

With this modification, the `next('/teams')` redirection will only occur if you are not already on the '/teams' route, preventing the infinite loop.

Play

### 186 Diving Deeper Into Navigation Guards

#### beforeEnter

`beforeEach` is a global guard, it runs on every navigation action, no matter from which route to which route.

you can add a guard on the route level:

```
    {
      path: '/users', components: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next) {
        next();
      }
    }
```

#### beforeRouteEnter 

you can alos add a navigation inside component

beforeRouteEnter is trigged on entering

```
  beforeRouteEnter(to, from, next) {
    next();
  }
```

navigation guard execution order: 

1. global
2. route config level
3. component level
4. beforeRouteEnter is before any lifecycle hooks, since it decides if the navigation will allow or cancel

#### beforeRouteUpdate

beforeRouteUpdate is used inside components that are resued, when we switch teams. like from `http://localhost:8080/teams/t1` to `http://localhost:8080/teams/t2`

You can use beforeRouteUpdate to replace watching the teamId prop

```
  created() {
    console.log('created with teamId', this.teamId);
    // this.loadTeamMembers(this.teamId);
    console.log('this.$route.query: ', this.$route.query);
    console.log('this.$route.query.sort: ', this.$route.query.sort);
  },
  watch: {
    'teamId'(teamId) {
      console.log('prop teamId changed to', this.teamId);
      this.loadTeamMembers(teamId);
    }
  },
```

can be replace with:

```
  beforeRouteUpdate(to, from, next){
    console.log('TeamMembers Cmp beforeRouteUpdate')
    console.log(to, from);
    this.loadTeamMembers(to.params.teamId);
    next();
  },
```

but it will make it less flexible, since you can only use beforeRouteUpdate when you load component with routing, but you can use created and watch with or without.

### 187 The Global "afterEach" Guard

afterEach guard doesnt have `next` param, it cannot allow or cancel a navigation. it could be useful for sending analytics data.

```
router.afterEach((to, from) => {
  console.log('global afterEach');
  console.log('to', to);
  console.log('from', from);
});
```

### 188 Beyond Entering: Route Leave Guards

beforeRouteLeave is a guard inside a component.

It is trigged **before** any global or component guards, and allow you to choose if you want to confirm the navigation or not. It is useful in situation when you have a form on this page, there are unsaved data inside the form. and you accidently clicked a link to another page and may lose you unsaved changes.

```
  beforeRouteLeave(to, from, next){
    console.log('UserList Cmp beforeRouteLeave');
    console.log('to', to);
    console.log('from', from);
    const confirmLeave = confirm('Are you sure you want to leave?')
    next(confirmLeave);
  }
```

note that afterEach is triggered even if you cancel

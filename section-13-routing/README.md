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

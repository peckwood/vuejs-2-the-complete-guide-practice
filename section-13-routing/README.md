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

   
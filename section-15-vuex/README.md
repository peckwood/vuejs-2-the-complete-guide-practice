# Section 15: Vuex


### 214 What & Why?

Vuex is a library for managing **global** state

vuex is to overcome:



| problems                                    |                                                              |                                                 |
| ------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| fat components                              | unpredictable                                                | error-prone                                     |
| components contains too much data and logic | its not always obvious where data(state) gets changed in which way | accidental or missed state updates are possible |
| with vuex                                   |                                                              |                                                 |
| outsourced state management                 | predictable statement / flow                                 | clearly defined data flow: less errors          |

### 215 Creating & Using a Store

1. download the starting setup project, I have downloaded it( folder demo-code-vuex-01-starting-setup)

2. `npm install`

3. install vuex with `npm install --save vuex`

4. run project with `npm run serve`

5. create and use store in main.js

   ```
   import { createApp } from 'vue';
   import {createStore} from 'vuex';
   
   import App from './App.vue';
   
   const store = createStore({
     state(){
       return {
         counter: 0
       }
     }
   });
   
   const app = createApp(App);
   
   app.use(store);
   
   app.mount('#app');
   ```

6. access the store in App.vue

   ```
   <h3>{{ $store.state.counter}}</h3>
   ```

7. 

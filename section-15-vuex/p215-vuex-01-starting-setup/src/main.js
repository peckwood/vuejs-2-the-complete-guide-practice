import { createApp } from 'vue';
import {createStore} from 'vuex';

import App from './App.vue';

const counterModule = {
  namespaced: true,
  state(){
    return {
      counter: 0
    }
  },
  mutations: {
    increment(state) {
      state.counter = state.counter + 2;
    },
    increase(state, payload) {
      state.counter = state.counter + payload.value;
    },
  },
  actions: {
    increment(context){
      setTimeout(function(){
        context.commit('increment');
      }, 2000);
    },
    increase(context, payload){
      console.log('action context', context);
      setTimeout(function(){
        context.commit('increase', payload);
      }, 2000);
    },
  },
  getters: {
    counter(state) {
      return state.counter;
    },
    finalCounter(state){
      return state.counter * 2;
    },
    normalizedCounter(_, getters){
      const finalCounter = getters.finalCounter;
      if(finalCounter < 0){
        return 0;
      }else if(finalCounter> 100){
        return 100;
      }else{
        return finalCounter;
      }
    },
    testAuth1(state){
      return state.loggedIn;
    },
    testAuth2(_state, _getters, rootState){
      return rootState.loggedIn;
      // return rootGetters.isLoggedIn;
    }
  }
};

const store = createStore({
  modules: {
    // numbers is the namespace key
    numbers: counterModule
  },
  // main state
  state(){
    return {
      loggedIn: false
    }
  },
  mutations: {
    logIn(state) {
      state.loggedIn = true;
    },
    logOut(state) {
      state.loggedIn = false;
    }
  },
  getters: {
    isLoggedIn(state){
      return state.loggedIn;
    },
  },
  actions: {
    logIn(context) {
      setTimeout(function() {
        context.commit('logIn');
      }, 1000);
    },
    logOut(context) {
      setTimeout(function() {
        context.commit('logOut');
      }, 1000);
    }

  }
});

const app = createApp(App);

app.use(store);

app.mount('#app');

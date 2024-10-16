import {createStore} from 'vuex';
import rootMutations from './mutations';
import rootActions from './actions'
import rootGetters from './getters'
import counterModule from './counter/index'


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
  mutations: rootMutations,
  getters: rootGetters,
  actions: rootActions
});

export default store;
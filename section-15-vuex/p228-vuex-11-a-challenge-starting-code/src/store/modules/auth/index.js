
const authModule = {
  namespaced: true,
  state(){
    return {
      isLoggedIn: false,
    }
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
  actions: {
    login(context, payload){
      context.commit('login', payload);
    },
    logout(context, payload){
      context.commit('logout', payload);
    }
  },
  getters: {
    isLoggedIn(state){
      return state.isLoggedIn;
    }
  }
}

export default authModule;
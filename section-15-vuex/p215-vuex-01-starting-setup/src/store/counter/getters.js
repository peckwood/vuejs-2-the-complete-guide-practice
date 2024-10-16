export default {
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
};
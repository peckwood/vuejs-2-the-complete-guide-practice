export default {
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
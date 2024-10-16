export default {
  logIn(state) {
    state.loggedIn = true;
  },
  logOut(state) {
    state.loggedIn = false;
  }
};
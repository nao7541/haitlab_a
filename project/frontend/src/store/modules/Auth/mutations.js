export default {
    setUser(state, payload) {
        state.username = payload.username;
        state.token = payload.token;
        state.isLoggedIn = true;
    },
    clear(state) {
        state.username = '';
        state.token = null;
        state.isLoggedIn = false;
    }
};
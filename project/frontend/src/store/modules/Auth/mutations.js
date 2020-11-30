export default {
    setUser(state, payload) {
        state.userId = payload.userId;
        state.token = payload.token;
        state.isLoggedIn = true;
    },
    clear(state) {
        state.userId = null;
        state.token = null;
        state.isLoggedIn = false;
    }
};
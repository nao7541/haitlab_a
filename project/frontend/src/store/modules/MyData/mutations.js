export default {
    setUserData(state, payload) {
        state.myUserData.userId = payload.userId;
        state.myUserData.username = payload.username;
    },
    setTags(state, payload) {
        state.myTags = payload;
    }
};
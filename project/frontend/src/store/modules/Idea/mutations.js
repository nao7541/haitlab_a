export default {
    setIdeas(state, payload) {
        state.ideas = payload;
    },
    setIdea(state, payload) {
        console.log(state, payload);
    }
};
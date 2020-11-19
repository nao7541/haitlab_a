export default {
    ideas(state) {
        return state.ideas;
    },
    requiredSkills(state) {
        return state.requiredSkills;
    },
    skills(_, _1, _2, rootGetters) {
        return rootGetters.skills;
    },
    comments(state) {
        return state.comments;
    }
};
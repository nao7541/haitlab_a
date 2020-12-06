import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state() {
        return {
            ideas: [],
            idea: null,
            comments: [],
            requiredSkills: [],
        }
    },
    getters,
    mutations,
    actions,
};
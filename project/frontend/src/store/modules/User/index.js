import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state() {
        return {   
            user: {
                user_id: null,
                username: '',
                email: null,
                prof_img: null,
                intro: '',
                univ_name: '',
                major: '',
            },
            skill: {
                skill_id: null,
                user_id: null,
                skill_name: '',
                skill_level: '',
            }
        }
    },
    getters,
    mutations,
    actions,
};
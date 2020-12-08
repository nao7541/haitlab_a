import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state() {
        return {
            userDetail: {
                user_id: null,
                username: '',
                email: null,
                prof_img: null,
                intro: '',
                univ_name: '',
                major: '',
            },
        }
    },
    getters,
    mutations,
    actions,
};
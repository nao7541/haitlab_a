import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state() {
        return {
            myUserData: {
                userId: null,
                username: '',
            },
            myTags: [],
            myEventStocks: [], // 格納するのはEvent Stockモデルのevent
        }
    },
    getters,
    mutations,
    actions,
};
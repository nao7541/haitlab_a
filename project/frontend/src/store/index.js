import Vue from 'vue'
import Vuex from 'vuex'

import IdeaModule from './modules/Idea/index.js';
import UserModule from './modules/User/index.js';
import AuthModule from './modules/Auth/index.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        idea: IdeaModule,
        auth: AuthModule,
        user: UserModule,
    },
    state() {
        return {
            skills: [
                'programmer',
                'engineer',
                'design',
                'business',
                'idea / planning',
            ]
        };
    },
    getters: {
        skills(state) {
            return state.skills;
        }
    }
});

export default store;

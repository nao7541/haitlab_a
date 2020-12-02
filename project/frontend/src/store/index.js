import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule  from './modules/Auth/index.js';
import EventModule from './modules/Event/index.js';
import IdeaModule  from './modules/Idea/index.js';
import UserModule  from './modules/User/index.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth:  AuthModule,
        event: EventModule,
        idea:  IdeaModule,
        user:  UserModule,
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
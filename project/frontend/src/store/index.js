import { createStore } from 'vuex';

import IdeaModule from './modules/Idea/index.js';
import UserModule from './modules/User/index.js';
import AuthModule from './modules/Auth/index.js';

const store = createStore({
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
})

export default store;
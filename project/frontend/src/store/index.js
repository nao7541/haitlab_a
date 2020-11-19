import { createStore } from 'vuex';

import IdeaModule from './modules/Idea/index.js';
import UserModule from './modules/User/index.js';

const store = createStore({
    modules: {
        idea: IdeaModule,
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
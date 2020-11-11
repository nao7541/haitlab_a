import { createStore } from 'vuex';

const authModule = {
    namespaced: true,
    state() {
        return {
            username: '',
            isLoggedIn: false,
        };
    },
    getters: {
        username(state) {
            return state.username;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        }
    },
    mutations: {
        set(state, payload) {
            state.username = payload.user.username;
            state.isLoggedIn = true;
        },
        clear(state) {
            state.username = '';
            state.isLoggedIn = false;
        }
    },
    actions: {
        // login(context, payload) {
            
        // },
        logout(context) {
            localStorage.removeItem('access');
            context.commit('clear');
        },

    }
};

export default createStore({
    modules: {
        auth: authModule
    }
});
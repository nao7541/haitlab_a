import api from '@/services/api.js';

export default {
    auth(context, payload) {
        const url = payload.url;
        const data = payload.data;
        return api.post(url, data)
        .then(response => {
            const key = response.data.key;

            localStorage.setItem('username', payload.data.username);
            localStorage.setItem('token', key);
            context.commit('setUser', {
                username: payload.username,
                token: key,
            });
        }).catch( errorMessage => {
            console.error(errorMessage);
        })
    },
    signup(context, payload) {
        context.dispatch('auth', {
            url: '/registration/',
            data: {
                'username': payload.username,
                'email': payload.email,
                'password1': payload.password1,
                'password2': payload.password2,
            },
        });    
    },
    login(context, payload) {
        context.dispatch('auth', {
            url: '/login/',
            data: {
                'username': payload.username,
                'email': payload.email,
                'password': payload.password,
            },
        });
    },
    autoLogin(context) {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (username && token) {
            context.commit('setUser', {
                username: username,
                token: token
            });
        }
    },
    logout(context) {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        context.commit('clear');
    }
};
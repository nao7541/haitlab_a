import api from '@/services/api.js';
import apiHelper from '../../../services/apiHelper';

export default {
    auth(context, payload) {
        const url = payload.url;
        const data = payload.data;
        let key = null;
        
        apiHelper.authUser(url, data)
        .then( res => {
            // tokenをlocalに保存する
            key = res.key;
            localStorage.setItem('token', key);

            return apiHelper.loadUserDetailByName(payload.data.username)
        }).then( res => {
            const userId = res.user_id;
            localStorage.setItem('userId', userId);
            context.commit('setUser', {
                userId: userId,
                token: key,
            });
        }).catch( err => {
            console.log("error at authUser: ", err);
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
        // TODO 他のstateを余りいじくらない方が良いよね、mutationsで操作すべき
        context.commit('loginSetup', {
            myData: context.rootState.myData,
            myUserId: payload.username,
        });
    },
    autoLogin(context) {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (userId && token) {
            context.commit('setUser', {
                userId: userId,
                token: token
            });
            context.commit('loginSetup', {
                myData: context.rootState.myData,
                myUserId: userId,
            });
        }
    },
    logout(context) {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        context.commit('clear');

        return api.post('/logout/')
        .then(response => {
            const detail = response.data.detail;
            console.log(detail);
        }).catch(errorMessage => {
            console.log(errorMessage);
        });
    },
    twitterSign() {
        const url = "/login/twitter/";
        const access_token = "";
        const token_secret = "";
        const oauthValues = {
            'access_token': access_token,
            'token_secret': token_secret,
        };

        return api.post(url, oauthValues)
        .then( response => {
            if (response.status === 200) {
                const token = response.data.key;
                localStorage.setItem("token", token);
            }
        }).catch( err => {
            console.log(err);
        });
    }
};
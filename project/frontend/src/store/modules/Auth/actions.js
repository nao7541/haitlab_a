import api from '@/services/api.js';

export default {
    auth(context, payload) {
        const url = payload.url;
        const data = payload.data;
        return api.post(url, data)
        .then(response => {
            const key = response.data.key;
            localStorage.setItem('token', key);

            // 登録したユーザー情報をDBより取得
            api.get('/users/')
            .then(response => {
                const users = response.data;
                for (const user of users) {
                    // もしuserを見つけたら、userIdをローカルに保存
                    if (user.username === payload.data.username) {
                        const userId = user.user_id;
                        localStorage.setItem('userId', userId);
                        context.commit('setUser', {
                            userId: userId,
                            token: key,
                        });
                        break;
                    }
                }
            }).catch(errorMsg => {
                console.log(errorMsg)
            });
        }).catch( errorMessage => {
            console.error(errorMessage);
        });
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
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (userId && token) {
            context.commit('setUser', {
                userId: userId,
                token: token
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
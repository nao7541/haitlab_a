import api from '@/services/api.js';

export default {
    loadUserData(context, payload) {
        const url = '/users/' + payload.userId + '/';
        return api.get(url)
        .then(response => {
            // user dataの取得、作成
            const responseData = response.data;
            const userData = {
                user_id: responseData.user_id,
                username: responseData.username,
                email: responseData.email,
                prof_img: responseData.prof_img,
                intro: responseData.intro,
                univ_name: responseData.univ_name,
                major: responseData.major,
            };
    
            // commit
            context.commit('setUser', userData);
        }).catch(errorMsg => {
            console.log(errorMsg);
        });
    },
    updateUserData(_, payload) {
        const url = '/users/' + payload.userId + '/';
        const formData = new FormData();
        formData.append('username', payload.username);
        formData.append('email', payload.email);
        formData.append('prof_img', payload.prof_img);
        formData.append('intro', payload.intro);
        formData.append('univ_name', payload.univ_name);
        formData.append('major', payload.major);
        return api.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
        }).catch(errorMsg => {
            console.log(errorMsg);
        })
    }
};
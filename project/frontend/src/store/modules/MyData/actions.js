import apiHelper from '@/services/apiHelper.js';

export default {
    setUserData(context, payload) {
        apiHelper.loadUserDetailByName(payload.username)
        .then ( res => {
            context.commit('setUserData', {
                userId: res[0].user_id,
                username: res[0].username
            });
            
            // tagsもここでセットする
            context.dispatch('setTags', {
                userId: res.user_id
            });
        }).catch( err => {
            console.log("error to set myinfo detail: ", err);
        });
    },
    setTags(context, payload) {
        apiHelper.loadUserTags(payload.userId)
        .then( res => {
            context.commit('setTags', res);
        }).catch( err => {
            console.log("error to set myinfo tags: ", err);
        });
    }
};
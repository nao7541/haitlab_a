import api from '@/services/api.js';

export default {
    postIdea(context, payload) {
        const url = '/ideas/';
        const formData = new FormData();
        formData.append('user_id', payload.user_id);
        formData.append('title', payload.title);
        formData.append('overview', payload.overview);
        formData.append('background', payload.overview);
        formData.append('passion', payload.passion);
        
        if(payload.idea_image !== null) {
            formData.append('idea_image', payload.idea_image);
        }

        return api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    },
    loadIdeas(context) {
        const url = '/ideas/';
        return api.get(url)
        .then( response => {
            const data = response.data;
            context.commit('setIdeas', data);
        }).catch ( err => {
            console.log(err);
        });
    }
};
import api from '@/services/api.js';

export default {
    loadEvents(context) {
        const url = '/events/';
        return api.get(url)
        .then( response => {
            const responseData = response.data;
            context.commit('setEvents', responseData);
        }).catch( errorMsg => {
            console.log(errorMsg);
        })
    }
};
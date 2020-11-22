import api from '@/services/api.js';

export default {
    signup(_, payload) {
        return api.post('/registration/', {
            'username': payload.username,
            'email': payload.email,
            'password1': payload.password1,
            'password2': payload.password2,
        }).then( response => {
            console.log(response);
        }).catch( errorMessage => {
            console.error('Receive an Error: \n', errorMessage);
        })
    }
};
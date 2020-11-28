import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Token ' + token;
        return config;
    }
    return config;
}, (errorMsg) => {
     return Promise.reject(errorMsg);
})

export default api;
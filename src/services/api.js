import axios from 'axios';

const api = axios.create({
    baseURL:'http://10.214.43.201:3333',
});

export default api;
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.BACKEND_ENDPOINT
});

export default api;
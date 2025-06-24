// digital-wallet-frontend/src/services/api.js

import axios from 'axios';

// Buat instance Axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // URL dasar API backend kita
    headers: {
        'Content-Type': 'application/json' // Default header untuk JSON
    }
});

// Interceptor untuk menambahkan token ke setiap request yang dilindungi
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        if (token) {
            config.headers['x-auth-token'] = token; // Tambahkan token ke header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
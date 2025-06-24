// digital-wallet-frontend/src/services/authService.js

import api from './Api'; // Import instance Axios yang sudah dikonfigurasi

const register = async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Simpan token di localStorage
    }
    return response.data;
};

const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Simpan token di localStorage
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token'); // Hapus token dari localStorage
};

const authService = {
    register,
    login,
    logout
};

export default authService;
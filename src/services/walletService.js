// digital-wallet-frontend/src/services/walletService.js

import api from './Api'; // Import instance Axios yang sudah dikonfigurasi

const getBalance = async () => {
    const response = await api.get('/wallet/balance');
    return response.data;
};

const makeTransaction = async (type, amount, description) => {
    const response = await api.post('/wallet/transaction', { type, amount, description });
    return response.data;
};

const getTransactionHistory = async () => {
    const response = await api.get('/wallet/history');
    return response.data;
};

const walletService = {
    getBalance,
    makeTransaction,
    getTransactionHistory
};

export default walletService;
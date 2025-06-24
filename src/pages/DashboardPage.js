import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import walletService from '../services/walletService';
import authService from '../services/authService';

const DashboardPage = () => {
    // State untuk data dari backend
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // State untuk form transaksi baru
    const [newTransaction, setNewTransaction] = useState({
        type: 'debit', // default tipe transaksi
        amount: '',
        description: '',
    });

    const navigate = useNavigate();

    // Fungsi untuk mengambil data dari backend
    const fetchData = async () => {
        try {
            const balanceData = await walletService.getBalance();
            setBalance(balanceData.balance);

            const historyData = await walletService.getTransactionHistory();
            setTransactions(historyData);
        } catch (error) {
            toast.error('Gagal memuat data dompet.');
        } finally {
            setLoading(false);
        }
    };

    // useEffect akan berjalan satu kali saat komponen pertama kali dimuat
    useEffect(() => {
        fetchData();
    }, []); // Array dependensi kosong berarti hanya berjalan sekali

    // Handler untuk perubahan input form transaksi
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    // Handler untuk submit form transaksi
    const handleTransactionSubmit = async (e) => {
        e.preventDefault();
        // Validasi sederhana
        if (!newTransaction.amount || newTransaction.amount <= 0) {
            toast.warn('Jumlah transaksi harus diisi dan lebih dari nol.');
            return;
        }

        try {
            await walletService.makeTransaction(
                newTransaction.type,
                parseFloat(newTransaction.amount), // Pastikan amount adalah angka
                newTransaction.description
            );
            toast.success('Transaksi berhasil!');
            
            // Setelah transaksi berhasil, ambil data terbaru dari server
            fetchData();

            // Reset form
            setNewTransaction({ type: 'debit', amount: '', description: '' });

        } catch (error) {
            const message = error.response?.data?.msg || 'Transaksi gagal.';
            toast.error(message);
        }
    };

    // Fungsi untuk logout
    const handleLogout = () => {
        authService.logout();
        toast.info('Anda telah logout.');
        navigate('/login');
        window.location.reload();
    };

    if (loading) {
        return <div style={styles.container}><h2>Memuat data...</h2></div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Dashboard</h2>
                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </div>
            
            <div style={styles.balanceCard}>
                <h3>Saldo Anda</h3>
                <p style={styles.balanceAmount}>
                    {balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </p>
            </div>

            <div style={styles.section}>
                <h3>Lakukan Transaksi</h3>
                <form onSubmit={handleTransactionSubmit} style={styles.form}>
                    <select name="type" value={newTransaction.type} onChange={handleInputChange} style={styles.input}>
                        <option value="debit">Kurangi Saldo (Debit)</option>
                        <option value="credit">Tambah Saldo (Credit)</option>
                    </select>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Jumlah"
                        value={newTransaction.amount}
                        onChange={handleInputChange}
                        style={styles.input}
                        min="1"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Deskripsi"
                        value={newTransaction.description}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Kirim Transaksi</button>
                </form>
            </div>

            <div style={styles.section}>
                <h3>Riwayat Transaksi</h3>
                <ul style={styles.transactionList}>
                    {transactions.length === 0 ? (
                        <li style={styles.transactionItem}>Belum ada riwayat transaksi.</li>
                    ) : (
                        transactions.map(tx => (
                            <li key={tx._id} style={styles.transactionItem}>
                                <div style={{flex: 1}}>
                                    <span style={{...styles.transactionType, color: tx.type === 'credit' ? 'green' : 'red'}}>
                                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                                    </span>
                                    <p style={{margin: '5px 0', fontSize: '0.9em', color: '#555'}}>{tx.description}</p>
                                </div>
                                <div style={{textAlign: 'right'}}>
                                    <span style={{fontWeight: 'bold'}}>
                                        {tx.type === 'credit' ? '+' : '-'} {parseFloat(tx.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </span>
                                    <p style={{margin: '5px 0', fontSize: '0.8em', color: '#888'}}>
                                        {new Date(tx.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};


// Styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f7f6',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '50px auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '20px',
    },
    logoutButton: {
        padding: '8px 16px',
        fontSize: '14px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    balanceCard: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        width: '100%',
        textAlign: 'center',
        marginBottom: '30px'
    },
    balanceAmount: {
        fontSize: '2.5em',
        fontWeight: 'bold',
        color: '#007bff'
    },
    section: {
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        marginBottom: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '15px'
    },
    input: {
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px'
    },
    button: {
        padding: '12px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#17a2b8',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    transactionList: {
        listStyleType: 'none',
        padding: 0,
        marginTop: '15px'
    },
    transactionItem: {
        backgroundColor: '#f8f9fa',
        border: '1px solid #eee',
        borderRadius: '5px',
        padding: '10px 15px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.95em'
    },
    transactionType: {
        fontWeight: 'bold',
        minWidth: '70px',
        textAlign: 'left'
    }
};

export default DashboardPage;
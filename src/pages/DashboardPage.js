import React from 'react';

const DashboardPage = () => {
    return (
        <div style={styles.container}>
            <h2>Dashboard Dompet Anda</h2>
            <div style={styles.balanceCard}>
                <h3>Saldo Anda</h3>
                <p style={styles.balanceAmount}>Rp 0,-</p> {/* Nanti akan diisi dari API */}
            </div>

            <div style={styles.section}>
                <h3>Lakukan Transaksi</h3>
                <form style={styles.form}>
                    <select style={styles.input}>
                        <option value="">Pilih Tipe Transaksi</option>
                        <option value="credit">Tambah Saldo (Credit)</option>
                        <option value="debit">Kurangi Saldo (Debit)</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Jumlah"
                        style={styles.input}
                        min="1"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi (Opsional)"
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Kirim Transaksi</button>
                </form>
            </div>

            <div style={styles.section}>
                <h3>Riwayat Transaksi</h3>
                <ul style={styles.transactionList}>
                    {/* Nanti akan diisi dari API */}
                    <li style={styles.transactionItem}>
                        <span style={styles.transactionType}>[Tipe]</span> - Rp [Jumlah] - [Deskripsi] - [Tanggal]
                    </li>
                    {/* Contoh Item */}
                    <li style={styles.transactionItem}>
                        <span style={{...styles.transactionType, color: 'green'}}>Credit</span> - Rp 100.000 - Top Up Awal - 24/06/2025
                    </li>
                    <li style={styles.transactionItem}>
                        <span style={{...styles.transactionType, color: 'red'}}>Debit</span> - Rp 25.000 - Beli Kopi - 24/06/2025
                    </li>
                </ul>
            </div>
        </div>
    );
};

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
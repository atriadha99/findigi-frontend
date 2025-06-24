// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { toast } from 'react-toastify';
import authService from '../services/authService'; // Import authService kita

const RegisterPage = () => {
    // Gunakan satu state object untuk menampung semua data form
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Destructuring formData untuk kemudahan akses
    const { username, email, password } = formData;

    // Fungsi untuk menangani perubahan pada setiap input
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fungsi yang dijalankan saat form disubmit
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Panggil fungsi register dari service
            const data = await authService.register(username, email, password);
            toast.success(data.message || 'Registrasi berhasil! Silakan login.');
            
            // Arahkan ke halaman login setelah sukses
            navigate('/login');

        } catch (error) {
            // Tangkap error dari backend dan tampilkan sebagai notifikasi
            const message = error.response?.data?.msg || 'Registrasi gagal. Coba lagi.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Daftar Akun Baru</h2>
            {/* Hubungkan form dengan fungsi onSubmit */}
            <form onSubmit={onSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username" // 'name' harus cocok dengan key di state formData
                    value={username}
                    onChange={onChange}
                    style={styles.input}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    style={styles.input}
                    minLength="6" // Tambahkan validasi dasar
                    required
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Mendaftar...' : 'Daftar'}
                </button>
            </form>
            <p>Sudah punya akun? <Link to="/login" style={styles.link}>Login di sini</Link></p>
        </div>
    );
};

// Styles (sama seperti sebelumnya, bisa dipindahkan ke file CSS terpisah nanti)
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f7f6',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '50px auto'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        marginTop: '20px'
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
        backgroundColor: '#28a745',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        marginTop: '10px'
    }
};

export default RegisterPage;
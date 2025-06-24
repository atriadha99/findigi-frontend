// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/authService';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Panggil fungsi login dari service
            await authService.login(email, password);
            
            // authService sudah otomatis menyimpan token ke localStorage
            toast.success('Login berhasil!');

            // Arahkan ke halaman dashboard
            navigate('/dashboard');
            
            // Reload halaman untuk memastikan state otentikasi di App.js terupdate
            window.location.reload();

        } catch (error) {
            const message = error.response?.data?.msg || 'Login gagal. Periksa kembali email dan password Anda.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login ke Dompet Digital</h2>
            <form onSubmit={onSubmit} style={styles.form}>
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
                    required
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Memproses...' : 'Login'}
                </button>
            </form>
            <p>Belum punya akun? <Link to="/register" style={styles.link}>Daftar di sini</Link></p>
        </div>
    );
};

// Styles (sama seperti sebelumnya)
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
        backgroundColor: '#007bff',
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

export default LoginPage;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Untuk notifikasi
import 'react-toastify/dist/ReactToastify.css'; // Gaya CSS untuk notifikasi

// Import halaman-halaman yang sudah kita buat
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
    // Fungsi sederhana untuk mengecek apakah pengguna sudah login (nanti akan lebih canggih)
    // Untuk saat ini, kita anggap token tersimpan di localStorage
    const isAuthenticated = () => {
        return localStorage.getItem('token') ? true : false;
    };

    return (
        <Router>
            <div className="App">
                <ToastContainer /> {/* Komponen untuk menampilkan notifikasi */}
                <Routes>
                    {/* Rute untuk halaman login */}
                    <Route path="/login" element={<LoginPage />} />
                    {/* Rute untuk halaman registrasi */}
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Rute yang dilindungi: hanya bisa diakses jika sudah login */}
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated() ? (
                                <DashboardPage />
                            ) : (
                                <Navigate to="/login" replace /> // Redirect ke login jika belum login
                            )
                        }
                    />

                    {/* Rute default atau halaman beranda akan redirect ke login atau dashboard */}
                    <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
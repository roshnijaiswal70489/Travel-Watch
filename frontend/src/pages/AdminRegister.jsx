import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminRegister } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            const response = await adminRegister({ email, password });
            const token = response.data.token;
            if (token) {
                login(token);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark transition-colors duration-300">
            <div className="bg-white dark:bg-card p-8 rounded shadow-md w-full max-w-md border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Admin Register</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-orange-600 transition">
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account? <Link to="/admin/login" className="text-primary hover:underline">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;

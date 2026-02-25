import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <nav className="bg-white dark:bg-nav border-b border-gray-200 dark:border-gray-800 py-4 px-6 fixed w-full top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/travel-watch-logo.svg"
                        alt="Travel Watch Logo"
                        className="h-9 w-9 rounded-xl object-cover"
                    />
                    <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Travel Watch</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition font-medium">Hotels</Link>

                    <Link to="/search" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition font-medium">Search</Link>
                    {isLoggedIn && (
                        <Link to="/admin/dashboard" className="text-primary font-bold hover:text-orange-600 transition">Dashboard</Link>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {isLoggedIn && (
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 mr-2"
                        >
                            Logout
                        </button>
                    )}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        ) : (
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                        )}
                    </button>
                    <Link to="/scan" className="bg-primary hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition text-sm shadow-md shadow-orange-500/20">
                        Scan QR
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

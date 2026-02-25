import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HotelDetails from './pages/HotelDetails';
import Search from './pages/Search';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';
import ScanQR from './pages/ScanQR';
import './App.css';

import { LocationProvider } from './context/LocationContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LocationProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-dark dark:text-white transition-colors duration-300">
              <Navbar />
              <div className="pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/hotel/:id" element={<HotelDetails />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/scan" element={<ScanQR />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/register" element={<AdminRegister />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </LocationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

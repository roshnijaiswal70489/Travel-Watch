import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddHotelForm from '../components/admin/AddHotelForm';
import AddChannelForm from '../components/admin/AddChannelForm';
import AddStreamingServiceForm from '../components/admin/AddStreamingForm';
import HotelQRModal from '../components/admin/HotelQRModal';
import { getHotels } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('hotel');
    const [hotels, setHotels] = useState([]);
    const [qrHotelId, setQrHotelId] = useState(null);
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchHotels();
        }
    }, [token, navigate]);

    const fetchHotels = async () => {
        try {
            const res = await getHotels();
            setHotels(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold">Admin Panel</div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('hotel')}
                        className={`w-full text-left px-4 py-2 rounded ${activeTab === 'hotel' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        Manage Hotels
                    </button>
                    <button
                        onClick={() => setActiveTab('channel')}
                        className={`w-full text-left px-4 py-2 rounded ${activeTab === 'channel' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        Manage Channels
                    </button>
                    <button
                        onClick={() => setActiveTab('streaming')}
                        className={`w-full text-left px-4 py-2 rounded ${activeTab === 'streaming' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        Streaming Services
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={handleLogout} className="w-full bg-red-600 px-4 py-2 rounded hover:bg-red-700">Logout</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    {activeTab === 'hotel' && 'Manage Hotels'}
                    {activeTab === 'channel' && 'Manage Channels'}
                    {activeTab === 'streaming' && 'Manage Streaming Services'}
                </h1>

                <div className="bg-white rounded-lg shadow p-6">
                    {activeTab === 'hotel' && (
                        <div>
                            <AddHotelForm token={token} onSuccess={fetchHotels} />

                            <hr className="my-8" />

                            <h2 className="text-xl font-bold mb-4">Existing Hotels</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b text-left">Name</th>
                                            <th className="py-2 px-4 border-b text-left">Location</th>
                                            <th className="py-2 px-4 border-b text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hotels.map(hotel => (
                                            <tr key={hotel._id}>
                                                <td className="py-2 px-4 border-b">{hotel.name}</td>
                                                <td className="py-2 px-4 border-b">{hotel.location}</td>
                                                <td className="py-2 px-4 border-b">
                                                    <button
                                                        onClick={() => setQrHotelId(hotel._id)}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        View QR
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {hotels.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="py-4 text-center text-gray-500">No hotels found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === 'channel' && <AddChannelForm token={token} />}
                    {activeTab === 'streaming' && <AddStreamingServiceForm token={token} />}
                </div>

                {qrHotelId && (
                    <HotelQRModal
                        hotelId={qrHotelId}
                        onClose={() => setQrHotelId(null)}
                    />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;

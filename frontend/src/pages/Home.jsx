import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHotels } from '../services/api';
import { useLocation } from '../context/LocationContext';

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const { country, detectBrowserLocation } = useLocation();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await getHotels();
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
                setHotels([
                    { _id: '1', name: 'Taj Mahal Palace', location: 'Mumbai, India' },
                    { _id: '2', name: 'The Oberoi', location: 'New Delhi, India' },
                    { _id: '3', name: 'Rambagh Palace', location: 'Jaipur, India' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    if (loading) return <div className="p-12 text-center text-gray-400">Loading experience...</div>;

    return (
        <div className="pb-20 bg-gray-50 dark:bg-dark transition-colors duration-300">
            {/* Hero Section */}
            <header className="relative py-20 px-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 dark:from-primary/10 to-transparent pointer-events-none" />

                <div className="inline-flex items-center gap-2 bg-white dark:bg-card border border-gray-200 dark:border-gray-800 rounded-full px-4 py-1.5 mb-8 text-sm text-gray-600 dark:text-gray-300 shadow-sm">
                    <span className="text-primary font-medium">Your Travel Entertainment Guide</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    What Can You Watch <span className="text-primary">Right Now?</span>
                </h1>

                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                    Discover hotel TV channels, check streaming availability, and find
                    what's playing live — all in one place.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div
                        onClick={detectBrowserLocation}
                        className="bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center text-gray-700 dark:text-gray-300 gap-2 min-w-[200px] shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        title="Click to detect accurate location"
                    >
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{country || 'Detecting Location...'}</span>
                    </div>
                    <Link to="/search" className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-orange-500/20">
                        Explore Now
                    </Link>
                </div>

                <div className="flex justify-center gap-8 mt-12 text-sm text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full"></div>Hotel TV Guide</span>
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full"></div>Streaming Check</span>
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full"></div>Local Channels</span>
                </div>
            </header>

            {/* Hotel Grid */}
            <main className="max-w-7xl mx-auto px-6 mt-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        Select Your Hotel
                    </h2>
                    <span className="text-gray-500 text-sm">Find your stay</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {hotels.map((hotel) => (
                        <Link key={hotel._id} to={`/hotel/${hotel._id}`} className="group block">
                            <div className="bg-white dark:bg-card border border-gray-200 dark:border-gray-800 p-6 rounded-2xl hover:border-primary/50 dark:hover:border-primary/50 transition duration-300 shadow-sm dark:shadow-none">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    </div>
                                    <span className="text-gray-400 dark:text-gray-500 text-xs font-mono">HOTEL</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition">{hotel.name}</h3>
                                <p className="text-gray-500 text-sm mb-6 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                    {hotel.location || `${hotel.city}, ${hotel.country}`}
                                </p>
                                <div className="flex items-center text-sm font-medium text-gray-600 dark:text-white group-hover:text-primary">
                                    View Guide <span className="ml-2 group-hover:translate-x-1 transition">&rarr;</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;

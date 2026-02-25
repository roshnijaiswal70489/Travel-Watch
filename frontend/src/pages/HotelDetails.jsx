import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHotelById, getChannels } from '../services/api';
import { useLocation } from '../context/LocationContext';
import ChannelCard from '../components/ChannelCard';
import { getChannelEPG } from '../services/epgService';
import VideoPlayerModal from '../components/VideoPlayerModal';

const HotelDetails = () => {
    const { id } = useParams();
    const { country } = useLocation();
    const [hotel, setHotel] = useState(null);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All'); // All, Sports, Movies
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedChannel, setSelectedChannel] = useState(null);

    const [isFreeFilter, setIsFreeFilter] = useState(false);
    const [playingChannel, setPlayingChannel] = useState(null);

    useEffect(() => {
        // Update current time for schedule display - every 30 seconds for real-time feel
        const timer = setInterval(() => setCurrentTime(new Date()), 30000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                setLoading(true);
                const filters = {};
                if (activeFilter !== 'All') filters.category = activeFilter;
                if (isFreeFilter) filters.type = 'free';

                const channelsDoc = await getChannels(id, filters).catch(() => ({ data: [] }));

                // Get Indian TV channels based on location
                const getIndianChannels = () => {
                    if (country === 'India' || country === 'Unknown') {
                        return getIndianTVChannels();
                    }
                    // Default to Indian channels for any location
                    return getIndianTVChannels();
                };

                // MOCK DATA Fallback
                if (!channelsDoc.data || channelsDoc.data.length === 0) {
                    let mockChannels = getIndianChannels();
                    // Client-side filtering for mocks
                    let filtered = mockChannels;
                    if (activeFilter !== 'All') filtered = filtered.filter(c => c.category === activeFilter);
                    if (isFreeFilter) filtered = filtered.filter(c => c.isFree);
                    setChannels(filtered);
                } else {
                    setChannels(channelsDoc.data);
                }

            } catch (error) {
                console.error('Error fetching channels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannels();
    }, [id, activeFilter, isFreeFilter, country, currentTime]);

    // Get Indian TV channels based on location (using EPG Service)
    const getIndianTVChannels = () => {
        const getEPG = (id, cat) => getChannelEPG(id, cat, currentTime);
        return [
            // Entertainment Channels
            {
                _id: '1',
                name: 'Star Plus',
                channelNumber: '1',
                category: 'Entertainment',
                isFree: true,
                isLive: true,
                ...getEPG('1', 'Entertainment'),
                streamUrl: 'https://www.youtube.com/watch?v=uCqUv5aF08U',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '2',
                name: 'Colors',
                channelNumber: '2',
                category: 'Entertainment',
                isFree: true,
                isLive: true,
                ...getEPG('2', 'Entertainment'),
                streamUrl: 'https://www.youtube.com/watch?v=pWb1vMgyoYQ',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '3',
                name: 'Sony SAB',
                channelNumber: '3',
                category: 'Entertainment',
                isFree: true,
                isLive: true,
                ...getEPG('3', 'Entertainment'),
                streamUrl: 'https://www.youtube.com/watch?v=X8Z0kZ_g6Gg',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '4',
                name: 'Sony TV',
                channelNumber: '4',
                category: 'Entertainment',
                isFree: true,
                isLive: true,
                ...getEPG('4', 'Entertainment'),
                streamUrl: 'https://www.youtube.com/watch?v=KzXkZ2G8Q8Q',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '5',
                name: 'Zee TV',
                channelNumber: '5',
                category: 'Entertainment',
                isFree: true,
                isLive: true,
                ...getEPG('5', 'Entertainment'),
                streamUrl: 'https://www.youtube.com/watch?v=76dC5N_eG6Q',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '6',
                name: 'Star Gold',
                channelNumber: '6',
                category: 'Movies',
                isFree: true,
                isLive: true,
                ...getEPG('6', 'Movies'),
                streamUrl: 'https://www.youtube.com/watch?v=Pk9w76v00i8',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '7',
                name: 'Zee Cinema',
                channelNumber: '7',
                category: 'Movies',
                isFree: true,
                isLive: true,
                ...getEPG('7', 'Movies'),
                streamUrl: 'https://www.youtube.com/watch?v=5X9g5j9j5k8',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '8',
                name: 'Sony Max',
                channelNumber: '8',
                category: 'Movies',
                isFree: true,
                isLive: true,
                ...getEPG('8', 'Movies'),
                streamUrl: 'https://www.youtube.com/watch?v=2vjPBrBU-TM',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '9',
                name: 'Star Sports',
                channelNumber: '9',
                category: 'Sports',
                isFree: true,
                isLive: true,
                ...getEPG('9', 'Sports'),
                streamUrl: 'https://www.youtube.com/watch?v=hFj10gXJgJ0',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '10',
                name: 'Sony Six',
                channelNumber: '11',
                category: 'Sports',
                isFree: false,
                isLive: true,
                ...getEPG('10', 'Sports'),
                streamUrl: 'https://www.youtube.com/watch?v=b4Fh8P_gG3o',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '11',
                name: 'Cartoon Network',
                channelNumber: '13',
                category: 'Kids',
                isFree: true,
                isLive: true,
                ...getEPG('13', 'Kids'),
                streamUrl: 'https://www.youtube.com/watch?v=P6Pj6U5u_vU',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '12',
                name: 'Nickelodeon',
                channelNumber: '14',
                category: 'Kids',
                isFree: true,
                isLive: true,
                ...getEPG('12', 'Kids'),
                streamUrl: 'https://www.youtube.com/watch?v=Gj6V-xZGtso',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '13',
                name: 'Indian Idol',
                channelNumber: '17',
                category: 'Music',
                isFree: true,
                isLive: true,
                ...getEPG('17', 'Music'),
                streamUrl: 'https://www.youtube.com/watch?v=6MCHupKkKbk',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '14',
                name: 'Dance India Dance',
                channelNumber: '18',
                category: 'Dance',
                isFree: false,
                isLive: true,
                ...getEPG('18', 'Dance'),
                streamUrl: 'https://www.youtube.com/watch?v=M66U_DuMCS8',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '15',
                name: 'Aastha',
                channelNumber: '20',
                category: 'Devotional',
                isFree: true,
                isLive: true,
                ...getEPG('20', 'Devotional'),
                streamUrl: 'https://www.youtube.com/watch?v=eYkOKrUEd0E',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
            {
                _id: '16',
                name: 'Shemaroo TV',
                channelNumber: '21',
                category: 'Devotional',
                isFree: true,
                isLive: true,
                ...getEPG('21', 'Devotional'),
                streamUrl: 'https://www.youtube.com/watch?v=2Y4qQ9-2e5Y',
                streamType: 'youtube',
                requiresToken: false,
                token: null,
            },
        ];
    };

    const getTimeSlots = () => {
        const slots = [];
        for (let i = 0; i < 12; i++) {
            const time = new Date(currentTime);
            time.setHours(time.getHours() + i);
            slots.push(time);
        }
        return slots;
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const getChannelPrograms = (channel) => {
        const programs = [];
        getTimeSlots().forEach((slot) => {
            programs.push({
                time: slot,
                title: channel.schedule ? channel.schedule[slot.getHours() % 24]?.program : channel.currentProgram,
                duration: Math.floor(Math.random() * 60) + 30
            });
        });
        return programs;
    };

    return (
        <div className="pb-20 bg-gray-50 dark:bg-dark transition-colors duration-300">
            <div className="bg-white dark:bg-dark px-6 py-6 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white mb-4 inline-flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Hotels
                    </Link>

                    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-medium text-sm mb-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                Hotel TV Guide
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{hotel?.name}</h1>
                            <p className="text-gray-500">{hotel?.location}</p>
                        </div>

                    </header>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 mt-8">
                <section>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            What's playing right now
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveFilter('All')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${activeFilter === 'All' ? 'bg-primary text-white' : 'bg-white dark:bg-card border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'}`}
                            >
                                All
                            </button>
                            {['Entertainment', 'Movies', 'Sports', 'Kids', 'Music', 'Dance', 'Devotional'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${activeFilter === filter
                                        ? 'bg-gray-800 dark:bg-gray-700 text-white border border-gray-700 dark:border-gray-600'
                                        : 'bg-white dark:bg-card border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white hover:border-primary dark:hover:border-gray-600'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}

                            <div className="w-px h-8 bg-gray-300 dark:bg-gray-800 mx-2 hidden md:block"></div>

                            <button
                                onClick={() => setIsFreeFilter(!isFreeFilter)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition flex items-center gap-1 ${isFreeFilter
                                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/30'
                                    : 'bg-white dark:bg-card border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'
                                    }`}
                            >
                                Free Only
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500 py-12">Loading channels...</p>
                    ) : channels.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-800">
                            <p className="text-gray-500 text-lg">No channels found with current filters.</p>
                            <button
                                onClick={() => { setActiveFilter('All'); setIsFreeFilter(false); }}
                                className="text-primary mt-2 hover:underline"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* TV Guide Grid */}
                            <div className="bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
                                {/* Time Header */}
                                <div className="flex border-b border-gray-800 sticky top-0 bg-gray-900 dark:bg-gray-950 z-10">
                                    <div className="w-56 flex-shrink-0 px-4 py-4 border-r border-gray-800">
                                        <p className="text-gray-400 text-sm font-medium">CHANNEL</p>
                                    </div>
                                    <div className="hidden lg:flex flex-1">
                                        {getTimeSlots().map((time, idx) => (
                                            <div key={idx} className="flex-1 px-2 py-4 border-r border-gray-800 text-center">
                                                <p className="text-white font-bold text-sm">{formatTime(time)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Channels Grid */}
                                <div className="overflow-x-auto">
                                    {channels.map((channel) => (
                                        <div key={channel._id} className="flex border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50 transition">
                                            {/* Channel Info */}
                                            <div
                                                className="w-56 flex-shrink-0 px-4 py-4 border-r border-gray-800 bg-gray-800/30 cursor-pointer hover:bg-gray-700/50 transition"
                                                onClick={() => setPlayingChannel(channel)}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="text-white font-bold text-lg">{channel.channelNumber}</p>
                                                        <p className="text-gray-300 text-sm font-semibold">{channel.name}</p>
                                                    </div>
                                                    {channel.isFree && (
                                                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">FREE</span>
                                                    )}
                                                </div>
                                                {channel.isLive && (
                                                    <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">LIVE</span>
                                                )}
                                            </div>

                                            {/* Programs Grid */}
                                            <div className="hidden lg:flex flex-1 overflow-x-auto">
                                                {channel.schedule && channel.schedule.length > 0 ? (
                                                    channel.schedule.map((slot, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex-1 px-2 py-3 border-r border-gray-800 cursor-pointer hover:bg-orange-500/30 transition group min-w-max"
                                                            onClick={() => setPlayingChannel(channel)}
                                                        >
                                                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-2 h-full min-h-16 flex flex-col justify-center group-hover:shadow-lg group-hover:shadow-orange-500/30 transition">
                                                                <p className="text-white text-xs font-semibold mb-1">{slot.time}</p>
                                                                <p className="text-white text-xs font-bold line-clamp-2">{slot.program}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="flex-1 px-2 py-3 flex items-center justify-center text-gray-400">No schedule</div>
                                                )}
                                            </div>

                                            {/* Mobile view - show current & next */}
                                            <div
                                                className="lg:hidden flex-1 px-4 py-4 space-y-2 cursor-pointer"
                                                onClick={() => setPlayingChannel(channel)}
                                            >
                                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-3">
                                                    <p className="text-white text-xs font-semibold mb-1">NOW</p>
                                                    <p className="text-white text-sm font-bold truncate">{channel.currentShow?.show || 'Loading...'}</p>
                                                </div>
                                                <div className="bg-gray-800 rounded-lg p-3">
                                                    <p className="text-gray-400 text-xs font-semibold mb-1">NEXT</p>
                                                    <p className="text-gray-300 text-sm truncate">{channel.nextShow?.show || 'Loading...'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detailed Channel Info Card */}
                            {selectedChannel && (
                                <div className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedChannel.name}</h3>
                                            <p className="text-gray-600 dark:text-gray-400">Channel {selectedChannel.channelNumber}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedChannel(null)}
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Current & Next */}
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                                                <p className="text-sm font-semibold mb-2">NOW PLAYING</p>
                                                <h4 className="text-lg font-bold mb-1">{selectedChannel.currentShow?.show || 'N/A'}</h4>
                                                <p className="text-orange-100 text-sm">Playing live</p>
                                            </div>

                                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">COMING NEXT</p>
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{selectedChannel.nextShow?.show || 'N/A'}</h4>
                                            </div>
                                        </div>

                                        {/* 12 Hour Schedule */}
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">12-HOUR SCHEDULE</p>
                                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                                {selectedChannel.schedule?.map((item, idx) => (
                                                    <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded p-2">
                                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-12">{item.time}</span>
                                                        <span className="text-sm text-gray-900 dark:text-gray-300 flex-1 ml-3 truncate">{item.program}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>

            {/* Video Player Modal */}
            {playingChannel && (
                <VideoPlayerModal
                    channel={playingChannel}
                    onClose={() => setPlayingChannel(null)}
                />
            )}
        </div>
    );
};

export default HotelDetails;

import React, { useEffect, useState } from 'react';
import { useLocation } from '../context/LocationContext';
import VideoPlayerModal from '../components/VideoPlayerModal';

const Streaming = () => {
    const [selectedCategory, setSelectedCategory] = useState('ALL_CHANNELS');
    const [playingChannel, setPlayingChannel] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const { country } = useLocation();

    // TV Guide Data by Country
    const channelData = {
        'UK': [
            { 
                id: 1, 
                name: 'BBC One', 
                logo: '📺', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://test-streams.mux.dev/x36xhzz/x3zzv.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 30, title: 'News at Seven', show: 'BBC News' },
                    { time: '19:30', duration: 90, title: 'EastEnders', show: 'Drama' },
                    { time: '21:00', duration: 120, title: 'Doctor Who Special', show: 'Sci-Fi' },
            ]},
            { 
                id: 2, 
                name: 'BBC Two', 
                logo: '🎨', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 60, title: 'Documentaries', show: 'Nature' },
                    { time: '20:00', duration: 45, title: 'Have I Got News', show: 'Comedy' },
                    { time: '20:45', duration: 60, title: 'QI', show: 'Quiz Show' },
            ]},
            { 
                id: 3, 
                name: 'ITV', 
                logo: '🎬', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 30, title: 'News Tonight', show: 'News' },
                    { time: '19:30', duration: 120, title: 'Emmerdale', show: 'Soap' },
                    { time: '21:30', duration: 90, title: 'The Chase', show: 'Quiz' },
            ]},
            { 
                id: 4, 
                name: 'Channel 4', 
                logo: '🎪', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 60, title: 'Gogglebox', show: 'Reality' },
                    { time: '20:00', duration: 120, title: 'Hollyoaks', show: 'Soap' },
                    { time: '22:00', duration: 60, title: 'Film Night', show: 'Movies' },
            ]},
            { 
                id: 5, 
                name: 'Sky Sports', 
                logo: '⚽', 
                category: 'SPORTS',
                streamUrl: 'https://test-streams.mux.dev/x36xhzz/x3zzv.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 180, title: 'Premier League', show: 'Football' },
                    { time: '22:00', duration: 120, title: 'Rugby Tonight', show: 'Rugby' },
            ]},
            { 
                id: 6, 
                name: 'Sky News', 
                logo: '📰', 
                category: 'NEWS',
                streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 60, title: 'News Hour', show: 'News' },
                    { time: '20:00', duration: 60, title: 'Politics Today', show: 'News' },
            ]},
            { 
                id: 7, 
                name: 'FilmFlex', 
                logo: '🎬', 
                category: 'MOVIES',
                streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 150, title: 'Inception', show: 'Movie' },
                    { time: '21:30', duration: 120, title: 'The Matrix', show: 'Movie' },
            ]},
            { 
                id: 8, 
                name: 'Cartoon Network', 
                logo: '🎨', 
                category: 'KIDS',
                streamUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 30, title: 'Adventure Time', show: 'Cartoon' },
                    { time: '19:30', duration: 30, title: 'Steven Universe', show: 'Cartoon' },
            ]},
        ],
        'USA': [
            { 
                id: 1, 
                name: 'NBC', 
                logo: '📺', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://test-streams.mux.dev/x36xhzz/x3zzv.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 30, title: 'NBC Nightly News', show: 'News' },
                    { time: '19:30', duration: 120, title: 'The Voice', show: 'Reality' },
                    { time: '21:30', duration: 60, title: 'Saturday Night Live', show: 'Comedy' },
            ]},
            { 
                id: 2, 
                name: 'CBS', 
                logo: '🎬', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 30, title: 'CBS Evening News', show: 'News' },
                    { time: '19:30', duration: 60, title: 'NCIS', show: 'Drama' },
                    { time: '20:30', duration: 60, title: 'FBI', show: 'Drama' },
            ]},
            { 
                id: 3, 
                name: 'ABC', 
                logo: '⭐', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 30, title: 'ABC World News', show: 'News' },
                    { time: '19:30', duration: 90, title: 'Bachelor in Paradise', show: 'Reality' },
                    { time: '21:00', duration: 60, title: 'Grey\'s Anatomy', show: 'Drama' },
            ]},
            { 
                id: 4, 
                name: 'FOX Sports', 
                logo: '⚾', 
                category: 'SPORTS',
                streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 180, title: 'NFL Football', show: 'Football' },
                    { time: '22:00', duration: 120, title: 'Basketball Tonight', show: 'Basketball' },
            ]},
            { 
                id: 5, 
                name: 'CNN', 
                logo: '📰', 
                category: 'NEWS',
                streamUrl: 'https://test-streams.mux.dev/x36xhzz/x3zzv.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 60, title: 'Evening News', show: 'News' },
                    { time: '20:00', duration: 60, title: 'Special Report', show: 'News' },
            ]},
            { 
                id: 6, 
                name: 'HBO Films', 
                logo: '🎬', 
                category: 'MOVIES',
                streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 150, title: 'Dune', show: 'Movie' },
                    { time: '21:30', duration: 120, title: 'Avatar 2', show: 'Movie' },
            ]},
            { 
                id: 7, 
                name: 'Nickelodeon', 
                logo: '🎨', 
                category: 'KIDS',
                streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 30, title: 'SpongeBob', show: 'Cartoon' },
                    { time: '19:30', duration: 30, title: 'TMNT', show: 'Cartoon' },
            ]},
        ],
        'Canada': [
            { 
                id: 1, 
                name: 'CBC', 
                logo: '📺', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://test-streams.mux.dev/x36xhzz/x3zzv.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 30, title: 'The National', show: 'News' },
                    { time: '19:30', duration: 120, title: 'Schitt\'s Creek', show: 'Comedy' },
                    { time: '21:30', duration: 90, title: 'Dragon\'s Den', show: 'Reality' },
            ]},
            { 
                id: 2, 
                name: 'CTV', 
                logo: '🎬', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 30, title: 'CTV News', show: 'News' },
                    { time: '19:30', duration: 120, title: 'Designated Survivor', show: 'Drama' },
            ]},
            { 
                id: 3, 
                name: 'TSN', 
                logo: '⚽', 
                category: 'SPORTS',
                streamUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 180, title: 'Hockey Night', show: 'Hockey' },
                    { time: '22:00', duration: 120, title: 'CFL Football', show: 'Football' },
            ]},
            { 
                id: 4, 
                name: 'APTN', 
                logo: '🎨', 
                category: 'KIDS',
                streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 30, title: 'Toopy and Binoo', show: 'Kids' },
                    { time: '19:30', duration: 30, title: 'Puffin Rock', show: 'Cartoon' },
            ]},
        ],
        'India': [
            { 
                id: 1, 
                name: 'Sony TV', 
                logo: '📺', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://test-streams.mux.dev/x36xhzz/x3zzv.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 30, title: 'Sony News', show: 'News' },
                    { time: '19:30', duration: 60, title: 'Kaun Banega Crorepati', show: 'Quiz' },
                    { time: '20:30', duration: 90, title: 'Hindi Drama', show: 'Drama' },
            ]},
            { 
                id: 2, 
                name: 'Star Plus', 
                logo: '🎬', 
                category: 'ALL_CHANNELS',
                streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
                streamType: 'application/x-mpegURL',
                shows: [
                    { time: '19:00', duration: 90, title: 'Star News', show: 'News' },
                    { time: '20:30', duration: 60, title: 'Yeh Rishta', show: 'Drama' },
            ]},
            { 
                id: 3, 
                name: 'Star Sports', 
                logo: '🏏', 
                category: 'SPORTS',
                streamUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 180, title: 'Cricket Match', show: 'Cricket' },
                    { time: '22:00', duration: 90, title: 'Sports Tonight', show: 'Sports' },
            ]},
            { 
                id: 4, 
                name: 'Cartoon Network', 
                logo: '🎨', 
                category: 'KIDS',
                streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                streamType: 'video/mp4',
                shows: [
                    { time: '19:00', duration: 30, title: 'Ben 10', show: 'Cartoon' },
                    { time: '19:30', duration: 30, title: 'Doraemon', show: 'Anime' },
            ]},
        ],
    };

    const categories = [
        { id: 'ALL_CHANNELS', label: 'ALL CHANNELS', icon: '📺' },
        { id: 'RECENT', label: 'RECENT', icon: '⏱️' },
        { id: 'SPORTS', label: 'SPORTS', icon: '⚽' },
        { id: 'NEWS', label: 'NEWS', icon: '📰' },
        { id: 'MOVIES', label: 'MOVIES', icon: '🎬' },
        { id: 'KIDS', label: 'KIDS', icon: '🎨' },
    ];

    const getChannelsForCountry = () => {
        const countryKey = country?.toUpperCase()?.split(',')[0] || 'UK';
        return channelData[countryKey] || channelData['UK'];
    };

    const getFilteredChannels = () => {
        const allChannels = getChannelsForCountry();
        if (selectedCategory === 'ALL_CHANNELS') return allChannels;
        if (selectedCategory === 'RECENT') return allChannels.slice(0, 3);
        return allChannels.filter(ch => ch.category === selectedCategory);
    };

    const generateTimeSlots = () => {
        const slots = [];
        for (let i = 0; i < 6; i++) {
            const time = new Date(currentTime);
            time.setHours(currentTime.getHours() + i);
            slots.push(time);
        }
        return slots;
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const channels = getFilteredChannels();
    const timeSlots = generateTimeSlots();

    return (
        <div className="pb-20 bg-gray-950 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 border-b border-blue-700 py-6 px-6 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">📺 TV Guide</h1>
                            <p className="text-blue-100 text-sm mt-1">{country || 'UK'} • {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div className="text-blue-100 text-lg font-semibold">
                            Current Time: {formatTime(currentTime)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex min-h-[calc(100vh-200px)]">
                {/* Sidebar Categories */}
                <div className="w-40 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto scrollbar max-h-[calc(100vh-200px)]">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition font-medium text-sm flex items-center gap-2 ${
                                selectedCategory === cat.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <span>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {/* Time Header */}
                    <div className="bg-gray-800 border-b border-gray-700 sticky top-16 z-10">
                        <div className="flex items-center h-16">
                            <div className="w-32 bg-gray-900 border-r border-gray-700 flex items-center justify-center text-xs text-gray-400 font-semibold px-2 py-4">
                                CHANNELS
                            </div>
                            <div className="flex flex-1 overflow-x-auto">
                                {timeSlots.map((time, idx) => (
                                    <div key={idx} className="flex-shrink-0 w-48 text-center px-4 py-2 border-r border-gray-700 text-sm font-bold text-green-400">
                                        {formatTime(time)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Channels Grid */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar pr-2">
                        {channels.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <p>No channels available for this category in {country}</p>
                            </div>
                        ) : (
                            channels.map((channel) => (
                                <div key={channel.id} className="flex border-b border-gray-800 hover:bg-gray-800/50 transition">
                                    {/* Channel Name */}
                                    <div className="w-32 bg-gray-900 border-r border-gray-700 flex items-center justify-center p-4 flex-shrink-0">
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">{channel.logo}</div>
                                            <p className="text-xs text-gray-400 font-semibold truncate">{channel.name}</p>
                                        </div>
                                    </div>

                                    {/* Shows Grid */}
                                    <div className="flex flex-1 overflow-x-auto">
                                        {timeSlots.map((timeSlot, idx) => {
                                            const slotStart = timeSlot.getHours();
                                            const slotEnd = slotStart + 1;
                                            const show = channel.shows.find(s => {
                                                const showStart = parseInt(s.time.split(':')[0]);
                                                return showStart >= slotStart && showStart < slotEnd;
                                            });

                                            return (
                                                <div
                                                    key={idx}
                                                    className="flex-shrink-0 w-48 h-24 border-r border-gray-700 p-2 overflow-hidden"
                                                >
                                                    {show ? (
                                                        <button
                                                            onClick={() => setPlayingChannel({
                                                                name: channel.name,
                                                                channelNumber: channel.id,
                                                                currentProgram: show.title,
                                                                nextShow: channel.shows.length > 0 ? channel.shows[0].title : 'Next Program',
                                                                category: selectedCategory,
                                                                isFree: true,
                                                                isLive: true,
                                                                logo: channel.logo,
                                                                streamUrl: channel.streamUrl,
                                                                streamType: channel.streamType,
                                                            })}
                                                            className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded hover:from-blue-500 hover:to-blue-700 transition p-2 flex flex-col justify-between cursor-pointer text-left group"
                                                        >
                                                            <div>
                                                                <p className="text-xs font-bold text-green-300 uppercase">
                                                                    {show.time} • {show.duration}m
                                                                </p>
                                                                <p className="text-sm font-bold text-white group-hover:text-yellow-200 transition line-clamp-2 mt-1">
                                                                    {show.title}
                                                                </p>
                                                            </div>
                                                            <p className="text-xs text-gray-200 opacity-0 group-hover:opacity-100 transition">
                                                                ▶ Click to Watch
                                                            </p>
                                                        </button>
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-800/30 rounded border border-gray-700/30"></div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
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

export default Streaming;

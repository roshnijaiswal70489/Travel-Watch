import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player';

/**
 * Universal Video Player Component
 * Uses ReactPlayer to support YouTube, MP4, HLS, DASH, etc.
 */
const VideoPlayerModal = ({ channel, onClose }) => {
    // ============= PLAYBACK STATE =============
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [progress, setProgress] = useState({ played: 0, playedSeconds: 0, loaded: 0, loadedSeconds: 0 });
    const [duration, setDuration] = useState(0);
    const [showSyncInfo, setShowSyncInfo] = useState('');
    const [showLiveInfo, setShowLiveInfo] = useState(true); // Default to showing live info

    // ============= REFS =============
    const modalRef = useRef(null);
    const playerRef = useRef(null);
    const syncUpdateIntervalRef = useRef(null);

    // ============= REAL-TIME SHOW SYNCHRONIZATION =============
    const syncShowInfo = useCallback(() => {
        if (!channel) return;

        try {
            let currentShowName = channel.currentShow?.show || channel.currentShow || channel.currentProgram || 'Unknown';
            let nextShowName = channel.nextShow?.show || channel.nextShow || 'Upcoming';

            // If schedule array exists, find current/next from it
            if (channel.schedule && Array.isArray(channel.schedule)) {
                for (let i = 0; i < channel.schedule.length; i++) {
                    const scheduleItem = channel.schedule[i];
                    if (scheduleItem && scheduleItem.program) {
                        if (i === 0) currentShowName = scheduleItem.program;
                        if (i === 1) {
                            nextShowName = scheduleItem.program;
                            break;
                        }
                    }
                }
            }
            setShowSyncInfo(`Now: ${currentShowName} | Next: ${nextShowName}`);
        } catch (error) {
            console.error('Error syncing show info:', error);
        }
    }, [channel]);

    useEffect(() => {
        syncShowInfo();
        syncUpdateIntervalRef.current = setInterval(syncShowInfo, 5000);
        return () => clearInterval(syncUpdateIntervalRef.current);
    }, [syncShowInfo]);

    // ============= EVENT HANDLERS =============
    const handleReady = () => {
        setIsLoading(false);
        console.log('Video Ready');
    };

    const handleError = (e) => {
        console.error('Video Error:', e);
        // We can implement retry logic here if needed, but for now we just log it
    };

    const handleProgress = (state) => {
        setProgress(state);
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (modalRef.current?.requestFullscreen) {
                modalRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    const formatTime = (seconds) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    // ============= RENDER =============
    if (!channel) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all duration-300">
            <div ref={modalRef} className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 transition-all duration-300 flex flex-col ${isFullscreen ? 'w-screen h-screen rounded-none' : 'w-full max-w-4xl max-h-[calc(100vh-2rem)] my-auto'}`}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-white/20 text-white rounded-full p-2 transition backdrop-blur-md"
                    title="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Video Container */}
                <div className="relative aspect-video bg-black group flex-shrink-0">
                    {/* React Player */}
                    <ReactPlayer
                        ref={playerRef}
                        url={channel.streamUrl}
                        playing={isPlaying}
                        controls={false} // Use custom controls or set to true for native
                        width="100%"
                        height="100%"
                        volume={volume}
                        onReady={handleReady}
                        onError={handleError}
                        onProgress={handleProgress}
                        onDuration={handleDuration}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 0, autoplay: 1 }
                            }
                        }}
                    />

                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Live Badge Overlay */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
                        <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm flex items-center gap-1.5 animate-pulse">
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                            LIVE
                        </div>
                        <span className="bg-black/50 backdrop-blur text-white text-xs font-medium px-2 py-1 rounded-sm">
                            {channel.channelNumber}
                        </span>
                    </div>

                    {/* Live Info Popover */}
                    {showLiveInfo && (
                        <div className="absolute top-16 left-4 z-10 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-gray-700/50 max-w-xs transition-opacity duration-300 pointer-events-none">
                            <p className="text-red-500 text-[10px] font-bold uppercase mb-1">Now Broadcasting</p>
                            <h4 className="text-white font-bold text-sm leading-tight">
                                {showSyncInfo.split(' | ')[0]?.replace('Now: ', '') || channel.name}
                            </h4>
                            <p className="text-gray-400 text-[10px] mt-1">
                                {showSyncInfo.split(' | ')[1] || ''}
                            </p>
                        </div>
                    )}

                    {/* Custom Controls Overlay (Visible on Hover) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="space-y-2">
                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all"
                                onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const percent = (e.clientX - rect.left) / rect.width;
                                    playerRef.current.seekTo(percent);
                                }}
                            >
                                <div
                                    className="h-full bg-red-600"
                                    style={{ width: `${progress.played * 100}%` }}
                                ></div>
                            </div>

                            <div className="flex items-center justify-between text-white">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying ? (
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                        ) : (
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        )}
                                    </button>

                                    <div className="flex items-center gap-2 group/vol">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                        <input
                                            type="range" min="0" max="1" step="0.1" value={volume}
                                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                                            className="w-0 group-hover/vol:w-20 transition-all duration-300 opacity-0 group-hover/vol:opacity-100 accent-primary"
                                        />
                                    </div>

                                    <span className="text-xs font-mono text-gray-300">
                                        {formatTime(progress.playedSeconds)} / {formatTime(duration)}
                                    </span>
                                </div>

                                <button onClick={toggleFullscreen}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Channel Info Section */}
                <div className="bg-gray-900 p-6 border-t border-gray-800 flex-1 overflow-y-auto">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">{channel.name}</h2>
                            <p className="text-gray-400 text-sm mb-4">Channel {channel.channelNumber} • {channel.category}</p>

                            <div className="bg-gray-800/50 rounded-lg p-4 max-w-xl border border-gray-700/50">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Currently Airing</h3>
                                <p className="text-lg font-bold text-white mb-1">
                                    {showSyncInfo.split(' | ')[0]?.replace('Now: ', '') || channel.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {showSyncInfo.split(' | ')[1] || 'Next program information unavailable'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerModal;

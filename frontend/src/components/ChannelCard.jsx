import React from 'react';

const ChannelCard = ({ channel, onClick }) => {
    return (
        <div
            onClick={() => onClick(channel)}
            className="cursor-pointer bg-white dark:bg-card border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:border-primary dark:hover:border-primary hover:shadow-lg hover:scale-[1.01] transition duration-300 relative group overflow-hidden shadow-sm dark:shadow-none"
        >
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center pointer-events-none z-10 dark:bg-white/5">
                <div className="bg-white/90 dark:bg-black/90 rounded-full p-3 shadow-xl transform scale-75 group-hover:scale-100 transition duration-300">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
            </div>

            {/* Live Indicator Background Glow */}
            {channel.isLive && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 dark:from-red-900/10 to-transparent pointer-events-none" />
            )}
            {/* ... rest of the component ... */}
            {/* Channel Number */}
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-dark rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-800 font-bold text-xl text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                {channel.channelNumber}
            </div>

            {/* Info */}
            <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900 dark:text-white font-bold truncate group-hover:text-primary transition-colors">{channel.name}</h3>
                    {channel.isLive && (
                        <span className="bg-red-600 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded animate-pulse">
                            Live
                        </span>
                    )}
                </div>

                {channel.currentProgram ? (
                    <div className="flex flex-col">
                        <p className="text-gray-600 dark:text-gray-400 text-sm truncate flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {channel.currentProgram}
                        </p>
                        {/* Mock Next Program */}
                        <p className="text-gray-500 dark:text-gray-600 text-xs truncate mt-0.5 flex items-center gap-1">
                            <span className="uppercase text-[10px] font-semibold text-gray-400 dark:text-gray-700">Next:</span> {channel.nextShow || 'Upcoming Program'}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-400 dark:text-gray-500 text-sm">Click to watch</p>
                )}
            </div>

            {/* Category / Type */}
            <div className="flex-shrink-0 flex flex-col items-end gap-2">
                {channel.category && (
                    <span className={`px-3 py-1 text-xs rounded-full font-medium border ${channel.category === 'Sports' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/30' :
                        channel.category === 'Movies' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/30' :
                            channel.category === 'News' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/30' :
                                'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                        }`}>
                        {channel.category}
                    </span>
                )}
                {channel.isFree && (
                    <span className="text-[10px] text-green-600 dark:text-green-500 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Free
                    </span>
                )}
            </div>
        </div>
    );
};

export default ChannelCard;

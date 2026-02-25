import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchChannels } from '../services/api';
import ChannelCard from '../components/ChannelCard';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setSearched(true);
        try {
            const response = await searchChannels(query);
            setResults(response.data);
        } catch (error) {
            console.error('Search error:', error);
            // Fallback for demo if backend fails or empty
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-20 px-6 bg-gray-50 dark:bg-dark min-h-screen transition-colors duration-300">
            <div className="max-w-4xl mx-auto pt-8">
                <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white mb-6 inline-flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back Home
                </Link>

                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Search Content</h1>
                <p className="text-gray-600 dark:text-gray-500 mb-8">Find channels, specific shows, or categories.</p>

                <form onSubmit={handleSearch} className="flex gap-4 mb-12">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for 'Sports', 'CNN', 'Football'..."
                            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 transition shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50 transition shadow-lg shadow-orange-500/20"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                {searched && (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                            Results for "{query}"
                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs px-2 py-1 rounded-full">{results.length} found</span>
                        </h2>

                        {results.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {results.map(channel => (
                                    <ChannelCard key={channel._id} channel={channel} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-gray-800 border-dashed">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 text-gray-400 dark:text-gray-500">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No content found matching your search.</p>
                                <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">Try checking for typos or use broader keywords.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;

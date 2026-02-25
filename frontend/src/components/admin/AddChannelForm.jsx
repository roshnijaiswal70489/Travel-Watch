import React, { useState, useEffect } from 'react';
import { createChannel, getHotels } from '../../services/api';

const AddChannelForm = ({ token, onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', channelNumber: '', category: '', logoUrl: '', hotelId: '', isFree: false });
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch hotels to populate dropdown
        getHotels().then(res => setHotels(res.data)).catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createChannel(formData, token);
            setFormData({ name: '', channelNumber: '', category: '', logoUrl: '', hotelId: formData.hotelId, isFree: false });
            if (onSuccess) onSuccess();
            alert('Channel added successfully!');
        } catch (err) {
            setError('Failed to add channel');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Add New Channel</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Hotel</label>
                <select
                    value={formData.hotelId}
                    onChange={(e) => setFormData({ ...formData, hotelId: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">-- Select Hotel --</option>
                    {hotels.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Channel Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Channel Number</label>
                    <input
                        type="text"
                        value={formData.channelNumber}
                        onChange={(e) => setFormData({ ...formData, channelNumber: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="e.g. Sports, News, Movies"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Logo URL (Optional)</label>
                <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isFree || false}
                        onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                        className="form-checkbox h-5 w-5 text-green-600"
                    />
                    <span className="text-gray-700">Is Free Channel?</span>
                </label>
            </div>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Channel</button>
        </form>
    );
};

export default AddChannelForm;

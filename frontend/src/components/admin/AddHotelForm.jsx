import React, { useState } from 'react';
import { createHotel } from '../../services/api';

const AddHotelForm = ({ token, onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', location: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createHotel(formData, token);
            setFormData({ name: '', location: '' });
            if (onSuccess) onSuccess();
            alert('Hotel added successfully!');
        } catch (err) {
            setError('Failed to add hotel');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Add New Hotel</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Hotel Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Hotel</button>
        </form>
    );
};

export default AddHotelForm;

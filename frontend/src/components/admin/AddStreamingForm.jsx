import React, { useState } from 'react';
import { createStreamingService } from '../../services/api';

const AddStreamingServiceForm = ({ token, onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', logoUrl: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createStreamingService(formData, token);
            setFormData({ name: '', logoUrl: '' });
            if (onSuccess) onSuccess();
            alert('Streaming Service added successfully!');
        } catch (err) {
            setError('Failed to add service');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Add Streaming Service</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Service Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Logo URL</label>
                <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Add Service</button>
        </form>
    );
};

export default AddStreamingServiceForm;

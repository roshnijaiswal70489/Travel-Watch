import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Hotels
export const getHotels = () => api.get('/hotels');
export const getHotelById = (id) => api.get(`/hotels/${id}`);
export const getHotelQR = (id) => api.get(`/hotels/${id}/qr`);

// Channels
export const getChannels = (hotelId, filters = {}) => {
    let query = `/channels?hotelId=${hotelId}`;
    if (filters.category) query += `&category=${filters.category}`;
    if (filters.type) query += `&type=${filters.type}`;
    return api.get(query);
};
export const getAllChannels = () => api.get('/channels');
export const searchChannels = (query) => api.get(`/search?q=${query}`);

// Streaming
export const getStreamingServices = (country) => {
    if (country && country !== 'Unknown') {
        return api.get(`/streaming/${country}`);
    }
    return api.get('/streaming/global'); // or just /streaming if that returns global
};

// Admin
export const adminLogin = (credentials) => api.post('/auth/login', credentials);
export const adminRegister = (credentials) => api.post('/auth/register', credentials);
export const createHotel = (data, token) => api.post('/hotels', data, { headers: { Authorization: `Bearer ${token}` } });
export const createChannel = (data, token) => api.post('/channels', data, { headers: { Authorization: `Bearer ${token}` } });
export const createStreamingService = (data, token) => api.post('/streaming', data, { headers: { Authorization: `Bearer ${token}` } });

export default api;

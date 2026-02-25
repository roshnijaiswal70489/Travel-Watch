const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    genre: {
        type: String,
    },
    duration: {
        type: Number, // in minutes
    },
    rating: {
        type: String,
    },
    image: {
        type: String, // URL to poster
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Show', ShowSchema);

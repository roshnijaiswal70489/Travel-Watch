const mongoose = require('mongoose');

const StreamingServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('StreamingService', StreamingServiceSchema);

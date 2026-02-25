const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    channelNumber: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'General',
    },
    currentShow: {
        type: String,
        default: '',
    },
    nextShow: {
        type: String,
        default: '',
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    streamUrl: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Channel', ChannelSchema);

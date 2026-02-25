const Channel = require('../models/Channel');

// @desc    Create a new channel
// @route   POST /api/admin/channel
// @access  Private/Admin
const createChannel = async (req, res) => {
    const { hotelId, name, channelNumber, category, currentShow, nextShow, startTime, endTime, isFree, streamUrl } = req.body;

    try {
        const channel = new Channel({
            hotelId,
            name,
            channelNumber,
            category,
            currentShow,
            nextShow,
            startTime,
            endTime,
            isFree,
            streamUrl,
        });

        const createdChannel = await channel.save();
        res.status(201).json(createdChannel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get channels by hotel ID with optional filters
// @route   GET /api/hotels/:id/channels?category=Sports&isFree=true
// @access  Public
const getChannelsByHotelId = async (req, res) => {
    try {
        const { category, type } = req.query;
        let query = { hotelId: req.params.id };

        if (category && category !== 'All') {
            query.category = category;
        }

        if (type === 'free') {
            query.isFree = true;
        }

        const channels = await Channel.find(query).sort({ channelNumber: 1 });
        res.json(channels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search channels
// @route   GET /api/search?q=
// @access  Public
const searchChannels = async (req, res) => {
    const query = req.query.q;
    try {
        // Basic search on channel name or current show
        const channels = await Channel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { currentShow: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        }).populate('hotelId', 'name city');

        res.json(channels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// @desc    Get currently playing channels (Live)
// @route   GET /api/hotels/:id/channels/live
// @access  Public
const getLiveChannels = async (req, res) => {
    try {
        const now = new Date();

        // Find channels where startTime <= now <= endTime
        const channels = await Channel.find({
            hotelId: req.params.id,
            startTime: { $lte: now },
            endTime: { $gte: now }
        }).sort({ channelNumber: 1 });

        res.json(channels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createChannel, getChannelsByHotelId, searchChannels, getLiveChannels };

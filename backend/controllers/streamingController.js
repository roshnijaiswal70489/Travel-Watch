const StreamingService = require('../models/StreamingService');

// @desc    Create a new streaming service
// @route   POST /api/admin/streaming
// @access  Private/Admin
const createStreamingService = async (req, res) => {
    const { name, country, available } = req.body;

    try {
        const service = new StreamingService({
            name,
            country,
            available,
        });

        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get streaming services by country
// @route   GET /api/streaming/:country
// @access  Public
const getStreamingServicesByCountry = async (req, res) => {
    try {
        // Case-insensitive regex for country
        // Find services where country is EITHER not set (Global) OR matches the requested country
        const services = await StreamingService.find({
            $or: [
                { country: { $exists: false } },
                { country: null },
                { country: "" },
                { country: { $regex: new RegExp(`^${req.params.country}$`, 'i') } }
            ],
            available: true
        });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createStreamingService, getStreamingServicesByCountry };

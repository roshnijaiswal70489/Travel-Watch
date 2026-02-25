const Program = require('../models/Program');
const Show = require('../models/Show');

// @desc    Schedule a program
// @route   POST /api/programs
// @access  Private/Admin
const scheduleProgram = async (req, res) => {
    const { channelId, showId, startTime, endTime } = req.body;

    try {
        // Validation: Check for overlaps
        const overlap = await Program.findOne({
            channelId,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } },
                { startTime: { $lte: startTime }, endTime: { $gte: endTime } } // Covers scheduling inside existing
            ]
        });

        if (overlap) {
            return res.status(400).json({ message: 'Program overlaps with an existing schedule.' });
        }

        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        const program = new Program({
            channelId,
            showId,
            title: show.title,
            startTime,
            endTime
        });

        const savedProgram = await program.save();
        res.status(201).json(savedProgram);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get schedule for a channel
// @route   GET /api/channels/:channelId/programs
// @access  Public
const getChannelSchedule = async (req, res) => {
    const { channelId } = req.params;
    const { date } = req.query; // Optional date filter

    try {
        let query = { channelId };

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            query.startTime = { $gte: startOfDay, $lte: endOfDay };
        }

        const programs = await Program.find(query)
            .populate('showId')
            .sort({ startTime: 1 });

        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get current program for a channel
// @route   GET /api/channels/:channelId/current
// @access  Public
const getCurrentProgram = async (req, res) => {
    const { channelId } = req.params;
    const now = new Date();

    try {
        const program = await Program.findOne({
            channelId,
            startTime: { $lte: now },
            endTime: { $gte: now }
        }).populate('showId');

        if (program) {
            res.json(program);
        } else {
            res.json(null);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    scheduleProgram,
    getChannelSchedule,
    getCurrentProgram
};

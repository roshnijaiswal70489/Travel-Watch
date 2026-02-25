const Show = require('../models/Show');

// @desc    Create a new show
// @route   POST /api/shows
// @access  Private/Admin
const createShow = async (req, res) => {
    try {
        const show = new Show(req.body);
        const savedShow = await show.save();
        res.status(201).json(savedShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all shows
// @route   GET /api/shows
// @access  Public
const getAllShows = async (req, res) => {
    try {
        const shows = await Show.find({});
        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get show by ID
// @route   GET /api/shows/:id
// @access  Public
const getShowById = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id);
        if (show) {
            res.json(show);
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update show
// @route   PUT /api/shows/:id
// @access  Private/Admin
const updateShow = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id);
        if (show) {
            Object.assign(show, req.body);
            const updatedShow = await show.save();
            res.json(updatedShow);
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete show
// @route   DELETE /api/shows/:id
// @access  Private/Admin
const deleteShow = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id);
        if (show) {
            await show.deleteOne();
            res.json({ message: 'Show removed' });
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createShow,
    getAllShows,
    getShowById,
    updateShow,
    deleteShow,
};

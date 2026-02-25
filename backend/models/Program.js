const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true,
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true,
    },
    title: {
        type: String, // Denormalized title for easier querying if populated show is not needed
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
});

// Ensure no overlapping schedules for the same channel
// (This index might need adjustment if we allow overlaps, but usually TV doesn't overlap on one channel)
ProgramSchema.index({ channelId: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model('Program', ProgramSchema);

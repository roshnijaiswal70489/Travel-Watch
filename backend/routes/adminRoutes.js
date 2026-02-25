const express = require('express');
const router = express.Router();
const { createHotel, generateQRCode } = require('../controllers/hotelController');
const { createChannel } = require('../controllers/channelController');
const { createStreamingService } = require('../controllers/streamingController');
const { createShow } = require('../controllers/showController');
const { scheduleProgram } = require('../controllers/programController');

const { protect, admin } = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/hotel', protect, admin, [
    check('name', 'Hotel name is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty()
], validate, createHotel);
router.post('/hotel/:id/qr', protect, admin, generateQRCode);
router.post('/channel', protect, admin, [
    check('name', 'Channel name is required').not().isEmpty(),
    check('channelNumber', 'Channel number must be a number').isNumeric(),
    check('category', 'Category is required').not().isEmpty()
], validate, createChannel);
router.post('/streaming', protect, admin, createStreamingService);

router.post('/show', protect, admin, createShow);
router.post('/schedule', protect, admin, scheduleProgram);

module.exports = router;

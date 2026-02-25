const express = require('express');
const router = express.Router();
const { getHotelById } = require('../controllers/hotelController');
const { getChannelsByHotelId, searchChannels } = require('../controllers/channelController');
const { getStreamingServicesByCountry } = require('../controllers/streamingController');
const { getAllShows, getShowById } = require('../controllers/showController');
const { getChannelSchedule, getCurrentProgram } = require('../controllers/programController');

const { generateQRCode } = require('../controllers/qrController');

// Search routes should generally come before :id routes to avoid collision if structure matches
router.get('/search', searchChannels);

router.get('/hotels/:id', getHotelById);
router.get('/hotels/:id/qr', generateQRCode);
router.get('/hotels/:id/channels', getChannelsByHotelId);
router.get('/hotels/:id/channels/live', require('../controllers/channelController').getLiveChannels);
router.get('/streaming/:country', getStreamingServicesByCountry);
router.get('/streaming/global', (req, res) => { req.params.country = 'global'; getStreamingServicesByCountry(req, res); }); // Fallback or explicit global

router.get('/shows', getAllShows);
router.get('/shows/:id', getShowById);
router.get('/channels/:channelId/schedule', getChannelSchedule);
router.get('/channels/:channelId/current', getCurrentProgram);

module.exports = router;

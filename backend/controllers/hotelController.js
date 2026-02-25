const Hotel = require('../models/Hotel');

// @desc    Create a new hotel
// @route   POST /api/admin/hotel
// @access  Private/Admin
const createHotel = async (req, res) => {
    const { name, city, country, location, qrCodeUrl } = req.body;

    try {
        const hotel = new Hotel({
            name,
            city,
            country,
            location,
            qrCodeUrl,
        });

        const createdHotel = await hotel.save();
        res.status(201).json(createdHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const QRCode = require('qrcode');

// @desc    Get hotel by ID
// @route   GET /api/hotels/:id
// @access  Public
const getHotelById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Hotel ID' });
        }

        const hotel = await Hotel.findById(req.params.id);

        if (hotel) {
            res.json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Generate QR Code for Hotel
// @route   POST /api/admin/hotel/:id/qr
// @access  Private/Admin
const generateQRCode = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Hotel ID format' });
        }

        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // FRONTEND_URL should be in .env, defaulting to localhost:5173 for dev
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const hotelUrl = `${frontendUrl}/hotel/${hotel._id}`;

        // Generate QR Code as Data URI
        const qrCodeDataUrl = await QRCode.toDataURL(hotelUrl);

        // Save to hotel record
        hotel.qrCodeUrl = qrCodeDataUrl;
        await hotel.save();

        res.json({
            message: 'QR Code generated and saved',
            qrCodeUrl: qrCodeDataUrl,
            hotelUrl: hotelUrl
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createHotel, getHotelById, generateQRCode };

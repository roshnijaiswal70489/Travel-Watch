const QRCode = require('qrcode');

const generateQRCode = async (req, res) => {
    try {
        const { id } = req.params;
        // In a real scenario, this would be the actual domain of the frontend
        // For development, we use localhost:5173 (Vite default)
        const appUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const url = `${appUrl}/hotel/${id}`;

        const qrCodeImage = await QRCode.toDataURL(url);

        res.status(200).json({
            hotelId: id,
            url: url,
            qrCode: qrCodeImage
        });
    } catch (error) {
        console.error('QR Gen Error:', error);
        res.status(500).json({ message: 'Failed to generate QR Code' });
    }
};

module.exports = {
    generateQRCode
};

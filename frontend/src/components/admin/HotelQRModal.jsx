import React, { useEffect, useState } from 'react';
import { getHotelQR } from '../../services/api';

const HotelQRModal = ({ hotelId, onClose }) => {
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const response = await getHotelQR(hotelId);
                setQrData(response.data);
            } catch (error) {
                console.error('Error fetching QR:', error);
            } finally {
                setLoading(false);
            }
        };
        if (hotelId) fetchQR();
    }, [hotelId]);

    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print QR Code</title>');
        printWindow.document.write('</head><body style="text-align:center; font-family: sans-serif;">');
        printWindow.document.write('<h1>Scan to Discover Entertainment</h1>');
        printWindow.document.write('<p>Use your phone camera to scan the QR code below.</p>');
        printWindow.document.write(`<img src="${qrData.qrCode}" style="width: 300px; height: 300px;" />`);
        printWindow.document.write(`<p style="color:gray;">${qrData.url}</p>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    if (!hotelId) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
                >
                    &times;
                </button>
                <h3 className="text-xl font-bold mb-4 text-center">Hotel QR Code</h3>

                {loading ? (
                    <div className="text-center py-8">Generating QR...</div>
                ) : qrData ? (
                    <div className="flex flex-col items-center">
                        <img src={qrData.qrCode} alt="Hotel QR Code" className="w-64 h-64 mb-4" />
                        <p className="text-sm text-gray-500 mb-6 text-center break-all">{qrData.url}</p>
                        <button
                            onClick={handlePrint}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                            </svg>
                            Print QR Code
                        </button>
                    </div>
                ) : (
                    <p className="text-red-500 text-center">Failed to load QR Code.</p>
                )}
            </div>
        </div>
    );
};

export default HotelQRModal;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const ScanQR = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleTakePhoto = (dataUri) => {
        // In a real app with pure QR library, we would decode here.
        // For this demo with 'react-html5-camera-photo', we simulate a scan
        // In reality, you'd use 'react-qr-reader' or similar which decodes stream.
        // Assuming the user points at a readable QR (which contains a URL like /hotel/123)

        console.log('Photo taken');
        // Mock success for demo
        setTimeout(() => {
            // Simulate finding a hotel ID from QR
            const hotelId = '678f40194884241eac84045f';
            navigate(`/hotel/${hotelId}`);
        }, 1000);
    };

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 bg-gray-900 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white mb-6">Scan Hotel QR Code</h1>
            <div className="w-full max-w-md bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative">
                <Camera
                    onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                    idealFacingMode="environment"
                />
                <div className="absolute inset-0 border-2 border-primary opacity-50 pointer-events-none rounded-xl"></div>

                {/* Overlay text */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/50 py-2">
                    Point camera at QR code
                </div>
            </div>
            <p className="text-gray-400 mt-6 text-center max-w-xs">
                Scan the QR code in your hotel room to instantly load the channel guide.
            </p>
            <button onClick={() => navigate('/')} className="mt-8 text-white underline">
                Cancel
            </button>
        </div>
    );
};

export default ScanQR;

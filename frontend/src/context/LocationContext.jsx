import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
    const [country, setCountry] = useState('Unknown');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to auto-detect location on mount
        detectLocation();
    }, []);

    const detectLocation = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://ipapi.co/json/');
            if (response.data && response.data.country_name) {
                setCountry(response.data.country_name);
            }
        } catch (error) {
            console.warn('Location detection failed:', error);
            setCountry('Unknown');
        } finally {
            setLoading(false);
        }
    };

    const detectBrowserLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    // Reverse geocoding (mock or real if you had an API key)
                    // For now, let's look up the country code via a free API or just set a "Detected" state
                    // Since we don't have a paid reverse geocoding API, we'll try to refine the ipapi result 
                    // or just re-run the IP check effectively "refreshing" it.
                    // BUT, to give the user feedback "give some location", let's try to get the country from coordinates if possible.
                    // Using a free reverse geocoding endpoint: bigdatacloud.net
                    try {
                        const { latitude, longitude } = position.coords;
                        const res = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                        if (res.data && res.data.countryName) {
                            setCountry(res.data.countryName);
                        }
                    } catch (err) {
                        console.error("Reverse geocoding failed", err);
                        // Fallback to IP
                        detectLocation();
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error("Geolocation error", error);
                    setLoading(false);
                    alert("Location access denied or unavailable.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };

    const manualSelectCountry = (selectedCountry) => {
        setCountry(selectedCountry);
    };

    return (
        <LocationContext.Provider value={{ country, loading, detectLocation, detectBrowserLocation, manualSelectCountry }}>
            {children}
        </LocationContext.Provider>
    );
};

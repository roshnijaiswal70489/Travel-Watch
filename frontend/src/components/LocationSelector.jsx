import React, { useContext } from 'react';
import { LocationContext } from '../context/LocationContext';

const LocationSelector = () => {
    const { country, manualSelectCountry, loading } = useContext(LocationContext);

    const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Germany', 'France'];

    return (
        <div className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded shadow-sm border">
            <span className="font-semibold">Region:</span>
            {loading ? (
                <span className="animate-pulse">Detecting...</span>
            ) : (
                <select
                    value={country}
                    onChange={(e) => manualSelectCountry(e.target.value)}
                    className="border-none bg-transparent focus:ring-0 cursor-pointer font-medium text-blue-600"
                >
                    <option value="Unknown" disabled>Select</option>
                    {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                    {!countries.includes(country) && country !== 'Unknown' && (
                        <option value={country}>{country}</option>
                    )}
                </select>
            )}
        </div>
    );
};

export default LocationSelector;

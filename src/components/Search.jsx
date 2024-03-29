import React, { useState, useEffect } from 'react';
import API_KEY from './ApiKey';
import axios from 'axios';
import Loading from './Loading';
import { toast } from 'react-toastify';

const Search = () => {
    const [location, setLocation] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // handleSearch is get location of device and fetch data from api
    const handleSearch = async () => {
    
        setLoading(true);
        try {
            const response = await axios.get(`https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${API_KEY}`

            );
            if (!response) {
                toast.error("unable to fetch the data")

                throw new Error('Failed to fetch weather data');
            }
            setTemperature(response?.data);
            setLoading(false);
        } catch (error) {
            toast.error("unable to fetch the data")
            setLoading(false);

            setError(error.message);
        }
    };

    return (
        <div className="mt-32 text-center bg-pink-200">
            <h2 className="text-xl font-semibold mb-4">Real-Time Weather</h2>
            <div className="flex mb-4 justify-center">
                <input
                    type="text"
                    className="border border-gray-300 p-2 mr-2"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            {/* Loading Spinner */}
            {loading && <div><Loading /></div>}
            {error && <div className='text-cente bg-red-600'>Error: {error}</div>}
            {temperature !== null && (
                <div>
                    <p>Location: {location}</p>
                    <p className="text-3xl font-bold">{temperature?.data?.values?.temperature}°C</p>
                </div>
            )}
        </div>
    );
};

export default Search;

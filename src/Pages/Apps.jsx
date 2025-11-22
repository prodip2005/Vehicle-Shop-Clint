import React, { useEffect, useState } from 'react';

import App from './App';
import { FaSort } from 'react-icons/fa'; // Icon for sorting
import axios from 'axios';

const Apps = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/allVehicles')
            .then(res => {
                console.log('Get all data', res.data);
                setData(res.data)

            })
    }, [])

    const [sortType, setSortType] = useState("");

    // --- Sorting Logic ---
    const sortedData = [...data].sort((a, b) => {
        // Filter by Category
        if (sortType === "SUVs") return a.category === "SUV" ? -1 : 1;
        if (sortType === "Electric") return a.category === "Electric" ? -1 : 1;
        if (sortType === "Vans") return a.category === "Van" ? -1 : 1;
        if (sortType === "Sedans") return a.category === "Sedan" ? -1 : 1;

        // Sort by Price (Low to High)
        if (sortType === "price") return a.pricePerDay - b.pricePerDay;

        // Sort by Ratings (High to Low)
        if (sortType === "ratings") return b.ratings - a.ratings;

        return 0; // Maintain original order if no sort selected
    });

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12">

            {/* --- Header and Sorting Controls --- */}
            <header className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
                <h1
                    className="
    text-3xl sm:text-5xl font-extrabold 
    bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 
    text-transparent bg-clip-text 
    drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]
    tracking-wide
    animate-pulse
  "
                >
                    Explore Our Premium Fleet: {data.length}
                </h1>



                {/* Modern Select Dropdown */}
                <div className="relative w-full max-w-xs">
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className="
                            appearance-none w-full py-3 pl-4 pr-10 border border-blue-400/50 
                            rounded-xl bg-gray-900 text-white shadow-lg focus:ring-2 
                            focus:ring-blue-500 focus:border-blue-500 transition duration-200
                        "
                        value={sortType}
                    >
                        <option value="">Default</option>
                        <optgroup label="By Category">
                            <option value="SUVs">SUVs</option>
                            <option value="Electric">Electric</option>
                            <option value="Vans">Vans</option>
                            <option value="Sedans">Sedans</option>
                        </optgroup>
                        <optgroup label="By Criteria">
                            <option value="price">Price (Low → High)</option>
                            <option value="ratings">Ratings (High → Low)</option>
                        </optgroup>
                    </select>
                    {/* Custom Arrow Icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-400">
                        <FaSort className="h-5 w-5" />
                    </div>
                </div>
            </header>

            {/* --- Vehicle Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {sortedData.map(singleData => (
                    <App key={singleData.id} singleData={singleData} />
                ))}
            </div>

            {/* No Data Message (Optional) */}
            {sortedData.length === 0 && (
                <p className="text-center text-xl text-gray-400 mt-10">
                    No vehicles found matching the criteria.
                </p>
            )}
        </div>
    );
};

export default Apps;
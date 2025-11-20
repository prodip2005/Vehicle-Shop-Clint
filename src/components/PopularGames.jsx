import React from 'react';
import Popular from './Popular';
import { FaFire } from 'react-icons/fa'; // Icon for 'Popular' section

const PopularGames = ({ data }) => {
    // Ensure data is an array before spreading
    const dataArray = Array.isArray(data) ? data : [];

    // --- Sorting Logic ---
    const topRated = [...dataArray]
        .sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings))
        .slice(0, 6);

    return (
        <div className='py-8 sm:py-12'>

            {/* --- Section Header with Shine Effect --- */}
            <div className="relative bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden mb-8 sm:mb-12">

                {/* Shine Animation - Use CSS for the actual animation */}
                <div className="absolute inset-0 
                    before:absolute before:top-0 before:left-[-75%] before:w-[50%] before:h-full 
                    before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent 
                    before:-skew-x-[25deg] before:animate-shine-effect">
                </div>

                <h2 className="relative flex items-center justify-center text-3xl sm:text-4xl md:text-5xl text-center font-extrabold italic 
                    bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent 
                    drop-shadow-[0_0_15px_rgba(150,200,255,0.7)]">
                    <FaFire className="text-red-500 mr-3 h-8 w-8 sm:h-10 sm:w-10" />
                    Top Rated Vehicles
                </h2>
            </div>

            {/* --- Vehicle Grid --- */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                {
                    topRated.map(popularApp => <Popular key={popularApp.id} popularApp={popularApp} />)
                }
            </div>

            {/* No Data Message (Optional) */}
            {topRated.length === 0 && (
                <p className="text-center text-xl text-gray-400 mt-10">
                    No popular vehicles available to display.
                </p>
            )}

        </div>
    );
};

export default PopularGames;
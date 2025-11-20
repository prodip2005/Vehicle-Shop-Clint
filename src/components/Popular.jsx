import React from "react";
// Link imported from 'react-router-dom' for modern use
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaDollarSign, FaStar, FaCar, FaEdit } from 'react-icons/fa'; // Added FaEdit icon

// added 'currentUserEmail' as a prop to check ownership
const Popular = ({ popularApp, currentUserEmail }) => {
    // Destructuring with default values for safety
    const {
        _id,
        vehicleName,
        coverImage,
        category,
        description,
        ratings,
        pricePerDay,
        location,
        userEmail // Assuming vehicle owner's email is in data
    } = popularApp || {};

    if (!popularApp) return null;

    // Check if the current logged-in user is the owner of this vehicle
    const isOwner = currentUserEmail && currentUserEmail === userEmail;

    return (
        <motion.div
            // Animation for a subtle lift and interaction
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}

            // Modern, Dark-Themed Glass Morphism Style
            className="
                relative p-4 sm:p-6 rounded-2xl shadow-xl backdrop-blur-sm bg-white/5 border border-white/20 
                transform transition duration-300 ease-in-out hover:shadow-2xl hover:border-blue-400/50
                w-full md:w-full mx-auto text-gray-100 flex flex-col
            "
        >
            {/* --- Main Link Block --- */}
            <Link to={`/details/${_id}`} className="block flex-grow">
                {/* --- Vehicle Image --- */}
                <figure className="relative overflow-hidden rounded-xl mb-4 sm:mb-6 aspect-video">
                    <img
                        src={coverImage}
                        alt={vehicleName}
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                    {/* Category Tag Overlay */}
                    <span className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white font-bold px-3 py-1 rounded-full text-xs sm:text-sm shadow-md flex items-center gap-1">
                        <FaCar className="h-3 w-3" /> {category}
                    </span>
                </figure>

                {/* --- Card Body --- */}
                <div className="card-body items-start text-left p-0">

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug">
                        {vehicleName}
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-300 line-clamp-3 mb-3">
                        {description}
                    </p>

                    {/* Meta Data */}
                    <div className="w-full space-y-2 mt-2 pt-3 border-t border-white/10">
                        {/* Price */}
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400 flex items-center">
                                <FaDollarSign className="mr-1 h-4 w-4 text-green-400" />
                                Price/day:
                            </p>
                            <span className="font-bold text-lg text-green-400">${pricePerDay}</span>
                        </div>

                        {/* Location */}
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400 flex items-center">
                                <FaMapMarkerAlt className="mr-1 h-4 w-4 text-red-400" />
                                Location:
                            </p>
                            <span className="font-medium text-white">{location}</span>
                        </div>

                        {/* Ratings - Highly Visible */}
                        <div className="flex justify-between items-center pt-2">
                            <p className="text-sm text-gray-400 flex items-center">
                                <FaStar className="mr-1 h-4 w-4 text-yellow-400" />
                                Ratings: 
                            </p>
                            <span className="font-extrabold text-xl text-yellow-400">{ratings}</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* --- Action Button (Update) --- */}
            
                
            
        </motion.div>
    );
};

export default Popular;
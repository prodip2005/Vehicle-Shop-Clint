import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStar, FaCar, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

const Popular = ({ popularApp }) => {
    const {
        _id,
        vehicleName,
        coverImage,
        category,
        description,
        ratings,
        pricePerDay,
        location,
    } = popularApp || {};

    if (!popularApp) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative h-[530px] w-full bg-base-100 rounded-[3rem] border border-base-content/10 flex flex-col overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl"
        >
            {/* --- Media Container --- */}
            <div className="relative h-60 overflow-hidden m-3 rounded-[2.5rem]">
                <motion.img
                    src={coverImage}
                    alt={vehicleName}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                />

                {/* কালার ১: Primary (Category Tag) */}
                <div className="absolute top-4 left-4">
                    <div className="bg-primary text-primary-content px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                        <FaCar /> {category}
                    </div>
                </div>

                {/* কালার ২: Secondary (Rating Badge) */}
                <div className="absolute top-4 right-4">
                    <div className="bg-secondary text-secondary-content px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-white/10">
                        <FaStar className="text-[10px]" />
                        <span className="text-[11px] font-black">{ratings}</span>
                    </div>
                </div>
            </div>

            {/* --- Content Container --- */}
            <div className="px-8 pb-8 pt-4 flex flex-col flex-grow">

                {/* Title & Badge */}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-[1000] tracking-tighter text-base-content group-hover:text-primary transition-colors duration-300 uppercase italic">
                        {vehicleName}
                    </h3>
                </div>

                {/* কালার ৩: Accent (Feature Line) */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-8 bg-accent rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Premium Choice</span>
                </div>

                <p className="text-sm text-base-content/60 font-medium line-clamp-2 leading-relaxed mb-6">
                    {description}
                </p>

                {/* Pricing Block - Solid Clean Look */}
                <div className="mb-6 flex items-center justify-between p-4 bg-base-200 rounded-[2rem] border border-base-content/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase opacity-40">Daily Rate</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-base-content">${pricePerDay}</span>
                            <span className="text-[10px] font-bold opacity-40">/day</span>
                        </div>
                    </div>
                    {/* কালার ১: Primary Icon */}
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <FaShieldAlt size={18} />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* কালার ২: Secondary Icon Container */}
                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                            <FaMapMarkerAlt size={14} />
                        </div>
                        <span className="text-[11px] font-bold text-base-content/70 truncate max-w-[100px]">{location}</span>
                    </div>

                    <Link to={`/details/${_id}`}>
                        <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            // কালার ৩: Accent Button
                            className="btn btn-accent btn-sm rounded-full px-5 font-black uppercase tracking-tighter text-[11px] h-10 shadow-lg shadow-accent/20"
                        >
                            Explore <FaArrowRight className="ml-2" />
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Subtle Hover Decoration (No heavy gradient) */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </motion.div>
    );
};

export default Popular;
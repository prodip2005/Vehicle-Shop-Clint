import React from 'react';
import { Link } from 'react-router';
import { FiStar, FiArrowRight, FiActivity, FiZap, FiTarget } from 'react-icons/fi';
import { motion } from 'framer-motion';

const App = ({ singleData }) => {
    if (!singleData) return null;
    const { _id, vehicleName, coverImage, category, pricePerDay, ratings } = singleData;

    return (
        <motion.div
            whileHover={{ y: -15 }}
            className="group relative bg-base-100 rounded-[3.5rem] overflow-hidden border border-base-content/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] hover:shadow-primary/20 transition-all duration-700"
        >
            <Link to={`/details/${_id}`}>
                {/* --- Image Section --- */}
                <div className="relative h-80 w-full overflow-hidden p-3">
                    <img
                        src={coverImage}
                        alt={vehicleName}
                        className="h-full w-full object-cover rounded-[3rem] transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* কালার ১: Primary (Floating Price Badge) */}
                    <div className="absolute top-8 right-8 bg-primary text-primary-content px-5 py-2 rounded-2xl shadow-2xl shadow-primary/40 transform -rotate-3 group-hover:rotate-0 transition-transform">
                        <span className="text-xl font-black italic">${pricePerDay}</span>
                        <span className="text-[8px] font-bold block leading-none opacity-80">PER DAY</span>
                    </div>

                    {/* কালার ২: Secondary (Category Tag) */}
                    <div className="absolute bottom-8 left-8">
                        <div className="bg-secondary/90 backdrop-blur-xl text-secondary-content px-5 py-2 rounded-full flex items-center gap-2 border border-white/10 shadow-xl">
                            <FiActivity size={14} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{category}</span>
                        </div>
                    </div>
                </div>

                {/* --- Content Section --- */}
                <div className="px-10 pb-10 pt-4 relative">

                    {/* কালার ৩: Accent (Status Indicator) */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    className={`text-[10px] ${i < Math.floor(ratings) ? 'text-accent fill-accent' : 'text-base-content/10'}`}
                                />
                            ))}
                        </div>
                        <span className="h-px w-8 bg-base-content/10" />
                        <span className="text-[10px] font-black text-accent uppercase tracking-widest">Top Performance</span>
                    </div>

                    <h3 className="text-3xl font-[1000] tracking-tighter text-base-content uppercase italic leading-none group-hover:text-primary transition-colors duration-500 mb-6">
                        {vehicleName}
                    </h3>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between pt-6 border-t border-base-content/5">
                        <div className="flex items-center gap-4">
                            {/* কালার ২: Secondary Circle Icon */}
                            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                                <FiTarget size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">Vehicle ID</span>
                                <span className="text-xs font-bold text-base-content/60">#{_id.slice(-5).toUpperCase()}</span>
                            </div>
                        </div>

                        {/* কালার ১: Primary Action Button */}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-14 h-14 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-[-45deg] transition-all duration-500"
                        >
                            <FiArrowRight size={24} />
                        </motion.div>
                    </div>
                </div>

                {/* Subtle Multi-color Glow on Hover */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </Link>
        </motion.div>
    );
};

export default App;
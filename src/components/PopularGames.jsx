import React from 'react';
import Popular from './Popular';
import { FaFire } from 'react-icons/fa';
import { FiTarget, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PopularGames = ({ data }) => {
    const dataArray = Array.isArray(data) ? data : [];

    const topRated = [...dataArray]
        .sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings))
        .slice(0, 8);

    return (
        <div className='py-12 sm:py-20'>

            {/* --- Section Header: Multi-Color & Premium Look --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-base-100/40 backdrop-blur-3xl border border-base-content/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rounded-[4rem] p-10 sm:p-20 overflow-hidden mb-24"
            >
                {/* 🌈 Background Glows (Color 2: Secondary & Color 3: Accent) */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] -z-10" />

                {/* 💎 Dynamic Shine Effect */}
                <motion.div
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12 pointer-events-none"
                />

                <div className="relative z-10 flex flex-col items-center">

                    {/* Floating Icons with 3 Colors */}
                    <div className="flex items-center gap-6 mb-8">
                        {/* Accent (Color 3) */}
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="hidden sm:block opacity-30 text-accent">
                            <FiTarget size={30} />
                        </motion.div>

                        {/* Primary (Color 1) */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="p-6 bg-primary/10 rounded-[2.5rem] shadow-2xl border border-primary/20"
                        >
                            <FaFire className="text-primary h-12 w-12" />
                        </motion.div>

                        {/* Secondary (Color 2) */}
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} className="hidden sm:block opacity-30 text-secondary">
                            <FiZap size={30} />
                        </motion.div>
                    </div>

                    {/* Main Title: Using Primary & Base-Content */}
                    <h2 className="text-5xl md:text-7xl font-[1000] text-center tracking-tighter text-base-content mb-8 uppercase leading-none">
                        Top Rated <span className="text-primary italic">Vehicles</span>
                    </h2>

                    {/* Badge Style Divider: Using Secondary & Accent */}
                    <div className="flex items-center gap-4 bg-base-200/50 px-8 py-3 rounded-full border border-base-content/5">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <p className="text-base-content/60 font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs">
                            <span className="text-secondary">Luxury</span> · <span className="text-accent">Exclusive</span> · Collection
                        </p>
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    </div>
                </div>
            </motion.div>

            {/* --- Grid Section with Staggered Animation --- */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12'
            >
                {topRated.map((popularApp) => (
                    <motion.div
                        key={popularApp._id}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -15, scale: 1.02 }}
                        className="transition-all duration-500"
                    >
                        {/* কার্ডের পেছনে হালকা গ্লো ইফেক্ট */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative">
                                <Popular popularApp={popularApp} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {topRated.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-40 bg-base-200/50 rounded-[4rem] border border-dashed border-base-content/20"
                >
                    <div className="text-6xl mb-6 opacity-20 italic font-black text-secondary">EMPTY</div>
                    <p className="text-base-content/40 font-bold uppercase tracking-[0.8em] text-xs">
                        Garage Awaiting New Arrivals
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default PopularGames;
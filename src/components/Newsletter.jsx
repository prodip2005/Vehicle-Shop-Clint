import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { FiSend, FiShield, FiStar } from 'react-icons/fi';

const Newsletter = () => {
    return (
        <section className="relative overflow-hidden py-20 md:py-32 px-6 text-center bg-transparent">

            {/* --- ৩টি কালারের গ্লো (Background Elements) --- */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto">

                {/* কালার ১: Primary (Main Icon) */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center p-8 bg-base-100/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-primary/20 mb-12 relative group"
                >
                    <div className="absolute inset-0 bg-primary/5 rounded-[3rem] scale-110 group-hover:scale-125 transition-transform duration-500" />
                    <HiOutlineMailOpen className="text-6xl text-primary relative z-10" />
                </motion.div>

                {/* কালার ২: Secondary (Highlight Text) */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-[1000] tracking-[ -0.05em] mb-8 text-base-content leading-none uppercase"
                >
                    Stay in the <span className="text-secondary italic">Fast Lane</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-base-content/60 text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-16 leading-relaxed"
                >
                    Get exclusive first access to our latest <span className="text-accent">luxury arrivals</span> and premium automotive news.
                </motion.p>

                {/* Form: ৩টি কালারের ছোঁয়া সহ */}
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-3xl mx-auto p-3 bg-base-100 border-2 border-base-content/10 rounded-[2.5rem] sm:rounded-full shadow-2xl focus-within:border-primary/50 transition-all"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="relative w-full flex items-center pl-6">
                        {/* কালার ৩: Accent (Input Icon) */}
                        <FiStar className="text-accent text-xl mr-3" />
                        <input
                            type="email"
                            placeholder='yourname@premium.com'
                            className='w-full py-4 bg-transparent text-base-content outline-none font-bold placeholder:text-base-content/20'
                        />
                    </div>

                    {/* কালার ১: Primary Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="btn btn-primary btn-lg w-full sm:w-auto px-10 rounded-full font-[1000] uppercase tracking-tighter text-base shadow-xl shadow-primary/30 h-16"
                    >
                        Join Now <FiSend className="ml-2" />
                    </motion.button>
                </motion.form>

                {/* কালার ২: Secondary (Security Tags) */}
                <div className="flex flex-wrap justify-center gap-8 mt-16">
                    <div className="flex items-center gap-2 opacity-40">
                        <FiShield className="text-secondary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-40">
                        <FiStar className="text-accent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">No Spam</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-40">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Pure Luxury</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
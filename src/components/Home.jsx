import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import PopularGames from './PopularGames';
import Newsletter from './Newsletter';
import axios from 'axios';
import { motion, useScroll, useSpring } from 'framer-motion';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        setLoading(true);
        axios.get('https://vehicle-hub-server-delta.vercel.app/allVehicles')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-base-100 text-base-content overflow-x-hidden transition-colors duration-500 scroll-smooth">

            {/* 💎 PROGRESS BAR - কালার ১: Primary */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-[0%] bg-primary shadow-[0_0_10px_oklch(var(--p))] pointer-events-none"
                style={{ scaleX }}
            />

            {/* 🌈 DYNAMIC OVERLAY - কালার ১, ২ ও ৩ (Primary, Secondary, Accent) এর সমন্বয় */}
            <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 20%, oklch(var(--p)/0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 80%, oklch(var(--s)/0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 50%, oklch(var(--a)/0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 20%, oklch(var(--p)/0.15) 0%, transparent 50%)",
                        ],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full opacity-60"
                />

                {/* Floating Orbs - কালার ২: Secondary */}
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"
                />

                {/* Floating Orbs - কালার ৩: Accent */}
                <motion.div
                    animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
                />
            </div>

            <main className="relative z-10">
                <section><Banner /></section>

                <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">

                    <section className="py-20 md:py-32">
                        <div className="text-center mb-24 relative">
                            {/* কালার ৩: Accent (Background Text) */}
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-[12rem] font-black opacity-[0.05] text-accent pointer-events-none uppercase tracking-tighter -z-10 select-none">
                                Premium
                            </span>

                            {/* কালার ১: Primary (Tag) */}
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-block mb-6 text-xs font-bold text-primary uppercase tracking-[0.5em] bg-primary/10 px-6 py-2 rounded-full border border-primary/20"
                            >
                                Executive Showroom
                            </motion.span>

                            {/* Title with Primary & Secondary mix */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-[900] tracking-tighter leading-tight mb-8"
                            >
                                Masterpiece <span className="text-secondary italic">Collection</span>
                            </motion.h2>

                            <p className="opacity-70 max-w-3xl mx-auto text-lg md:text-2xl font-light leading-relaxed mb-10">
                                Experience automotive excellence. Our curated fleet combines performance and <span className="text-accent font-bold">ultimate luxury</span>.
                            </p>

                            {/* Decorative line - Multi-color gradient */}
                            <div className="h-1.5 w-32 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full shadow-lg" />
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center py-40">
                                {/* কালার ১: Primary Loader */}
                                <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
                                <p className="mt-6 opacity-50 tracking-widest uppercase text-xs">Loading Garage</p>
                            </div>
                        ) : (
                            <div className="w-full">
                                <PopularGames data={data} />
                            </div>
                        )}
                    </section>

                    {/* Newsletter - Gradient Border with all 3 colors */}
                    <section className="pb-32">
                        <div className="relative p-[1.5px] bg-gradient-to-r from-primary via-secondary to-accent rounded-[4rem] shadow-2xl">
                            <div className="backdrop-blur-3xl bg-base-100/60 rounded-[4rem] overflow-hidden p-2">
                                <Newsletter />
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Edge Borders - কালার ১ & ২ (Primary & Secondary) */}
            <div className="fixed inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none z-50" />
            <div className="fixed inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none z-50" />
        </div>
    );
};

export default Home;
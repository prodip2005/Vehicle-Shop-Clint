import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FiArrowRight, FiPlay } from "react-icons/fi";

// ইমেজ ইমপোর্ট গুলো আগের মতোই থাকবে...
import banner1 from "../assets/imgi_234_cool-car-pictures-2880-x-1800-qwermfx9v113hpiy.jpg";
import banner2 from "../assets/imgi_236_Mercedes-Benz-Vision-AVTR-OEM.jpg";
import banner3 from "../assets/imgi_242_cool-electric-cars-w.jpg";
import banner4 from "../assets/imgi_254_cool-car-pictures-1440-x-900-uan9qyxr2to6d45c.jpg";
import banner5 from "../assets/imgi_259_wp8030372.jpg";

const images = [
    { src: banner1, title: "Next Gen Performance", subtitle: "Experience the thrill of ultimate speed", tag: "Supersport" },
    { src: banner2, title: "Visionary Design", subtitle: "Where luxury meets future innovation", tag: "Concept" },
    { src: banner3, title: "Electric Revolution", subtitle: "Sustainable power for the modern era", tag: "Electric" },
    { src: banner4, title: "Precision Engineering", subtitle: "Crafted for excellence on every road", tag: "Grand Tourer" },
    { src: banner5, title: "Classic Elegance", subtitle: "Timeless aesthetics in every detail", tag: "Vintage" },
];

export default function Banner() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const autoplayRef = useRef(null);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setIndex((prev) => (prev + newDirection + images.length) % images.length);
    };

    useEffect(() => {
        if (prefersReducedMotion || paused) return;
        autoplayRef.current = setInterval(() => paginate(1), 6000);
        return () => clearInterval(autoplayRef.current);
    }, [paused, prefersReducedMotion, index]);

    const sliderVariants = {
        enter: (dir) => ({ opacity: 0, scale: 1.1 }),
        center: { opacity: 1, scale: 1, zIndex: 1 },
        exit: (dir) => ({ opacity: 0, scale: 0.9, zIndex: 0 })
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1, y: 0,
            transition: { delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }
        })
    };

    return (
        <div
            // এখানে bg-[#0a0a0a] এবং text-white যোগ করা হয়েছে যাতে লাইট মোডেও এটি ডার্ক থাকে
            className="relative w-[95%] max-w-[1700px] mx-auto mt-28 overflow-hidden h-[65vh] lg:h-[80vh] rounded-[3.5rem] group border-4 border-white/5 bg-[#0a0a0a] text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence custom={direction} mode="wait">
                <motion.div
                    key={index}
                    custom={direction}
                    variants={sliderVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <motion.img
                        src={images[index].src}
                        alt={images[index].title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 8 }}
                    />

                    {/* ডার্ক গ্রেডিয়েন্ট ওভারলে - যা লাইট মোডেও কন্টেন্ট স্পষ্ট রাখবে */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />

                    <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 lg:px-32 z-20">
                        <div className="max-w-3xl space-y-8 text-white">

                            <motion.div
                                custom={0} variants={contentVariants} initial="hidden" animate="visible"
                                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                                    {images[index].tag}
                                </span>
                            </motion.div>

                            <motion.h2
                                custom={1} variants={contentVariants} initial="hidden" animate="visible"
                                className="text-6xl md:text-9xl font-[1000] leading-[0.85] tracking-tighter"
                            >
                                {images[index].title.split(" ").map((word, i) => (
                                    <span key={i} className={i % 2 !== 0 ? "text-primary italic" : "text-white"}>{word} </span>
                                ))}
                            </motion.h2>

                            <motion.p
                                custom={2} variants={contentVariants} initial="hidden" animate="visible"
                                className="text-lg md:text-2xl text-white/60 font-medium max-w-lg leading-relaxed border-l-4 border-primary pl-6"
                            >
                                {images[index].subtitle}
                            </motion.p>

                            <motion.div
                                custom={3} variants={contentVariants} initial="hidden" animate="visible"
                                className="flex flex-wrap gap-5 pt-6"
                            >
                                <button className="btn btn-primary btn-lg rounded-full px-12 font-black shadow-xl hover:scale-105 transition-all">
                                    Drive Now <FiArrowRight className="ml-2" />
                                </button>

                                <button className="btn btn-outline btn-lg rounded-full px-10 border-white/20 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md">
                                    <FiPlay className="mr-2" /> Showcase
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls - Glassmorphism style */}
            <div className="absolute bottom-12 right-12 flex items-center gap-6 z-30">
                <div className="flex gap-2">
                    <button
                        onClick={() => paginate(-1)}
                        className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary transition-all shadow-xl"
                    >
                        <HiOutlineChevronLeft size={28} />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary transition-all shadow-xl"
                    >
                        <HiOutlineChevronRight size={28} />
                    </button>
                </div>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-12 left-12 flex gap-4 z-30">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className="group relative h-1.5 w-16 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                        onClick={() => setIndex(i)}
                    >
                        {index === i && (
                            <motion.div
                                className="absolute inset-0 bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 6, ease: "linear" }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
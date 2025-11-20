import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import banner1 from "../assets/imgi_234_cool-car-pictures-2880-x-1800-qwermfx9v113hpiy.jpg";
import banner2 from "../assets/imgi_236_Mercedes-Benz-Vision-AVTR-OEM.jpg";
import banner3 from "../assets/imgi_242_cool-electric-cars-w.jpg";
import banner4 from "../assets/imgi_254_cool-car-pictures-1440-x-900-uan9qyxr2to6d45c.jpg";
import banner5 from "../assets/imgi_259_wp8030372.jpg";

const images = [
    { src: banner1, alt: "Car Banner 1" },
    { src: banner2, alt: "Car Banner 2" },
    { src: banner3, alt: "Car Banner 3" },
    { src: banner4, alt: "Car Banner 4" },
    { src: banner5, alt: "Car Banner 5" },
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
        const next = new Image();
        next.src = images[(index + 1) % images.length].src;
        const prev = new Image();
        prev.src = images[(index - 1 + images.length) % images.length].src;
    }, [index]);

    useEffect(() => {
        if (prefersReducedMotion) return;
        if (paused) return;
        autoplayRef.current = setInterval(() => paginate(1), 1500);
        return () => clearInterval(autoplayRef.current);
    }, [paused, prefersReducedMotion, index]);

    useEffect(() => {
        const onVis = () => setPaused(document.hidden);
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") paginate(-1);
            if (e.key === "ArrowRight") paginate(1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({
            x: dir < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    return (
        <div
            className="relative w-full overflow-hidden h-[45vh] sm:h-[55vh] md:h-[70vh] xl:h-[78vh] min-h-[280px] bg-black"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
        >
            <AnimatePresence custom={direction} initial={false}>
                <motion.div
                    key={index}
                    className="absolute inset-0"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.4 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                        if (info.offset.x > 80) paginate(-1);
                        else if (info.offset.x < -80) paginate(1);
                    }}
                >
                    <img
                        src={images[index].src}
                        alt={images[index].alt}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                        draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-linear-to-t from-black/60 to-transparent" />
                </motion.div>
            </AnimatePresence>

            <button
                onClick={() => paginate(-1)}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-black/40 text-white text-2xl sm:text-4xl p-2 sm:p-3 rounded-full"
            >
                ‹
            </button>
            <button
                onClick={() => paginate(1)}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-black/40 text-white text-2xl sm:text-4xl p-2 sm:p-3 rounded-full"
            >
                ›
            </button>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
                {images.map((_, i) => (
                    <motion.button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full ${index === i ? "bg-white" : "bg-white/50"}`}
                        whileHover={{ scale: 1.2 }}
                    />
                ))}
            </div>
        </div>
    );
}

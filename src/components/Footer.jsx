import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaYoutube, FaFacebookF, FaCar, FaInstagram } from 'react-icons/fa';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative w-full pt-20 overflow-hidden bg-base-200/30 border-t border-base-content/5">

            {/* 🌈 ৩টি কালারের ডাইনামিক গ্লো (Background Accents) */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10" />

            <div className="w-full px-6 sm:px-12 lg:px-20">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

                    {/* --- Brand Section (কালার ১: Primary) --- */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-16 h-16 bg-primary flex items-center justify-center rounded-[2rem] shadow-2xl shadow-primary/30">
                                <FaCar className="text-3xl text-primary-content" />
                            </div>
                            <h2 className="text-4xl font-[1000] tracking-tighter text-base-content uppercase italic">
                                Vehicle<span className="text-primary">Hub</span>
                            </h2>
                        </motion.div>
                        <p className="text-base-content/60 text-lg font-medium leading-relaxed max-w-sm">
                            Redefining the art of driving. Explore our curated world of luxury, performance, and future-ready vehicles.
                        </p>

                        {/* Social Buttons: কালার ৩: Accent (Hover) */}
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -8, backgroundColor: 'oklch(var(--a))', color: 'oklch(var(--ac))' }}
                                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-base-100 text-base-content/50 transition-all duration-500 shadow-xl cursor-pointer border border-base-content/5"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* --- Navigation (কালার ২: Secondary Highlights) --- */}
                    <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <h4 className="font-black text-secondary uppercase tracking-[0.3em] text-[10px]">Showroom</h4>
                            {['Hypercars', 'Luxury Sedan', 'Electric', 'Vintage'].map(link => (
                                <a key={link} className="block text-base-content/50 hover:text-primary font-bold transition-all duration-300 text-xs cursor-pointer uppercase tracking-widest">{link}</a>
                            ))}
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-black text-secondary uppercase tracking-[0.3em] text-[10px]">Services</h4>
                            {['Test Drive', 'Customization', 'Financing', 'Insurance'].map(link => (
                                <a key={link} className="block text-base-content/50 hover:text-primary font-bold transition-all duration-300 text-xs cursor-pointer uppercase tracking-widest">{link}</a>
                            ))}
                        </div>
                        <div className="hidden md:block space-y-6">
                            <h4 className="font-black text-secondary uppercase tracking-[0.3em] text-[10px]">Contact</h4>
                            <div className="space-y-4">
                                <p className="flex items-center gap-3 text-xs font-bold text-base-content/50"><FiMapPin className="text-accent" /> DHAKA, BD</p>
                                <p className="flex items-center gap-3 text-xs font-bold text-base-content/50"><FiPhone className="text-accent" /> +880 123 456</p>
                                <p className="flex items-center gap-3 text-xs font-bold text-base-content/50"><FiMail className="text-accent" /> INFO@V-HUB.COM</p>
                            </div>
                        </div>
                    </div>

                    {/* --- কালার ১, ২, ৩ এর মিশেলে 'Back to Top' --- */}
                    <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center">
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="group relative"
                        >
                            {/* Rotating Border with Accent & Secondary */}
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent animate-[spin_10s_linear_infinite] opacity-30"></div>
                            <div className="w-24 h-24 rounded-full bg-base-100 flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-primary/40 relative z-10">
                                <HiOutlineArrowNarrowUp className="text-4xl text-primary group-hover:text-primary-content transition-colors duration-500" />
                            </div>
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-base-content/30 group-hover:text-primary">Top</span>
                        </motion.button>
                    </div>
                </div>

                {/* --- Bottom Footer: Clean Full Width --- */}
                <div className="py-10 border-t border-base-content/5 flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                        <p className="text-[10px] font-black text-base-content/40 tracking-[0.3em] uppercase">
                            © {new Date().getFullYear()} Vehicle Hub — Crafted for <span className="text-base-content">Automotive Excellence</span>
                        </p>
                    </div>

                    {/* কালার ৩: Accent Links */}
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-base-content/40">
                        <a className="hover:text-accent transition-colors cursor-pointer">Privacy Policy</a>
                        <a className="hover:text-accent transition-colors cursor-pointer">Terms of Service</a>
                        <a className="hover:text-accent transition-colors cursor-pointer">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
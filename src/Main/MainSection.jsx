import React from 'react';
import { Outlet, useNavigation, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Newsletter from '../components/Newsletter';
import usePageTitle from '../hooks/usePageTitle';

const MainSection = () => {
    usePageTitle();
    const { state } = useNavigation();
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-base-100 font-['Outfit']">

         

            {/* 2. Animated Background Orbs (Premium Look) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Moving Orb 1 */}
                <motion.div
                    animate={{
                        x: [0, 80, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
                />

                {/* Moving Orb 2 */}
                <motion.div
                    animate={{
                        x: [0, -60, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"
                />
            </div>

            {/* 3. Main Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-24 md:pt-32">
                    {state === 'loading' ? (
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <Loading />
                        </div>
                    ) : (
                        /* Page Transition Animation */
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    )}
                </main>

                <Newsletter />
                <Footer />
            </div>

            {/* 4. Subtle Grain Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}>
            </div>
        </div>
    );
};

export default MainSection;
import React, { useEffect, useState } from 'react';
import App from './App';
import {
    FiSearch, FiZap, FiFilter, FiTrendingUp,
    FiChevronLeft, FiChevronRight, FiStar, FiLayers,
    FiRefreshCcw
} from 'react-icons/fi';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Apps = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- Filter States ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [sortType, setSortType] = useState("");

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // এখানে ৮ সেট করা আছে

    useEffect(() => {
        setLoading(true);
        axios.get('https://vehicle-hub-server-delta.vercel.app/allVehicles')
            .then(res => {
                setData(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // ১. ডাটা ফিল্টারিং
    const filteredResults = data.filter(item => {
        const matchesSearch = (item?.vehicleName || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? item?.category === selectedCategory : true;
        const matchesRating = (item?.ratings || 0) >= minRating;
        return matchesSearch && matchesCategory && matchesRating;
    });

    // ২. সর্টিং
    const sortedResults = [...filteredResults].sort((a, b) => {
        if (sortType === "price-low") return a.pricePerDay - b.pricePerDay;
        if (sortType === "price-high") return b.pricePerDay - a.pricePerDay;
        if (sortType === "top-rated") return b.ratings - a.ratings;
        return 0;
    });

    // ৩. পেজিনেশন লজিক (নিখুঁত ৮টি ডাটা দেখানোর জন্য)
    const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedResults.slice(indexOfFirstItem, indexOfLastItem);

    // ফিল্টার চেঞ্জ হলে পেজ ১-এ ব্যাক করা
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, minRating, sortType]);

    const handleReset = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setMinRating(0);
        setSortType("");
        setCurrentPage(1);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-100 pt-28 pb-20 font-['Outfit']">
            <div className="container mx-auto px-6">

                {/* Header */}
                <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-[1000] tracking-tighter text-base-content uppercase italic leading-none"
                        >
                            Elite <span className="text-primary not-italic opacity-40">Showroom</span>
                        </motion.h1>
                    </div>
                    <div className="bg-base-200 px-6 py-3 rounded-2xl border border-base-content/5">
                        <span className="text-4xl font-[1000] text-primary">{sortedResults.length}</span>
                        <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Units Found</p>
                    </div>
                </header>

                {/* Control Bar */}
                <div className="bg-base-200/50 backdrop-blur-3xl p-4 rounded-[3rem] border border-base-content/10 shadow-2xl space-y-4 mb-16">
                    <div className="relative group">
                        <FiSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-primary text-xl z-10" />
                        <input
                            type="text"
                            value={searchTerm}
                            placeholder="Search by brand or model..."
                            className="w-full h-16 pl-20 pr-8 bg-base-100 text-base-content rounded-[2.5rem] outline-none font-bold text-lg border border-base-content/5 focus:ring-2 ring-primary/20 transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Categories */}
                        <div className="relative flex items-center">
                            <FiLayers className="absolute left-6 text-secondary z-10" />
                            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="select select-bordered w-full h-16 pl-14 rounded-2xl bg-base-100 font-bold uppercase text-[10px] tracking-widest border-base-content/10">
                                <option value="">All Categories</option>
                                <option value="Luxury">Luxury</option>
                                <option value="SUV">SUV</option>
                                <option value="Electric">Electric</option>
                                <option value="Sport">Sport</option>
                            </select>
                        </div>

                        {/* Ratings */}
                        <div className="relative flex items-center">
                            <FiStar className="absolute left-6 text-warning z-10" />
                            <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="select select-bordered w-full h-16 pl-14 rounded-2xl bg-base-100 font-bold uppercase text-[10px] tracking-widest border-base-content/10">
                                <option value="0">Minimum Rating</option>
                                <option value="3">3+ Stars</option>
                                <option value="4">4+ Stars</option>
                                <option value="4.5">4.5+ Stars</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="relative flex items-center">
                            <FiTrendingUp className="absolute left-6 text-primary z-10" />
                            <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="select select-bordered w-full h-16 pl-14 rounded-2xl bg-base-100 font-bold uppercase text-[10px] tracking-widest border-base-content/10">
                                <option value="">Sort By</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="top-rated">Top Rated First</option>
                            </select>
                        </div>

                        {/* Reset */}
                        <button onClick={handleReset} className="h-16 rounded-2xl bg-base-300 hover:bg-error hover:text-white text-base-content font-black uppercase text-[10px] transition-all flex items-center justify-center gap-3 border border-base-content/5">
                            <FiRefreshCcw /> Reset Filters
                        </button>
                    </div>
                </div>

                {/* Grid - এখানে ৮টি আইটেম দেখা যাবে */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {currentItems.map((item) => (
                            <motion.div
                                key={item._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <App singleData={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-20 flex justify-center items-center gap-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="btn btn-circle btn-outline border-base-content/10 hover:bg-primary transition-all"
                        >
                            <FiChevronLeft size={20} />
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-12 h-12 rounded-full font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-base-200 hover:bg-base-300 text-base-content'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="btn btn-circle btn-outline border-base-content/10 hover:bg-primary transition-all"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {currentItems.length === 0 && (
                    <div className="text-center py-40 bg-base-200/30 rounded-[5rem] border-2 border-dashed border-base-content/10">
                        <FiZap size={40} className="mx-auto mb-8 text-primary opacity-20" />
                        <h2 className="text-4xl font-black uppercase opacity-20 italic">No Matching Vehicle</h2>
                        <p className="mt-2 text-xs font-bold uppercase tracking-widest opacity-40">Try resetting your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Apps;
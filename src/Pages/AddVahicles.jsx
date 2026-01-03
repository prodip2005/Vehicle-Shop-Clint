import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import {
    FiPlusSquare, FiImage, FiTag, FiDollarSign,
    FiMapPin, FiStar, FiFileText, FiCalendar, FiUser, FiLayers
} from 'react-icons/fi';

const AddVahicles = () => {
    const { user } = useContext(AuthContext);

    const handleAddVehicle = (e) => {
        e.preventDefault();
        const form = e.target;

        const newdata = {
            vehicleName: form.vehicleName.value,
            owner: form.owner.value,
            category: form.category.value,
            pricePerDay: parseFloat(form.pricePerDay.value),
            location: form.location.value,
            availability: form.availability.value === "true",
            description: form.description.value,
            coverImage: form.coverImage.value,
            userEmail: form.userEmail.value,
            createdAt: form.createdAt.value,
            ratings: parseFloat(form.ratings.value)
        };

        axios.post('https://vehicle-hub-server-delta.vercel.app/allVehicles', newdata)
            .then(() => {
                Swal.fire({
                    title: '<span style="font-weight:900; letter-spacing:-1px;">LISTING DEPLOYED</span>',
                    text: "Your vehicle is now live in the global showroom.",
                    icon: "success",
                    background: 'oklch(var(--b1))',
                    color: 'oklch(var(--bc))',
                    confirmButtonColor: 'oklch(var(--p))',
                    customClass: {
                        popup: 'rounded-[2rem] border-2 border-primary/10',
                        confirmButton: 'rounded-full px-10 py-3 font-black uppercase text-xs tracking-widest'
                    }
                });
                form.reset();
            })
            .catch(() => {
                Swal.fire({ icon: 'error', title: 'SYSTEM OVERHEAT', text: 'Something went wrong!' });
            });
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-5xl mx-auto py-6 font-['Outfit']"
        >
            {/* --- Header Section --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-12 bg-secondary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Fleet Registry</span>
                    </div>
                    <h2 className="text-6xl font-[1000] tracking-tighter uppercase italic leading-none text-base-content">
                        Register <br /> <span className="text-primary not-italic opacity-40">New Asset</span>
                    </h2>
                </div>

                <div className="bg-accent/10 p-6 rounded-[2rem] border border-accent/20 max-w-xs">
                    <div className="flex items-center gap-2 text-accent mb-2">
                        <FiStar size={14} className="fill-accent" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Protocol</span>
                    </div>
                    <p className="text-[11px] font-bold text-base-content/70 leading-relaxed">Ensure all specifications are verified before deploying to the public showroom.</p>
                </div>
            </div>

            {/* --- Form Section --- */}
            <div className="bg-base-100 p-8 md:p-16 rounded-[3.5rem] shadow-2xl shadow-base-content/5 border border-base-content/10 relative overflow-hidden">
                <form onSubmit={handleAddVehicle} className="space-y-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                        {/* Vehicle Name */}
                        <div className="form-control">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/60 mb-2">Vehicle Specification</label>
                            <div className="relative group">
                                <FiTag className="absolute left-6 top-1/2 -translate-y-1/2 text-primary z-10" />
                                <input required type="text" name="vehicleName" placeholder="e.g. BMW M4 COMPETITION" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200 text-base-content border-base-content/10 focus:border-primary focus:ring-2 focus:ring-primary/20 font-bold uppercase tracking-tight" />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="form-control">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/60 mb-2">Category Segment</label>
                            <div className="relative">
                                <FiLayers className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary z-10" />
                                <select name="category" className="select select-bordered w-full h-16 pl-16 rounded-2xl bg-base-200 text-base-content border-base-content/10 focus:border-secondary font-black uppercase tracking-widest text-xs">
                                    <option value="Luxury">Luxury</option>
                                    <option value="Electric">Electric</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="Sport">Sport</option>
                                </select>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="form-control">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/60 mb-2">Daily Subscription Rate ($)</label>
                            <div className="relative">
                                <FiDollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-primary z-10" />
                                <input required type="number" name="pricePerDay" placeholder="0.00" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200 text-base-content border-base-content/10 focus:border-primary font-[1000] text-xl tracking-tighter" />
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="form-control">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/60 mb-2">Market Rating Index</label>
                            <div className="relative">
                                <FiStar className="absolute left-6 top-1/2 -translate-y-1/2 text-accent z-10" />
                                <input required type="number" step="0.1" max="5" name="ratings" placeholder="5.0" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200 text-base-content border-base-content/10 focus:border-accent font-bold" />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="form-control md:col-span-2">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/60 mb-2">Visual Asset URL</label>
                            <div className="relative">
                                <FiImage className="absolute left-6 top-1/2 -translate-y-1/2 text-primary z-10" />
                                <input required type="text" name="coverImage" placeholder="https://source-visual.com/..." className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200 text-base-content border-base-content/10 focus:border-primary font-medium" />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="form-control">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/60 mb-2">Deployment Hub</label>
                            <div className="relative">
                                <FiMapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary z-10" />
                                <input type="text" name="location" placeholder="City, Station" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200 text-base-content border-base-content/10 focus:border-secondary font-bold uppercase text-xs tracking-widest" />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="form-control">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/60 mb-2">Entry Timestamp</label>
                            <div className="relative">
                                <FiCalendar className="absolute left-6 top-1/2 -translate-y-1/2 text-accent z-10" />
                                <input required type="date" name="createdAt" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200 text-base-content border-base-content/10 focus:border-accent font-bold uppercase text-xs" />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-control md:col-span-2">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/60 mb-2">Performance Description</label>
                            <div className="relative">
                                <FiFileText className="absolute left-6 top-6 text-primary z-10" />
                                <textarea name="description" placeholder="Specify engine details, interior luxury, and safety protocols..." className="textarea textarea-bordered w-full pl-16 pt-6 h-40 rounded-[2.5rem] bg-base-200 text-base-content border-base-content/10 focus:border-primary font-medium leading-relaxed" />
                            </div>
                        </div>

                        {/* Admin Display (Read-only) */}
                        <div className="form-control">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-2">Listing Agent</label>
                            <div className="relative">
                                <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-base-content opacity-30 z-10" />
                                <input readOnly defaultValue={user?.displayName || "Authorized Dealer"} type="text" name="owner" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-300 border-none font-black text-xs uppercase tracking-widest text-base-content/50" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-[11px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-2">Verified Endpoint</label>
                            <input readOnly defaultValue={user?.email} type="email" name="userEmail" className="input input-bordered w-full h-16 rounded-2xl bg-base-300 border-none font-bold text-xs italic text-base-content/50 px-8" />
                        </div>
                    </div>

                    <div className="hidden">
                        <input type="text" name="availability" defaultValue="true" />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button type="submit" className="group w-full h-24 bg-primary text-primary-content rounded-[2.5rem] font-black text-2xl uppercase tracking-[0.3em] italic shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-6 overflow-hidden">
                            Deploy Asset
                            <div className="bg-white/20 p-3 rounded-full group-hover:rotate-90 transition-transform duration-500">
                                <FiPlusSquare size={24} />
                            </div>
                        </button>
                        <p className="text-center mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-base-content/30">Secure encrypted listing protocol active</p>
                    </div>

                </form>
            </div>
        </motion.div>
    );
};

export default AddVahicles;
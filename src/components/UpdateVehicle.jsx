import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FiEdit, FiRefreshCw, FiArrowLeft, FiImage, FiSettings, FiTag, FiDollarSign, FiLayers, FiShield, FiMapPin, FiStar } from 'react-icons/fi';

const UpdateVehicle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://vehicle-hub-server-delta.vercel.app/allVehicles/${id}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleUpdateVehicle = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
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

        axios.put(`https://vehicle-hub-server-delta.vercel.app/allVehicles/${id}`, updatedData)
            .then(() => {
                Swal.fire({
                    title: '<span style="font-weight:900; letter-spacing:-1px;">SPECIFICATIONS UPDATED</span>',
                    text: "Vehicle synchronization complete.",
                    icon: "success",
                    background: 'oklch(var(--b1))',
                    color: 'oklch(var(--bc))',
                    confirmButtonColor: 'oklch(var(--p))',
                    customClass: {
                        popup: 'rounded-[2rem] border-2 border-primary/10',
                        confirmButton: 'rounded-full px-8 py-3 font-black uppercase text-xs tracking-widest'
                    }
                });
                navigate('/dashboard/myVehicles');
            })
            .catch(() => {
                Swal.fire({ icon: 'error', title: 'SYNC FAILED', text: 'Error communicating with core server.' });
            });
    };

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-16 h-1 bg-primary animate-pulse" />
            <p className="mt-6 font-black text-[10px] tracking-[0.8em] text-primary uppercase">Accessing Node</p>
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto py-4">

            {/* --- কালার ২: Secondary Header --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                <div className="space-y-4">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary hover:translate-x-[-5px] transition-transform">
                        <FiArrowLeft /> Return to Garage
                    </button>
                    <h2 className="text-6xl font-[1000] tracking-tighter uppercase italic leading-none">
                        Refurbish <br /> <span className="text-primary not-italic opacity-20">Specifications</span>
                    </h2>
                </div>

                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 hidden lg:block">
                    <FiSettings className="animate-spin-slow text-primary" size={32} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* --- Left: Preview Panel (কালার ৩: Accent Focus) --- */}
                <div className="lg:col-span-4 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-base-100 rounded-[3rem] overflow-hidden border border-base-content/5 shadow-2xl relative group"
                    >
                        <div className="h-64 overflow-hidden relative">
                            <img src={data?.coverImage} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <span className="bg-accent text-accent-content px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Live Asset</span>
                            </div>
                        </div>
                        <div className="p-8 space-y-4">
                            <h3 className="text-3xl font-[1000] uppercase italic tracking-tighter text-base-content leading-none">{data?.vehicleName}</h3>
                            <div className="flex items-center gap-2 opacity-40 text-xs font-bold uppercase tracking-widest">
                                <FiMapPin className="text-secondary" /> {data?.location}
                            </div>
                            <div className="pt-6 border-t border-base-content/5 flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] font-black opacity-30 uppercase tracking-widest">Rate Per Cycle</p>
                                    <p className="text-3xl font-[1000] text-primary tracking-tighter">${data?.pricePerDay}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black opacity-30 uppercase tracking-widest">Reliability</p>
                                    <p className="text-xl font-black text-accent">{data?.ratings} <span className="text-xs opacity-40">/ 5.0</span></p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="p-8 bg-accent/5 rounded-[2.5rem] border border-accent/10">
                        <div className="flex items-center gap-3 mb-4 text-accent">
                            <FiShield size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest italic">Core Protocol</span>
                        </div>
                        <p className="text-xs font-medium text-base-content/50 leading-relaxed">
                            Updating this node will trigger a global cache refresh. All rental agreements will follow these new specifications immediately.
                        </p>
                    </div>
                </div>

                {/* --- Right: The Engineering Form (Solid Luxury Look) --- */}
                <div className="lg:col-span-8 bg-base-100 p-10 md:p-16 rounded-[4rem] border border-base-content/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative">
                    <form onSubmit={handleUpdateVehicle} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                            {/* Model Name */}
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Asset Identity</label>
                                <div className="relative">
                                    <FiTag className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" />
                                    <input required defaultValue={data?.vehicleName} type="text" name="vehicleName" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200/50 border-none focus:ring-2 focus:ring-primary font-bold uppercase tracking-tight" />
                                </div>
                            </div>

                            {/* Category (কালার ২) */}
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Deployment Segment</label>
                                <div className="relative">
                                    <FiLayers className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary" />
                                    <select defaultValue={data?.category} name="category" className="select select-bordered w-full h-16 pl-16 rounded-2xl bg-base-200/50 border-none focus:ring-2 focus:ring-secondary font-black uppercase text-xs tracking-widest">
                                        <option value="Luxury">Luxury</option>
                                        <option value="Electric">Electric</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Sport">Sport</option>
                                    </select>
                                </div>
                            </div>

                            {/* Daily Rate (কালার ১) */}
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Subscription Cost ($)</label>
                                <div className="relative">
                                    <FiDollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" />
                                    <input required defaultValue={data?.pricePerDay} type="number" name="pricePerDay" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200/50 border-none focus:ring-2 focus:ring-primary font-[1000] text-xl" />
                                </div>
                            </div>

                            {/* Availability (কালার ২) */}
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Operational Status</label>
                                <select defaultValue={data?.availability?.toString()} name="availability" className="select select-bordered w-full h-16 rounded-2xl bg-base-200/50 border-none font-bold uppercase text-xs tracking-widest">
                                    <option value="true">Live & Ready</option>
                                    <option value="false">Maintenance / Reserved</option>
                                </select>
                            </div>

                            {/* Image URL */}
                            <div className="form-control md:col-span-2">
                                <label className="label text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Master Visual Asset</label>
                                <div className="relative">
                                    <FiImage className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" />
                                    <input required defaultValue={data?.coverImage} type="text" name="coverImage" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200/50 border-none focus:ring-2 focus:ring-primary font-medium" />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-control md:col-span-2">
                                <label className="label text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Unit Narrative & Specs</label>
                                <textarea defaultValue={data?.description} name="description" className="textarea textarea-bordered w-full pl-8 pt-6 h-40 rounded-[2.5rem] bg-base-200/50 border-none focus:ring-2 focus:ring-primary font-medium leading-relaxed" />
                            </div>

                            {/* Location (কালার ৩) */}
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Service Node</label>
                                <div className="relative">
                                    <FiMapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" />
                                    <input required defaultValue={data?.location} type="text" name="location" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200/50 border-none focus:ring-2 focus:ring-accent font-bold text-xs uppercase tracking-widest" />
                                </div>
                            </div>

                            {/* Ratings (কালার ৩) */}
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Public Rating Index</label>
                                <div className="relative">
                                    <FiStar className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" />
                                    <input required defaultValue={data?.ratings} type="number" step="0.1" name="ratings" className="input input-bordered w-full h-16 pl-16 rounded-2xl bg-base-200/50 border-none focus:ring-2 focus:ring-accent font-black" />
                                </div>
                            </div>

                            {/* Hidden Fields */}
                            <input readOnly defaultValue={data?.userEmail} type="hidden" name="userEmail" />
                            <input readOnly defaultValue={data?.owner} type="hidden" name="owner" />
                            <input readOnly defaultValue={data?.createdAt} type="hidden" name="createdAt" />
                        </div>

                        {/* Submit Button (কালার ১: Primary) */}
                        <div className="pt-8">
                            <button type="submit" className="w-full h-24 bg-primary text-primary-content rounded-[2.5rem] font-black text-2xl uppercase tracking-[0.3em] italic shadow-2xl shadow-primary/30 hover:scale-[1.01] transition-all duration-500 flex items-center justify-center gap-6">
                                <FiRefreshCw className="animate-spin-slow" />
                                Sync Specifications
                            </button>
                            <p className="text-center mt-8 text-[9px] font-black uppercase tracking-[0.5em] opacity-20 italic">Authorizing encrypted data transmission...</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateVehicle;
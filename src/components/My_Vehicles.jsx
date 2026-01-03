import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiEdit3, FiTruck, FiMapPin, FiDollarSign, FiInbox, FiActivity, FiShield } from 'react-icons/fi';

const My_Vehicles = () => {
    const { user } = useContext(AuthContext);
    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (user?.email) {
            axios.get(`https://vehicle-hub-server-delta.vercel.app/allVehicles?userEmail=${user.email}`)
                .then(res => setdata(res.data))
                .catch(() => { })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user?.email]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: '<span style="font-weight:900; letter-spacing:-1px;">DECOMMISSION UNIT?</span>',
            text: "This asset will be permanently removed from the global registry.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "oklch(var(--er))",
            cancelButtonColor: "oklch(var(--bc)/0.2)",
            confirmButtonText: "YES, DELETE ASSET",
            background: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))',
            customClass: {
                popup: 'rounded-[2rem] border-2 border-error/10 shadow-2xl',
                confirmButton: 'rounded-full px-8 py-3 font-black uppercase text-xs tracking-[0.2em]'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://vehicle-hub-server-delta.vercel.app/allVehicles/${_id}`)
                    .then(() => {
                        setdata(prev => prev.filter(b => b._id !== _id));
                        Swal.fire({
                            title: "DELETED",
                            text: "Unit wiped from database.",
                            icon: "success",
                            background: 'oklch(var(--b1))',
                            confirmButtonColor: "oklch(var(--p))"
                        });
                    });
            }
        });
    };

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-16 h-1 bg-primary animate-pulse" />
            <p className="mt-4 font-black text-[10px] tracking-[0.6em] text-primary uppercase">Syncing Fleet Data</p>
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto py-4">
            {/* --- কালার ২: Secondary Header --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-12 bg-secondary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Asset Management</span>
                    </div>
                    <h2 className="text-6xl font-[1000] tracking-tighter uppercase italic leading-none">
                        Private <br /> <span className="text-primary not-italic opacity-20">Inventory</span>
                    </h2>
                </div>

                {/* কালার ৩: Accent Statistics Box */}
                <div className="bg-accent/5 px-10 py-6 rounded-[2.5rem] border border-accent/10 flex items-center gap-6 group hover:bg-accent/10 transition-all duration-500">
                    <div className="text-right">
                        <p className="text-[9px] font-black text-accent uppercase tracking-widest opacity-60">Fleet Capacity</p>
                        <p className="text-4xl font-[1000] text-accent tracking-tighter italic leading-none">{data.length < 10 ? `0${data.length}` : data.length}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-accent text-accent-content flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                        <FiTruck size={24} />
                    </div>
                </div>
            </div>

            {/* --- Inventory Grid/Table Section --- */}
            <AnimatePresence mode="wait">
                {data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-32 bg-base-200/20 rounded-[4rem] border-2 border-dashed border-base-content/5"
                    >
                        <div className="w-24 h-24 bg-base-100 rounded-[2rem] flex items-center justify-center text-base-content/10 mb-8 border border-base-content/5">
                            <FiInbox size={40} />
                        </div>
                        <p className="text-3xl font-black italic opacity-20 uppercase tracking-tighter mb-4">No Registered Assets</p>
                        <Link to="/dashboard/addVehicles" className="btn btn-primary rounded-full px-10 font-black italic tracking-widest text-xs uppercase">
                            Add First Unit
                        </Link>
                    </motion.div>
                ) : (
                    <div className="bg-base-100 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-base-content/5 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className="bg-base-200/50">
                                    <tr className="border-none text-base-content opacity-40 uppercase text-[9px] tracking-[0.4em] font-black h-24">
                                        <th className="pl-12">Visual / Model</th>
                                        <th>Protocol</th>
                                        <th>Daily Revenue</th>
                                        <th className="pr-12 text-right">Operational Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((vehicle, index) => (
                                        <motion.tr
                                            key={vehicle._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-b border-base-content/5 hover:bg-primary/[0.02] transition-all group"
                                        >
                                            <td className="py-8 pl-12">
                                                <div className="flex items-center gap-6">
                                                    <div className="relative">
                                                        <div className="w-28 h-20 rounded-[1.5rem] overflow-hidden shadow-2xl border border-base-content/5 group-hover:scale-105 transition-transform duration-700">
                                                            <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={vehicle.coverImage} alt={vehicle.vehicleName} />
                                                        </div>
                                                        <div className="absolute -bottom-2 -right-2 bg-secondary w-8 h-8 rounded-xl flex items-center justify-center text-secondary-content shadow-lg shadow-secondary/20">
                                                            <FiShield size={14} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-[1000] text-2xl uppercase italic tracking-tighter group-hover:text-primary transition-colors leading-none mb-2">
                                                            {vehicle.vehicleName}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] font-black opacity-40 uppercase tracking-[0.2em]">
                                                            <FiMapPin className="text-secondary" /> {vehicle.location}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-black opacity-30 uppercase tracking-widest leading-none">Security Node</span>
                                                    <div className="flex items-center gap-2 font-bold text-sm uppercase italic">
                                                        <FiActivity className="text-success animate-pulse" /> Listed Asset
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-black opacity-30 uppercase tracking-widest leading-none mb-1">Standard Rate</span>
                                                    <div className="flex items-center font-[1000] text-3xl text-base-content tracking-tighter">
                                                        <span className="text-primary text-sm mr-1 font-bold italic">$</span>
                                                        {vehicle.pricePerDay}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pr-12 text-right">
                                                <div className="flex justify-end items-center gap-3">
                                                    <Link
                                                        to={`/dashboard/updateVehicle/${vehicle._id}`}
                                                        className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-base-content/40 hover:bg-warning hover:text-warning-content transition-all duration-500 shadow-md"
                                                        title="Edit Specifications"
                                                    >
                                                        <FiEdit3 size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(vehicle._id)}
                                                        className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-error/40 hover:bg-error hover:text-white transition-all duration-500 shadow-md"
                                                        title="Delete Asset"
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Decoration line */}
            <div className="mt-12 flex justify-center opacity-10">
                <div className="h-px w-64 bg-gradient-to-r from-transparent via-base-content to-transparent" />
            </div>
        </div>
    );
};

export default My_Vehicles;
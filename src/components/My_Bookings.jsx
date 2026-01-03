import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMapPin, FiInbox, FiShield, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router';

const My_Bookings = () => {
    const [book, setBook] = useState([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (user?.email) {
            axios.get(`https://vehicle-hub-server-delta.vercel.app/bookVehicles?email=${user.email}`)
                .then(res => setBook(res.data || []))
                .catch(() => { })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user?.email]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: '<span style="font-weight:900; letter-spacing:-1px; text-transform:uppercase;">Cancel Reservation?</span>',
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "oklch(var(--er))",
            cancelButtonColor: "oklch(var(--bc)/0.3)",
            confirmButtonText: "YES, RELEASE UNIT",
            background: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))',
            customClass: {
                popup: 'rounded-[2rem] border-2 border-error/10 shadow-2xl',
                confirmButton: 'rounded-full px-8 py-3 font-black italic uppercase text-xs tracking-widest'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://vehicle-hub-server-delta.vercel.app/bookVehicles/${_id}`)
                    .then(() => {
                        setBook(prev => prev.filter(b => b._id !== _id));
                        Swal.fire({
                            title: "RELEASED",
                            text: "Unit returned to global fleet.",
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
            <div className="w-20 h-[2px] bg-primary animate-pulse" />
            <p className="mt-6 font-black text-[10px] tracking-[0.8em] text-primary uppercase">Syncing Records</p>
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto py-4 font-['Outfit']">
            {/* --- Header Section --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-12 bg-secondary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Inventory Management</span>
                    </div>
                    {/* text-base-content সরাসরি ব্যবহার করা হয়েছে যেন থিম অনুযায়ী কালার নেয় */}
                    <h2 className="text-6xl font-[1000] tracking-tighter uppercase italic leading-none text-base-content">
                        Active <br /> <span className="text-primary not-italic opacity-40">Reservations</span>
                    </h2>
                </div>

                <div className="bg-accent/10 px-10 py-6 rounded-[2.5rem] border border-accent/20 flex flex-col items-end gap-1">
                    <span className="text-[9px] font-black text-accent uppercase tracking-widest">Total Units Under Command</span>
                    <span className="text-4xl font-[1000] text-accent tracking-tighter italic">0{book.length}</span>
                </div>
            </div>

            {/* --- Data Table --- */}
            <AnimatePresence mode="wait">
                {book.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-32 bg-base-200/50 rounded-[4rem] border-2 border-dashed border-base-content/10"
                    >
                        <div className="w-24 h-24 bg-base-100 rounded-[2rem] flex items-center justify-center text-base-content/20 mb-8 border border-base-content/10">
                            <FiInbox size={40} />
                        </div>
                        <p className="text-3xl font-black italic opacity-40 uppercase tracking-tighter mb-4 text-base-content">No Active Fleet Detected</p>
                        <Link to="/apps" className="btn btn-primary rounded-full px-10 font-black italic tracking-widest text-xs uppercase shadow-xl">
                            Explore Showroom
                        </Link>
                    </motion.div>
                ) : (
                    <div className="bg-base-100 rounded-[3.5rem] shadow-2xl shadow-base-content/5 border border-base-content/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table w-full border-separate border-spacing-y-0">
                                <thead className="bg-base-200/80">
                                    <tr className="border-none text-base-content uppercase text-[10px] tracking-[0.3em] font-black">
                                        <th className="py-8 px-10 w-20">UID</th>
                                        <th className="py-8">Unit Specification</th>
                                        <th className="py-8">Ownership</th>
                                        <th className="py-8">Daily Rate</th>
                                        <th className="py-8 text-right px-10">Command</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {book.map((vehicle, index) => (
                                        <motion.tr
                                            key={vehicle._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-base-content/5 hover:bg-base-200/40 transition-colors group"
                                        >
                                            <td className="px-10">
                                                <span className="text-[10px] font-black text-base-content/40 uppercase">#0{index + 1}</span>
                                            </td>
                                            <td className="py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="relative">
                                                        <div className="w-24 h-20 rounded-[1.5rem] overflow-hidden shadow-xl border border-base-content/10">
                                                            <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="absolute -top-2 -right-2 bg-primary w-6 h-6 rounded-full flex items-center justify-center text-[8px] text-primary-content font-black shadow-lg">
                                                            <FiShield />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-[1000] text-2xl uppercase tracking-tighter italic text-base-content group-hover:text-primary transition-colors leading-none mb-2">
                                                            {vehicle.vehicleName}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] font-black text-base-content/60 uppercase tracking-widest">
                                                            <FiMapPin className="text-secondary" /> {vehicle.location || "Central Hub"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-black text-base-content/40 uppercase tracking-widest leading-none">Registered to</span>
                                                    <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-tight text-base-content">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                                        {vehicle.owner || "Fleet Admin"}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center font-[1000] text-2xl text-base-content tracking-tighter">
                                                    <span className="text-primary text-sm mr-1 font-bold italic">$</span>
                                                    {vehicle.pricePerDay}
                                                </div>
                                            </td>
                                            <td className="text-right px-10">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        to={`/details/${vehicle.vehicleId}`}
                                                        className="w-12 h-12 rounded-2xl bg-base-200/50 flex items-center justify-center text-base-content hover:bg-secondary hover:text-secondary-content transition-all duration-300"
                                                    >
                                                        <FiExternalLink size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(vehicle._id)}
                                                        className="w-12 h-12 rounded-2xl bg-base-200/50 flex items-center justify-center text-error hover:bg-error hover:text-white transition-all duration-300 shadow-sm"
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
        </div>
    );
};

export default My_Bookings;
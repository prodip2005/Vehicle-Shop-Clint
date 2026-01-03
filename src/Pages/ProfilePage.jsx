import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { getExtras } from '../utils/storage';
import { motion } from 'framer-motion';
import {
    FiMail, FiPhone, FiMapPin, FiBriefcase,
    FiGithub, FiLinkedin, FiFacebook, FiEdit3, FiAward
} from 'react-icons/fi';

const ProfilePage = () => {
    const { user, loading } = useContext(AuthContext);

    const [extras, setExtras] = useState({
        occupation: '',
        location: '',
        phone: '',
        github: '',
        linkedin: '',
        facebook: '',
    });

    useEffect(() => {
        const saved = getExtras(user);
        if (saved) setExtras(prev => ({ ...prev, ...saved }));
        else setExtras({
            occupation: '', location: '', phone: '',
            github: '', linkedin: '', facebook: '',
        });
    }, [user]);

    const userName = user?.displayName || 'Elite Member';
    const userEmail = user?.email || 'N/A';
    const userPhotoURL = user?.photoURL || 'https://i.ibb.co/5R6S5pZ/user-placeholder.png';

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
            <span className="loading loading-infinity loading-lg text-primary scale-150"></span>
            <p className="mt-4 font-black text-xs tracking-[0.5em] opacity-40">IDENTIFYING USER...</p>
        </div>
    );

    return (
        <div className="bg-base-200/50 min-h-screen flex justify-center items-center p-6 font-['Outfit']">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full bg-base-100 rounded-[3.5rem] shadow-2xl overflow-hidden border border-base-content/5 relative"
            >
                {/* --- Top Banner & Avatar Section --- */}
                <div className="h-40 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent relative">
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                        <div className="relative group">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src={userPhotoURL}
                                alt={userName}
                                className="w-36 h-36 rounded-[2.5rem] object-cover ring-8 ring-base-100 shadow-2xl transition-all duration-500"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-content p-2 rounded-xl shadow-lg border-4 border-base-100">
                                <FiAward size={18} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Profile Details --- */}
                <div className="pt-24 pb-12 px-8 md:px-12 text-center space-y-8">
                    {/* Name & Title */}
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase italic text-base-content">
                            {userName}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm font-bold opacity-60 uppercase tracking-widest">
                            <span className="flex items-center gap-1"><FiBriefcase className="text-primary" /> {extras.occupation || 'Executive'}</span>
                            <span className="opacity-20">|</span>
                            <span className="flex items-center gap-1"><FiMapPin className="text-primary" /> {extras.location || 'Global'}</span>
                        </div>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href={`mailto:${userEmail}`} className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl hover:bg-primary/10 transition-colors group border border-base-content/5">
                            <div className="w-10 h-10 bg-base-100 rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <FiMail />
                            </div>
                            <span className="text-sm font-bold truncate">{userEmail}</span>
                        </a>

                        <a href={extras.phone ? `tel:${extras.phone}` : "#"} className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl hover:bg-primary/10 transition-colors group border border-base-content/5">
                            <div className="w-10 h-10 bg-base-100 rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <FiPhone />
                            </div>
                            <span className="text-sm font-bold truncate">{extras.phone || 'No Phone Set'}</span>
                        </a>
                    </div>

                    {/* Social Connectivity */}
                    <div className="flex flex-col items-center gap-6 pt-4">
                        <div className="flex gap-4">
                            <SocialIcon icon={FiGithub} href={extras.github} label="Github" />
                            <SocialIcon icon={FiLinkedin} href={extras.linkedin} label="LinkedIn" />
                            <SocialIcon icon={FiFacebook} href={extras.facebook} label="Facebook" />
                        </div>

                        <Link to="/update" className="w-full">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-primary w-full h-16 rounded-[1.5rem] font-black uppercase tracking-[0.2em] italic text-xs shadow-xl shadow-primary/20"
                            >
                                <FiEdit3 size={18} className="mr-2" /> Modify Profile Identity
                            </motion.button>
                        </Link>
                    </div>

                    {/* Footer Signature */}
                    <div className="pt-8 border-t border-base-content/5 flex flex-col items-center gap-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
                            Digital Identity Managed By
                        </p>
                        <span className="text-xs font-black italic uppercase text-primary tracking-widest">
                            Shadow Monarch Shop
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- Reusable Social Icon Component ---
const SocialIcon = ({ icon: Icon, href, label }) => (
    <a
        href={href || '#'}
        target="_blank"
        rel="noreferrer"
        className={`w-14 h-14 bg-base-200 flex items-center justify-center rounded-2xl hover:bg-primary hover:text-primary-content transition-all duration-300 shadow-lg ${!href ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
        aria-label={label}
    >
        <Icon size={22} />
    </a>
);

export default ProfilePage;
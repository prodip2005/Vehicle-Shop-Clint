import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router';
import { getExtras, setExtras } from '../utils/storage';
import { motion } from 'framer-motion';
import { FiUser, FiImage, FiLock, FiBriefcase, FiMapPin, FiPhone, FiGlobe, FiSave, FiArrowLeft } from 'react-icons/fi';

const UpdateProfile = () => {
    const { user, loading, updateUser, updateUserPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        photoURL: user?.photoURL || '',
        newPassword: '',
        occupation: '',
        location: '',
        phone: '',
        facebook: '',
        github: '',
        linkedin: '',
    });

    useEffect(() => {
        const saved = getExtras(user);
        setFormData(prev => ({
            ...prev,
            ...saved,
            name: user?.displayName || prev.name,
            photoURL: user?.photoURL || prev.photoURL,
        }));
    }, [user]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
    );

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async e => {
        e.preventDefault();
        setUpdateError('');
        setUpdateSuccess('');

        try {
            if (formData.name !== user?.displayName || formData.photoURL !== user?.photoURL) {
                await updateUser({ displayName: formData.name, photoURL: formData.photoURL });
            }

            if (formData.newPassword) {
                await updateUserPassword(formData.newPassword);
            }

            setExtras(user, {
                occupation: formData.occupation,
                location: formData.location,
                phone: formData.phone,
                facebook: formData.facebook,
                github: formData.github,
                linkedin: formData.linkedin,
            });

            setUpdateSuccess('Identity Synchronized Successfully!');
            setTimeout(() => navigate('/profile'), 1500);
        } catch (error) {
            setUpdateError(`Update Failed: ${error.message}`);
        }
    };

    return (
        <div className="bg-base-200/30 min-h-screen py-12 px-4 font-['Outfit']">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden border border-base-content/5"
            >
                {/* Header */}
                <div className="bg-primary/5 p-8 md:p-12 border-b border-base-content/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all mb-4">
                            <FiArrowLeft /> Back to Profile
                        </button>
                        <h1 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase italic">
                            Account <span className="text-primary not-italic">Settings</span>
                        </h1>
                        <p className="text-base-content/50 font-medium">Update your digital identity and connections.</p>
                    </div>

                    {/* Live Preview Avatar */}
                    <div className="relative group">
                        <img
                            src={formData.photoURL || 'https://i.ibb.co/5R6S5pZ/user-placeholder.png'}
                            className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-primary/20 shadow-xl"
                            alt="Avatar"
                        />
                        <div className="absolute -top-2 -right-2 bg-primary p-2 rounded-lg text-white shadow-lg">
                            <FiImage size={14} />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="p-8 md:p-12 space-y-12">
                    {updateSuccess && <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="alert alert-success rounded-2xl font-bold text-white shadow-lg">{updateSuccess}</motion.div>}
                    {updateError && <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="alert alert-error rounded-2xl font-bold text-white shadow-lg">{updateError}</motion.div>}

                    {/* Section 1: Basic Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Core Identity</h2>
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-40">Full Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 font-bold" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-40">Photo URL</label>
                            <div className="relative">
                                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                <input type="url" name="photoURL" value={formData.photoURL} onChange={handleChange} className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 font-bold" />
                            </div>
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-40">Security (New Password)</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Leave blank to keep current" className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 font-bold" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Professional & Social */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-base-content/5">
                        <div className="md:col-span-2">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Professional & Social</h2>
                        </div>

                        <FormInput icon={FiBriefcase} label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="e.g. Fleet Manager" />
                        <FormInput icon={FiMapPin} label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="City, Country" />
                        <FormInput icon={FiPhone} label="Contact Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+880..." />
                        <FormInput icon={FiGlobe} label="GitHub Link" name="github" value={formData.github} onChange={handleChange} placeholder="URL" />
                        <FormInput icon={FiGlobe} label="LinkedIn Link" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="URL" />
                        <FormInput icon={FiGlobe} label="Facebook Link" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="URL" />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary w-full h-20 rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-primary/20"
                    >
                        <FiSave size={24} className="mr-3" /> Save Identity Changes
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

// --- Reusable Input Component ---
const FormInput = ({ icon: Icon, label, name, value, onChange, placeholder }) => (
    <div className="form-control">
        <label className="label text-[10px] font-black uppercase tracking-widest opacity-40">{label}</label>
        <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" />
            <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/30 font-bold focus:border-primary transition-all" />
        </div>
    </div>
);

export default UpdateProfile;
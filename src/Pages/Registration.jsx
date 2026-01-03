import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router'; // useNavigate ফিক্স
import { AuthContext } from '../provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { FiUser, FiMail, FiLock, FiImage, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Registration = () => {
    const [valError, setValError] = useState('');
    const { createUser, setUser, updateUser, googleSignIn } = useContext(AuthContext); // 'use' এর বদলে 'useContext' ব্যবহার করা ভালো
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        setValError('');

        // --- ভ্যালিডেশন লজিক ---
        if (name.length < 6) {
            setValError("Name must contain at least 6 characters");
            return;
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;

        if (!hasUpperCase) {
            setValError("Password must have at least one uppercase letter");
            return;
        }
        if (!hasLowerCase) {
            setValError("Password must have at least one lowercase letter");
            return;
        }
        if (!isValidLength) {
            setValError("Password must be at least 6 characters long");
            return;
        }

        // --- ইউজার তৈরি ---
        createUser(email, password)
            .then((res) => {
                const user = res.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        toast.success('Registration Successful!');
                        navigate('/');
                    })
                    .catch((err) => {
                        setUser(user);
                        toast.error('Profile update failed');
                    });
            })
            .catch((error) => {
                setValError(error.message);
                toast.error('Registration failed');
            });
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 font-['Outfit'] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card lg:card-side bg-base-100 shadow-2xl max-w-5xl w-full overflow-hidden rounded-[2.5rem] border border-white/5"
            >
                {/* Left Side: Visual Content */}
                <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-white w-5/12">
                    <div>
                        <h2 className="text-5xl font-[1000] italic leading-tight tracking-tighter uppercase">
                            Join the <br /> Elite.
                        </h2>
                        <p className="mt-6 opacity-70 font-medium leading-relaxed">
                            Create an account to start your journey with the world's most premium vehicle fleet.
                        </p>
                    </div>

                    <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">Security Tip</p>
                        <p className="text-[11px] mt-2 opacity-80 leading-snug">
                            Use a strong password with uppercase, lowercase, and symbols to keep your account safe.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="card-body p-8 lg:p-14 lg:w-7/12">
                    <div className="text-center mb-6">
                        <div className="w-12 h-1 bg-primary mx-auto mb-4 rounded-full" />
                        <h1 className="text-4xl font-[1000] uppercase italic tracking-tighter">
                            Create <span className="text-primary not-italic opacity-30">Account</span>
                        </h1>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-3">
                        {/* Name Input */}
                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Full Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" />
                                <input
                                    name="name" type="text" required
                                    placeholder="Enter at least 6 characters"
                                    className="input input-bordered w-full h-12 pl-12 rounded-xl bg-base-200/50 border-none focus:ring-2 ring-primary/30 font-bold transition-all text-sm"
                                />
                            </div>
                        </div>

                        {/* Photo Input */}
                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Photo URL</label>
                            <div className="relative">
                                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" />
                                <input
                                    name="photo" type="text" required
                                    placeholder="Paste image link"
                                    className="input input-bordered w-full h-12 pl-12 rounded-xl bg-base-200/50 border-none focus:ring-2 ring-primary/30 font-bold transition-all text-sm"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" />
                                <input
                                    name="email" type="email" required
                                    placeholder="your@email.com"
                                    className="input input-bordered w-full h-12 pl-12 rounded-xl bg-base-200/50 border-none focus:ring-2 ring-primary/30 font-bold transition-all text-sm"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" />
                                <input
                                    name="password" type="password" required
                                    placeholder="••••••••"
                                    className="input input-bordered w-full h-12 pl-12 rounded-xl bg-base-200/50 border-none focus:ring-2 ring-primary/30 font-bold transition-all text-sm"
                                />
                            </div>
                        </div>

                        {valError && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-error text-[11px] font-bold bg-error/5 p-3 rounded-xl border border-error/10">
                                <FiAlertCircle className="shrink-0" /> {valError}
                            </motion.div>
                        )}

                        <button className="btn btn-primary w-full h-12 rounded-xl text-white font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all mt-4">
                            Register Now
                        </button>
                    </form>

                    <div className="divider my-6 text-[10px] font-black opacity-20 uppercase tracking-[0.2em]">Quick Access</div>

                  

                    <p className="text-center mt-6 text-sm font-bold opacity-60">
                        Already have an account? <Link to="/login" className="text-primary hover:underline transition-all">Login Here</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Registration;
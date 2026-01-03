import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiAlertCircle, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Demo User Credentials
    const handleDemoLogin = () => {
        setEmail('user@demo.com');
        setPassword('User@123');
        toast('Demo Credentials Loaded', { icon: '🚗' });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        signIn(email, password)
            .then(() => {
                toast.success('Welcome Back!');
                navigate(from, { replace: true });
            })
            .catch(() => {
                setError('Invalid email or password. Please try again.');
                toast.error('Authentication Failed');
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                toast.success('Google Login Successful!');
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                toast.error('Google Sign-In Failed');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 font-['Outfit'] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card lg:card-side bg-base-100 shadow-2xl max-w-5xl w-full overflow-hidden rounded-[2.5rem] border border-white/5"
            >
                {/* Left Side: Visual Content */}
                <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-white w-5/12">
                    <div>
                        <h2 className="text-5xl font-[1000] italic leading-tight tracking-tighter uppercase">
                            Elite <br /> Mobility.
                        </h2>
                        <p className="mt-6 opacity-70 font-medium leading-relaxed">
                            Unlock the journey of your dreams. Log in to access our exclusive fleet.
                        </p>
                    </div>

                    <div>
                        <button
                            onClick={handleDemoLogin}
                            className="btn btn-sm h-12 w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary rounded-xl transition-all gap-2"
                        >
                            <FiUser /> Load Demo Account
                        </button>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="card-body p-8 lg:p-14 lg:w-7/12">
                    <div className="text-center mb-10">
                        <div className="w-12 h-1 bg-primary mx-auto mb-4 rounded-full" />
                        <h1 className="text-4xl font-[1000] uppercase italic tracking-tighter">
                            User <span className="text-primary not-italic opacity-30">Login</span>
                        </h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Email Address</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full h-14 pl-12 rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary/30 font-bold transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input input-bordered w-full h-14 pl-12 rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary/30 font-bold transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-error text-xs font-bold bg-error/5 p-3 rounded-xl">
                                <FiAlertCircle /> {error}
                            </motion.div>
                        )}

                        <button className="btn btn-primary w-full h-14 rounded-2xl text-white font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all">
                            Login Now
                        </button>
                    </form>

                    <div className="divider my-8 text-[10px] font-black opacity-20 uppercase tracking-[0.2em]">Social Access</div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline h-14 w-full rounded-2xl gap-3 font-bold border-base-content/10 hover:bg-base-200"
                    >
                        <FcGoogle size={22} /> Continue with Google
                    </button>

                    <p className="text-center mt-10 text-sm font-bold opacity-60">
                        Don't have an account? <Link to="/register" className="text-primary hover:underline transition-all">Create Account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
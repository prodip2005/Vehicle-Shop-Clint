import { NavLink, Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiHome, FiFileText, FiPlusCircle, FiTruck,
    FiActivity, FiCommand, FiGrid, FiUser
} from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const DashboardLayout = () => {
    const { theme } = useContext(ThemeContext);
    const location = useLocation();

    // চেক করা হচ্ছে ইউজার কি ড্যাশবোর্ড হোমে আছে কি না
    const isDashboardHome = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

    return (
        <div data-theme={theme} className="min-h-screen bg-base-100 text-base-content flex flex-col transition-all duration-500 font-['Outfit']">

            {/* --- Header: Responsive --- */}
            {/* --- Header: Responsive --- */}
            <header className="sticky top-0 z-[60] bg-base-100/80 backdrop-blur-xl border-b border-base-content/5 px-6 md:px-12 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary text-secondary-content rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                        <FiCommand size={20} className="md:size-[22px]" />
                    </div>
                    <h1 className="text-lg md:text-xl font-[1000] tracking-tight uppercase italic leading-none text-base-content">
                        V-Hub <span className="opacity-40 hidden sm:inline">Console</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    {/* --- সংশোধিত বড় এবং স্পষ্ট হোম বাটন --- */}
                    <Link
                        to="/"
                        className="group flex items-center gap-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-content px-5 md:px-8 py-2.5 md:py-3 rounded-full border border-primary/20 transition-all duration-500 shadow-lg hover:shadow-primary/30"
                    >
                        <FiHome className="text-lg md:text-xl group-hover:-translate-y-1 transition-transform duration-300" />
                        <span className="text-[10px] md:text-xs font-[1000] uppercase tracking-[0.2em] italic">
                            Back to Home
                        </span>
                    </Link>

                    {/* User Profile Icon */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-base-200 border border-base-content/10 flex items-center justify-center text-base-content hover:border-primary transition-all cursor-pointer">
                        <FiUser size={18} />
                    </div>
                </div>
            </header>

            <div className="flex flex-1 relative">
                {/* --- Sidebar: Desktop (Hidden on Mobile) --- */}
                <aside className="w-80 hidden lg:flex flex-col bg-base-100 border-r border-base-content/5 p-8 sticky top-[92px] h-[calc(100vh-92px)] overflow-y-auto no-scrollbar">
                    <div className="flex-1 space-y-3">
                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary mb-8 ml-2">Navigation Core</p>
                        <SidebarLink to="myBookings" icon={FiFileText} label="My Bookings" />
                        <SidebarLink to="addVehicles" icon={FiPlusCircle} label="Add Vehicle" />
                        <SidebarLink to="myVehicles" icon={FiTruck} label="My Vehicles" />
                    </div>

                    {/* Node Status Card (Instruction/Status logic) */}
                    <div className="mt-10 p-8 bg-accent/5 rounded-[2.5rem] border border-accent/10 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 text-accent opacity-5 group-hover:scale-150 transition-transform duration-700">
                            <FiActivity size={100} />
                        </div>
                        <p className="text-[9px] font-black text-accent uppercase tracking-[0.3em] mb-2">Node Status</p>
                        <p className="text-xl font-[1000] italic uppercase text-base-content tracking-tighter leading-tight">Verified <br />Operator</p>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-[9px] font-bold opacity-50 uppercase tracking-widest">System Online</span>
                        </div>
                    </div>
                </aside>

                {/* --- Main Content: Responsive Padding --- */}
                <main className="flex-1 p-6 md:p-10 lg:p-16 bg-base-200/30 relative min-h-[calc(100vh-92px)] pb-28 lg:pb-16">
                    {/* Background Subtle Gradient */}
                    <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                    <AnimatePresence mode="wait">
                        {isDashboardHome ? (
                            <DashboardWelcome />
                        ) : (
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <Outlet />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {/* --- Mobile Bottom Navigation --- */}
                <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-base-100/90 backdrop-blur-2xl border border-base-content/10 px-6 py-4 rounded-full shadow-2xl z-[100] flex gap-10 items-center">
                    <MobileLink to="myBookings" icon={FiFileText} />
                    <MobileLink to="addVehicles" icon={FiPlusCircle} />
                    <MobileLink to="myVehicles" icon={FiTruck} />
                </div>
            </div>
        </div>
    );
};

/* --- Helper Components --- */

const SidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `flex items-center gap-4 px-8 py-5 rounded-[1.5rem] transition-all duration-500 group relative ${isActive ? 'bg-primary text-primary-content shadow-xl shadow-primary/20 scale-[1.02]' : 'text-base-content/40 hover:bg-base-200 hover:text-base-content'}`}
    >
        <Icon size={18} className="group-hover:scale-110 transition-transform" />
        <span className="font-black uppercase text-[10px] tracking-[0.2em]">{label}</span>
    </NavLink>
);

const MobileLink = ({ to, icon: Icon }) => (
    <NavLink to={to} className={({ isActive }) => `transition-all ${isActive ? 'text-primary scale-125' : 'text-base-content/30'}`}>
        <Icon size={22} />
    </NavLink>
);

const DashboardWelcome = () => (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl space-y-12">
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Authorized Hub</span>
            </div>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter uppercase italic leading-[0.85] text-base-content">
                System <br /> <span className="opacity-10">Dashboard</span>
            </h2>
            <p className="text-lg md:text-xl text-base-content/40 font-medium max-w-xl leading-relaxed">
                আপনার ফ্ল্যাট নিয়ন্ত্রণ করুন, বুকিং মনিটর করুন এবং এখান থেকেই আপনার অটোমোটিভ সাম্রাজ্য পরিচালনা করুন।
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-8 md:p-10 bg-base-100 rounded-[2.5rem] border border-base-content/5 space-y-4 hover:border-primary/20 transition-all group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-content transition-all"><FiGrid size={24} /></div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Global Fleet</h3>
                <p className="text-sm text-base-content/40">আপনার গ্যারেজে থাকা প্রতিটি গাড়ির বিস্তারিত তথ্য ম্যানেজ করুন।</p>
            </div>
            <div className="p-8 md:p-10 bg-base-100 rounded-[2.5rem] border border-base-content/5 space-y-4 hover:border-secondary/20 transition-all group">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-content transition-all"><FiActivity size={24} /></div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Analytics</h3>
                <p className="text-sm text-base-content/40">রিয়েল-টাইম পারফরম্যান্স এবং মার্কেট ট্র্যাকিং ডেটা দেখুন।</p>
            </div>
        </div>
    </motion.div>
);

export default DashboardLayout;
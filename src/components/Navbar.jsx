import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { FiChevronDown, FiLogOut, FiUser, FiMenu, FiX, FiGrid, FiSun, FiMoon, FiHome, FiTruck } from "react-icons/fi";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import logo from "../assets/Gemini_Generated_Image_hvv2x1hvv2x1hvv2.png";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [open, setOpen] = useState(false); // মোবাইলের জন্য স্টেট
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // রুটগুলোর জন্য কমন কম্পোনেন্ট
    const navLinks = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-6 py-2 rounded-full font-bold uppercase text-[11px] tracking-widest transition-all ${isActive ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' : 'hover:text-primary opacity-70 hover:opacity-100'}`}>
                    <FiHome size={14} /> Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/apps" className={({ isActive }) => `flex items-center gap-2 px-6 py-2 rounded-full font-bold uppercase text-[11px] tracking-widest transition-all ${isActive ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' : 'hover:text-primary opacity-70 hover:opacity-100'}`}>
                    <FiTruck size={14} /> All Vehicles
                </NavLink>
            </li>
            {/* আপনার প্রয়োজন অনুযায়ী আরও লিঙ্ক যোগ করতে পারেন */}
        </>
    );

    return (
        <header className="fixed top-0 left-0 w-full z-[100] pt-5 px-4 sm:px-10">
            <nav className={`navbar max-w-[1600px] mx-auto rounded-[3rem] transition-all duration-500 border border-base-content/10 px-6 ${scrolled ? "bg-base-100/80 backdrop-blur-2xl shadow-2xl" : "bg-base-100/20 backdrop-blur-md"}`}>

                <div className="navbar-start">
                    {/* Mobile Menu Button */}
                    <div className="dropdown lg:hidden">
                        <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle">
                            <FiMenu size={24} />
                        </button>
                        {open && (
                            <ul className="menu menu-sm dropdown-content mt-5 z-[1] p-6 shadow-2xl bg-base-100 rounded-[2rem] w-64 border border-base-content/10 space-y-3">
                                {navLinks}
                            </ul>
                        )}
                    </div>

                    <Link to="/" className="flex items-center gap-2">
                        <img className="w-10 h-10 rounded-full border-2 border-accent" src={logo} alt="logo" />
                        <span className="text-xl font-black uppercase hidden sm:inline-block text-base-content">Vehicle<span className="text-primary italic">Hub</span></span>
                    </Link>
                </div>

                {/* --- Desktop Routes (Navbar Center) --- */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-2 bg-base-content/5 p-1.5 rounded-full border border-base-content/5">
                        {navLinks}
                    </ul>
                </div>

                <div className="navbar-end gap-3">
                    {/* Theme Toggle Button */}
                    <button onClick={toggleTheme} className="btn btn-ghost btn-circle bg-base-200 text-primary border border-base-content/10 hover:bg-primary hover:text-white transition-all">
                        {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
                    </button>

                    {user && (
                        <NavLink to="/dashboard" className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-xs uppercase bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all">
                            <FiGrid /> Dashboard
                        </NavLink>
                    )}

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="p-1 pr-3 bg-base-200/50 rounded-full border border-base-content/10 flex items-center gap-2 hover:border-primary transition-all">
                                <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" src={user?.photoURL} alt="u" />
                                <FiChevronDown className="opacity-60 hidden md:block text-base-content" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content mt-5 p-4 shadow-2xl bg-base-100 border border-base-content/10 rounded-[2.5rem] w-64 z-[110]">
                                <li><Link to="/profile" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-primary/10 hover:text-primary font-bold text-base-content"><FiUser /> Profile</Link></li>
                                <li className="mt-2 pt-2 border-t border-base-content/10">
                                    <button onClick={logOut} className="flex items-center gap-3 w-full p-4 rounded-2xl bg-error/10 text-error font-bold hover:bg-error hover:text-white transition-all"><FiLogOut /> Logout</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login"><button className="btn btn-primary rounded-full px-8 font-black uppercase shadow-lg shadow-primary/20">Login</button></Link>
                    )}
                </div>
            </nav>
        </header>
    );
};
export default Navbar;
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router"; 
import { FiAperture, FiChevronDown } from "react-icons/fi"; 
import logo from "../assets//Gemini_Generated_Image_hvv2x1hvv2x1hvv2.png";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => alert("Log Out Successfully"))
            .catch((err) => alert(err?.message || "Logout failed"));
    };

    const navItemClass = ({ isActive }) =>
        [
            "btn rounded-3xl w-[120px] justify-center",
            isActive ? "btn-primary text-white" : "btn-ghost",
        ].join(" ");

    const list = (
        <>
            <li>
                <NavLink className={navItemClass} to="/" onClick={() => setOpen(false)}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink className={navItemClass} to="/apps" onClick={() => setOpen(false)}>
                    All Vehicles
                </NavLink>
            </li>
            <li>
                <NavLink className={navItemClass} to="/myBookings" onClick={() => setOpen(false)}>
                    My Bookings
                </NavLink>
            </li>
            <li>
                <NavLink className={navItemClass} to="/myVehicles" onClick={() => setOpen(false)}>
                    My Vehicles
                </NavLink>
            </li>

            <li>
                <NavLink className={navItemClass} to="/addVehicles" onClick={() => setOpen(false)}>
                    Add Vehicles
                </NavLink>
            </li>
            
            
        </>
    );

    return (
        <header className="bg-base-100 w-full shadow-sm sticky top-0 z-50">
            <nav className="navbar max-w-[1700px] mx-auto">
                {/* START */}
                <div className="navbar-start">
                    <button
                        className="btn btn-ghost lg:hidden mr-1"
                        aria-label="Open menu"
                        aria-expanded={open ? "true" : "false"}
                        onClick={() => setOpen((p) => !p)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-menu">
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </button>

                    <Link to="/" className="flex items-center gap-2">
                        <img className="md:w-24 w-12 rounded-full" src={logo} alt="GameHub logo" />
                        <span className="hidden sm:inline font-extrabold text-lg">Vehicle Hub</span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">{list}</ul>
                </div>

                <div className="navbar-end">
                    <div className="dropdown dropdown-end mr-2">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <FiAperture className="text-xl" />
                            <span className="hidden sm:inline">Theme</span>
                            <FiChevronDown className="opacity-60" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content bg-base-300 rounded-box z-[60] w-56 p-2 shadow-2xl"
                        >
                            <li>
                                <input
                                    type="radio"
                                    name="theme-dropdown"
                                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                    aria-label="Default"
                                    value="default"
                                />
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    name="theme-dropdown"
                                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                    aria-label="Retro"
                                    value="retro"
                                />
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    name="theme-dropdown"
                                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                    aria-label="Cyberpunk"
                                    value="cyberpunk"
                                />
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    name="theme-dropdown"
                                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                    aria-label="Valentine"
                                    value="valentine"
                                />
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    name="theme-dropdown"
                                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                    aria-label="Aqua"
                                    value="aqua"
                                />
                            </li>
                        </ul>
                    </div>

                    <div className="flex justify-center items-center gap-3">
                        <Link to="/profile" className="flex items-center">
                            <img
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                                src={
                                    user?.photoURL ||
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9duKEBYAVzHQ9eUWKW84UCOCo2E1c-b3yAA&s"
                                }
                                alt={user?.displayName || "avatar"}
                                referrerPolicy="no-referrer"
                            />
                        </Link>

                        {user && (
                            <Link to="/profile">
                                <div className="hidden sm:flex border text-white font-black btn btn-secondary rounded-3xl">
                                    {user.displayName}
                                </div>
                            </Link>
                        )}

                        {user ? (
                            <button
                                onClick={handleLogOut}
                                className="btn bg-red-700 text-white font-semibold rounded-3xl"
                            >
                                LogOut
                            </button>
                        ) : (
                            <Link to="/login" className="btn bg-red-700 text-white font-semibold rounded-3xl">
                                Login / Registration
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <div
                className={`lg:hidden transition-[max-height] duration-300 overflow-hidden ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <ul className="menu bg-base-100 px-4 py-3 space-y-2">{list}</ul>

                {user && (
                    <div className="px-4 pb-4">
                        <Link to="/profile" onClick={() => setOpen(false)}>
                            <div className="w-full btn btn-secondary rounded-3xl">{user.displayName}</div>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin, FiStar, FiTruck, FiUser, FiMail,
  FiCalendar, FiArrowLeft, FiCheckCircle, FiXCircle, FiZap, FiSettings, FiShield
} from 'react-icons/fi'; // এখানে FiShield যোগ করা হয়েছে
import axios from "axios";
import { AuthContext } from '../provider/AuthProvider';
import Swal from "sweetalert2";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://vehicle-hub-server-delta.vercel.app/allVehicles/${id}`)
      .then(res => {
        setVehicle(res.data);
        setLoading(false);
      })
      .catch(() => {
        setVehicle(null);
        setLoading(false);
      });
  }, [id]);

  const handleAddBooking = async () => {
    if (!user?.email) {
      Swal.fire({
        title: 'AUTHENTICATION',
        text: 'Access restricted. Please log in to proceed.',
        icon: 'info',
        confirmButtonText: 'LOG IN',
        confirmButtonColor: 'oklch(var(--p))',
        background: 'oklch(var(--b1))',
        color: 'oklch(var(--bc))',
        customClass: { popup: 'rounded-none border-t-4 border-primary' }
      });
      return;
    }

    const booking = {
      vehicleId: vehicle._id, vehicleName: vehicle.vehicleName,
      owner: vehicle.owner, pricePerDay: vehicle.pricePerDay,
      location: vehicle.location, coverImage: vehicle.coverImage,
      email: user.email, bookedAt: new Date().toISOString()
    };

    try {
      setBookingLoading(true);
      await axios.post('https://vehicle-hub-server-delta.vercel.app/bookVehicles', booking);

      Swal.fire({
        title: '<span style="font-weight: 900; letter-spacing: 2px;">CONFIRMED</span>',
        html: `<p style="opacity: 0.7;">${vehicle.vehicleName} is now under your command.</p>`,
        icon: 'success',
        confirmButtonText: 'Done',
        confirmButtonColor: 'oklch(var(--p))',
        background: 'oklch(var(--b2))',
        color: 'oklch(var(--bc))',
        customClass: {
          popup: 'rounded-xl border border-base-content/10',
          confirmButton: 'rounded-lg px-8 py-3 font-bold'
        }
      })
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'DENIED', text: 'Engine failure. Try again.' });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <div className="w-16 h-1 bg-primary animate-pulse"></div>
      <p className="mt-4 font-black tracking-[1em] text-[10px] text-primary">INITIALIZING</p>
    </div>
  );

  if (!vehicle) return <p className="text-center mt-20 text-error font-black uppercase">Unit Not Found</p>;

  const { vehicleName, coverImage, description, owner, userEmail, pricePerDay, category, availability, ratings, location } = vehicle;

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-['Outfit']">

      {/* Top Nav */}
      <nav className="border-b border-base-content/5 py-6">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <Link to="/apps" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] hover:text-primary transition-colors">
            <FiArrowLeft /> Return to Fleet
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {/* কালার ২: Secondary Status Dot */}
              <div className={`w-2 h-2 rounded-full ${availability ? 'bg-secondary shadow-[0_0_10px_oklch(var(--s))]' : 'bg-error'} animate-pulse`} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{availability ? 'Ready for Drive' : 'Reserved'}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Image Showcase */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-[4/5] bg-base-200 overflow-hidden rounded-2xl border border-base-content/5"
            >
              <img src={coverImage} alt={vehicleName} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />

              {/* কালার ১: Primary Badge */}
              <div className="absolute top-10 left-10 bg-primary text-primary-content px-6 py-2 font-black text-xs uppercase tracking-[0.2em]">
                {category}
              </div>

              <div className="absolute bottom-10 left-10">
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter drop-shadow-2xl">
                  {vehicleName}
                </h1>
              </div>
            </motion.div>
          </div>

          {/* Right: Info Dashboard */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-10">

            {/* কালার ২: Secondary (Price Block) */}
            <div className="p-8 bg-secondary/5 border-l-4 border-secondary">
              <span className="text-[11px] font-black text-secondary uppercase tracking-[0.5em]">Daily Subscription</span>
              <div className="flex items-baseline gap-4 mt-2">
                <h2 className="text-7xl font-black text-base-content tracking-tighter">${pricePerDay}</h2>
                <span className="text-xl font-bold opacity-30 italic">/ 24h</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <FiZap />
                <h3 className="text-xs font-black uppercase tracking-widest">Specifications</h3>
              </div>
              <p className="text-lg text-base-content/60 leading-relaxed font-light">{description}</p>
            </div>

            {/* Status Grid (কালার ৩: Accent used for Icons & Labels) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-base-200/50 rounded-xl border border-base-content/5">
                <FiMapPin className="text-accent mb-3 text-xl" />
                <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Location</p>
                <p className="font-bold text-sm uppercase">{location}</p>
              </div>
              <div className="p-6 bg-base-200/50 rounded-xl border border-base-content/5">
                <FiStar className="text-accent mb-3 text-xl" />
                <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Rating</p>
                <p className="font-bold text-sm uppercase">{ratings} / 5.0</p>
              </div>
              <div className="p-6 bg-base-200/50 rounded-xl border border-base-content/5">
                <FiUser className="text-accent mb-3 text-xl" />
                <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Dealer</p>
                <p className="font-bold text-sm uppercase truncate">{owner}</p>
              </div>
              <div className="p-6 bg-base-200/50 rounded-xl border border-base-content/5">
                <FiShield className="text-accent mb-3 text-xl" />
                <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Security</p>
                <p className="font-bold text-sm uppercase">Full Insured</p>
              </div>
            </div>

            {/* Action Block (কালার ১: Primary Button) */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddBooking}
                disabled={bookingLoading || !availability}
                className="w-full h-20 bg-primary text-primary-content font-black text-xl uppercase tracking-[0.2em] shadow-xl disabled:opacity-20 transition-all flex items-center justify-center gap-4 group"
              >
                {bookingLoading ? <span className="loading loading-spinner"></span> : (
                  <>
                    Confirm Reservation
                    <FiTruck className="group-hover:translate-x-4 transition-transform duration-500" />
                  </>
                )}
              </motion.button>

              {/* Accent decoration line */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-[2px] flex-grow bg-accent/20" />
                <span className="text-[9px] font-black text-accent uppercase tracking-[0.4em] opacity-50 whitespace-nowrap">Premium Automotive Experience</span>
                <div className="h-[2px] flex-grow bg-accent/20" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
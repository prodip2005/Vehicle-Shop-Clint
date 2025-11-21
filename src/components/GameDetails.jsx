import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaDollarSign, FaStar, FaMapMarkerAlt, FaCar, FaUser, FaEnvelope, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import axios from "axios";

export default function GameDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookNow, setBookNow] = useState(false);
  const handleAddBooking = () => {
    setBookNow(true)
    
  }

  useEffect(() => {
    if (bookNow && vehicle) {
      axios.post('http://localhost:3000/bookVehicles', vehicle).then(res => {
        alert(res.data.message);
       
        
      }).catch(err => {
        if (err.response) {
          alert(err.response.data.message)
        }
        else {
          console.log(err);
        }
        
      }).finally(() => {
        setBookNow(false)
      })
    }
    
    
  },[bookNow, vehicle])

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/allVehicles/${id}`)
      .then(res => {
        setVehicle(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!vehicle) return <p className="text-center mt-10 text-white">Vehicle not found</p>;

  const { _id, vehicleName, coverImage, description, owner, userEmail, pricePerDay, category, availability, ratings, location, createdAt } = vehicle;
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A";

  const containerVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, exit: { opacity: 0, y: -20, transition: { duration: 0.4 } } };
  const imageVariants = { hidden: { scale: 1.05, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 md:px-12 py-12">
      <AnimatePresence mode="wait">
        <motion.div key={_id} variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-6xl mx-auto bg-gray-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md border border-white/10">
          <motion.img variants={imageVariants} initial="hidden" animate="visible" src={coverImage} alt={vehicleName} className="w-full h-80 md:h-[500px] object-cover rounded-t-3xl shadow-lg" />

          <div className="p-6 md:p-10 space-y-8">
            <header className="border-b border-white/10 pb-4">
              <div className="flex justify-between items-start">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">{vehicleName}</h1>
                <span className="flex items-center text-xl font-bold text-yellow-400 bg-gray-700/50 px-4 py-2 rounded-full shadow-inner">
                  <FaStar className="mr-2" /> {ratings}
                </span>
              </div>
              <p className="text-xl font-semibold text-green-400 mt-2 flex items-center">
                <FaDollarSign className="mr-1 h-6 w-6" /> {pricePerDay} <span className="text-base text-gray-400 ml-1 font-normal">/ day</span>
              </p>
            </header>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400">Description</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <DetailItem icon={FaCar} label="Category" value={category} />
                <DetailItem icon={FaMapMarkerAlt} label="Location" value={location} />
                <DetailItem icon={FaUser} label="Owner" value={owner} />
                <DetailItem icon={FaEnvelope} label="Contact Email" value={userEmail} isEmail={true} />
                <DetailItem icon={FaCalendarAlt} label="Listed Since" value={formattedDate} />
                <DetailItem icon={FaCar} label="Availability" value={availability ? 'Available' : 'Booked'} isAvailable={availability} />
              </div>
            </section>

            {/* Buttons: Book button removed completely */}
            <div className="flex flex-col md:flex-row gap-2 mx-auto justify-center items-center pt-6 border-t border-white/10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <button
                  onClick={handleAddBooking}
                  className="flex items-center justify-center w-full px-8 py-4 rounded-xl shadow-lg 
               font-bold text-lg bg-green-600 text-white hover:bg-green-700 
               transition duration-300"
                >
                  Book Vehicle Now
                </button>
              </motion.div>



              {/* Update Button (visible only if you add owner-check later) */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Link to={`/update/${_id}`} className="flex items-center justify-center w-full px-8 py-4 rounded-xl shadow-lg font-bold text-lg border border-yellow-500 text-yellow-400 transition duration-300 bg-yellow-500/10 hover:bg-yellow-500/20">
                  <FaEdit className="mr-2" /> Update Vehicle
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Link to="/apps" className="flex items-center justify-center w-full px-8 py-4 rounded-xl shadow-lg font-bold text-lg border border-white/30 text-white transition duration-300 bg-white/10 hover:bg-white/20">
                  Back to Fleet
                </Link>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const DetailItem = ({ icon: Icon, label, value, isAvailable, isEmail = false }) => (
  <div className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-lg">
    <Icon className={`h-5 w-5 ${isAvailable === true ? 'text-green-400' : isAvailable === false ? 'text-red-400' : 'text-blue-400'}`} />
    <div>
      <span className="text-sm font-medium text-gray-400">{label}:</span>
      {isEmail ? <a href={`mailto:${value}`} className="block font-semibold text-white hover:underline transition">{value}</a> : <span className="block font-semibold text-white">{value}</span>}
    </div>
  </div>
);

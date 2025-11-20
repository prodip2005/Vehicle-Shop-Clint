// src/components/My_Bookings.jsx
import React from 'react';
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCar, FaMoneyBillWave } from "react-icons/fa";
import { useOutletContext } from "react-router";

const My_Bookings = () => {
    // ⬅️ MainSection থেকে ডেটা নিন
    const { myBookings: bookedVehicles, removeBooking } = useOutletContext();

    return (
        <div className="overflow-x-auto min-h-screen bg-gray-900 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">My Bookings ({bookedVehicles.length})</h2>

            {bookedVehicles.length === 0 ? (
                <div className="text-center p-10 bg-gray-800 rounded-xl text-gray-400">
                    <FaCar className="text-6xl mx-auto mb-4 text-blue-500" />
                    <p className="text-xl">You have no active bookings yet.</p>
                    <p className="mt-2">Go to the details page of a vehicle to add it to your bookings.</p>
                </div>
            ) : (
                <table className="table w-full text-white bg-gray-800 rounded-xl shadow-lg">
                    {/* head */}
                    <thead>
                        <tr className="border-b border-gray-700 text-gray-300">
                            <th>#</th>
                            <th>Vehicle Name</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Price/Day</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedVehicles.map((vehicle, index) => (
                            <motion.tr
                                key={vehicle.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="hover:bg-gray-700 border-b border-gray-700"
                            >
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={vehicle.coverImage}
                                                    alt={vehicle.vehicleName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">{vehicle.vehicleName}</div>
                                            <div className="text-sm opacity-50">{vehicle.owner}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-sm bg-blue-500/20 text-blue-300">{vehicle.category}</span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-red-400" />
                                        {vehicle.location}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2 font-semibold">
                                        <FaMoneyBillWave className="text-green-400" />
                                        {vehicle.pricePerDay} BDT
                                    </div>
                                </td>
                                <th className='flex gap-3'>
                                    <button
                                        onClick={() => removeBooking(vehicle.id)} // ⬅️ removeBooking কল করা
                                        className="btn btn-error btn-sm text-white hover:bg-red-700 transition duration-200"
                                    >
                                        Cancel Booking
                                    </button>
                                    
                                    <button
                                        
                                        className="btn btn-error btn-sm text-white hover:bg-red-700 transition duration-200"
                                    >
                                        Buy Vehicle
                                    </button>
                                </th>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default My_Bookings;
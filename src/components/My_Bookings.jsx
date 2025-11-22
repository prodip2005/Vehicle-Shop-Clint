import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const My_Bookings = () => {
    const [book, setBook] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/bookVehicles?email=${user.email}`)
                .then(res => {
                    setBook(res.data || []);
                })
                .catch(err => {
                    console.error('Failed to fetch bookings:', err);
                });
        }
    }, [user?.email]);


    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/bookVehicles/${_id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your booking has been deleted.",
                            icon: "success"
                        });
                        // UI থেকে সরাসরি row remove
                        setBook(prev => prev.filter(b => b._id !== _id));
                    })
                    .catch(err => {
                        console.error('Delete failed:', err);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete booking.",
                            icon: "error"
                        });
                    });
            }
        });
    };



    return (
        <div className="overflow-x-auto">
            <div className="booking-chip">My Bookings: {book.length}</div>
            {
                book.length === 0 ? <p className='flex justify-center items-center pt-6 font-black text-2xl text-gray-400'>No Vehicle added to Booking</p> : <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Owner</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book.map(vehicle => (
                            <tr key={vehicle._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={vehicle.coverImage || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                                                    alt={vehicle.vehicleName}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{vehicle.vehicleName}</div>
                                            <div className="text-sm opacity-50">{vehicle.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{vehicle.owner}</td>
                                <td>{vehicle.pricePerDay}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(vehicle._id)}
                                        className="btn btn-error text-white btn-xs"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            
            }
          
        </div>
    );
};

export default My_Bookings;

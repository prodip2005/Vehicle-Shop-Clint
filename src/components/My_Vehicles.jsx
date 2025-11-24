// My_Vehicles.jsx
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router'; // <-- added only this import

const My_Vehicles = () => {
    const { user } = use(AuthContext)
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        if (user?.email) {
            axios.get(`https://vehicle-hub-server-delta.vercel.app/allVehicles?userEmail=${user.email}`).then(res => {
                setdata(res.data);
                // console.log(res.data);
            }).catch(err => {
                // console.log(err);

            }).finally(() => {
                setLoading(false)
            })
        }
        else {
            setLoading(false)
        }

    }, [user?.email])

    if (loading) {
        return (<span className="loading loading-ring loading-xl"></span>)

    }

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
                axios.delete(`https://vehicle-hub-server-delta.vercel.app/allVehicles/${_id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Vehicle has been deleted.",
                            icon: "success"
                        });
                        // UI থেকে সরাসরি row remove
                        setdata(prev => prev.filter(b => b._id !== _id));
                    })
                    .catch(err => {
                        // console.error('Delete failed:', err);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete vehicle.",
                            icon: "error"
                        });
                    });
            }
        });
    };
    return (
        <div className="overflow-x-auto">
            <div className="booking-chip">My Vehicles:{data.length}</div>
            {
                data.length === 0 ? <p className='flex justify-center items-center pt-6 font-black text-2xl text-gray-400'>No Vehicle added to Booking</p> : <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Owner</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(vehicle => (
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
                                <td className="flex gap-2">
                                    {/* Update button (navigates to update page). Route param name should match your route, e.g. /updateVehicle/:_id */}
                                    <Link to={`/updateVehicle/${vehicle._id}`} className="btn btn-xs btn-warning text-black">
                                        Update
                                    </Link>

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

export default My_Vehicles;

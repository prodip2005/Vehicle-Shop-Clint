import React from 'react';
import axios from 'axios';

const My_Book = ({ vehicle, onDelete }) => {

    const handleDelete = () => {
        if (!vehicle._id) {
            alert('Vehicle ID not found!');
            return;
        }

        // MongoDB _id স্ট্রিং হিসেবে রিকোয়েস্টে পাঠানো হচ্ছে
        axios.delete(`http://localhost:3000/bookVehicles/${vehicle._id}`)
            .then(res => {
                alert(res.data.message); // Success message
                onDelete(vehicle._id); // parent component কে update করার জন্য notify
            })
            .catch(err => {
                console.error('Delete Error:', err);
                alert('Failed to delete vehicle.');
            });
    }


    return (
        <tr>
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
            <td>{vehicle.ownerName}</td> {/* ownerName ব্যবহার করা হয়েছে */}
            <td>${vehicle.pricePerDay}</td>
            <td>
                <button
                    onClick={handleDelete}
                    className="btn btn-error text-white btn-xs"
                >
                    remove
                </button>
            </td>
        </tr>
    );
};

export default My_Book;
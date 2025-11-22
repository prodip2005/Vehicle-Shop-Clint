// My_Book.js
import React from 'react';

const My_Book = ({ vehicle }) => {
    
    const handleDelete = (_id) => {
        
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
            <td>{vehicle.owner}</td>
            <td>{vehicle.pricePerDay}</td>
            <td>
                <button onClick={()=>handleDelete(vehicle._id)} className="btn  btn-error text-white btn-xs">remove</button>
            </td>
        </tr>
    );
};

export default My_Book;

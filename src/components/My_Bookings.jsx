import axios from 'axios';
import React, { useEffect, useState } from 'react';
import My_Book from './My_Book';

const My_Bookings = () => {
    const [book, setBook] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/bookVehicles')
            .then(res => {
                setBook(res.data);
            })
            .catch(err => console.error('Fetch Error:', err));
    }, []);

    const handleDeleteFromList = (id) => {
        // id স্ট্রিং হিসেবেই আছে, তাই parseInt এর দরকার নেই
        setBook(prevBook => prevBook.filter(v => v._id !== id));
    }


    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Booked Vehicles</h2>
            {book.length === 0 ? (
                <p className="text-gray-500">You have no vehicles booked.</p>
            ) : (
                <table className="table w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Owner</th>
                            <th className="p-3 text-left">Price (Per Day)</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book.map(vehicle => (
                            <My_Book key={vehicle._id} vehicle={vehicle} onDelete={handleDeleteFromList} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default My_Bookings;
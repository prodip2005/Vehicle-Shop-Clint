// My_Bookings.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import My_Book from './My_Book';

const My_Bookings = () => {
    const [book, setBook] = useState([]);

    const fetchBookings = () => {
        axios.get('http://localhost:3000/bookVehicles')
            .then(res => {
                // res.data will include booking docs with string _id (as backend maps them)
                setBook(res.data || []);
            })
            .catch(err => {
                console.error('Failed to fetch bookings:', err);
            });
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleDeleteFromList = (id) => {
        // id is a string — filter by string equality
        setBook(prev => prev.filter(v => v._id !== id));
    };

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
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
                        <My_Book
                            key={vehicle._id}
                            vehicle={vehicle}
                            onDelete={handleDeleteFromList}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default My_Bookings;

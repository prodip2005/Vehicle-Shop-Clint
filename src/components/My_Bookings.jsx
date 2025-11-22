// My_Bookings.js
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import My_Book from './My_Book';
import { AuthContext } from '../provider/AuthProvider';

const My_Bookings = () => {
    const [book, setBook] = useState([]);
    const { user } = use(AuthContext);
    
    

    

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

   

    return (
        <div className="overflow-x-auto">
            <div className="booking-chip">My Bookings:{book.length}</div>
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
                           
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default My_Bookings;

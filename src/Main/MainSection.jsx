import React, { useState, useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Newsletter from '../components/Newsletter';
import usePageTitle from '../hooks/usePageTitle';

const MainSection = () => {
    usePageTitle();
    const { state } = useNavigation();

    const [user, setUser] = useState(null); // replace with real auth when available

    const [myBookings, setMyBookings] = useState(() => {
        try {
            const stored = localStorage.getItem("myBookingsList");
            const parsed = stored ? JSON.parse(stored) : [];
            return parsed.map(v => ({
                ...v,
                id: v.id || v._id || `${v.vehicleName}-${v.userEmail || ''}-${Math.abs(hashCode(v.vehicleName || ''))}`
            }));
        } catch (e) {
            console.error("Error loading bookings:", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("myBookingsList", JSON.stringify(myBookings));
        } catch (e) {
            console.error("Error saving bookings:", e);
        }
    }, [myBookings]);

    function hashCode(s = '') {
        let h = 0;
        for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i) | 0;
        return h;
    }

    const addBooking = (vehicle) => {
        const id = vehicle.id || vehicle._id || `${vehicle.vehicleName}-${vehicle.userEmail || ''}-${Math.abs(hashCode(vehicle.vehicleName || ''))}`;
        const booking = { ...vehicle, id };

        const isAlreadyAdded = myBookings.some(v => v.id === booking.id);
        if (isAlreadyAdded) {
            alert(`${vehicle.vehicleName} is already booked!`);
            return;
        }

        setMyBookings(prev => [...prev, booking]);
        alert(`${vehicle.vehicleName} successfully added to your bookings!`);
    };

    const removeBooking = (id) => {
        setMyBookings(prev => prev.filter(v => v.id !== id));
        alert("Booking cancelled successfully!");
    };

    return (
        <div className='min-h-screen2'>
            <Navbar user={user} />
            {state === 'loading' ? <Loading /> : (
                <Outlet context={{ myBookings, addBooking, removeBooking, user }} />
            )}
            <Newsletter />
            <Footer />
        </div>
    );
};

export default MainSection;

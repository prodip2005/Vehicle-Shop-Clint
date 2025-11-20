import React from 'react';
import { Link } from 'react-router';
import { FaDollarSign, FaStar, FaTag } from 'react-icons/fa';

const App = ({ singleData }) => {
    if (!singleData) return null;
    const { _id, vehicleName, coverImage, category, pricePerDay, ratings } = singleData;

    return (
        <Link to={`/details/${_id}`}>
            <div className="p-4 rounded-xl shadow-lg bg-gray-800 text-white hover:shadow-2xl transition">
                <img src={coverImage} alt={vehicleName} className="rounded-lg w-full h-48 object-cover mb-4" />
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">{vehicleName}</span>
                    <span className="flex items-center text-yellow-400"><FaStar className="mr-1" />{ratings}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="flex items-center text-green-400"><FaDollarSign className="mr-1" />{pricePerDay}</span>
                    <span className="bg-blue-500 px-2 py-1 rounded">{category}</span>
                </div>
            </div>
        </Link>
    );
};

export default App;

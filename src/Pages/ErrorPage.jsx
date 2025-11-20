// ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {

    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <div className="text-center bg-white p-5 rounded-md shadow-lg">

                <h1 className="text-8xl font-extrabold text-[#ff5733] sm:text-7xl">
                    404
                </h1>

                <p className="text-xl text-gray-800 mb-5 mt-2">
                    Oops! The page you're
                    looking for is not here.
                </p>

                <Link
                    to="/" 
                    className="inline-block no-underline bg-[#ff5733] text-white py-2 px-4 rounded font-bold transition duration-300 hover:bg-[#e6482e]"
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
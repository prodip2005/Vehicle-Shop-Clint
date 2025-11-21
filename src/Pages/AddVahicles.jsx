import React, { useState } from 'react';

const AddVahicles = () => {
    // State to hold form data (optional, but good practice for controlled components)
    const [formData, setFormData] = useState({
        vehicleName: '',
        ownerName: '',
        category: '',
        pricePerDay: '',
        location: '',
        availability: true, // Assuming default is available
        description: '',
        coverImage: '', // CHANGED: Now storing a string (URL) instead of a File object
        userEmail: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle form submission (Example)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // You would typically send this data to an API here
        alert('Form data logged to console!');
    };

    // Tailwind CSS classes for consistent styling
    const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";
    const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 border-b pb-4">
                    🚗 Add New Vehicle Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Vehicle Name */}
                    <div>
                        <label htmlFor="vehicleName" className={labelStyle}>Vehicle Name</label>
                        <input
                            type="text"
                            id="vehicleName"
                            name="vehicleName"
                            value={formData.vehicleName}
                            onChange={handleChange}
                            className={inputStyle}
                            placeholder="e.g., Toyota Corolla, Honda CBR"
                            required
                        />
                    </div>

                    {/* Owner Name & Category - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Owner Name */}
                        <div>
                            <label htmlFor="ownerName" className={labelStyle}>Owner Name</label>
                            <input
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleChange}
                                className={inputStyle}
                                placeholder="Owner's Full Name"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className={labelStyle}>Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={inputStyle}
                                required
                            >
                                <option value="" disabled>Select Vehicle Category</option>
                                <option value="Car">Car</option>
                                <option value="Motorcycle">Motorcycle</option>
                                <option value="Truck">Truck</option>
                                <option value="Bicycle">Bicycle</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Price Per Day & Location - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price Per Day */}
                        <div>
                            <label htmlFor="pricePerDay" className={labelStyle}>Price Per Day (USD)</label>
                            <input
                                type="number"
                                id="pricePerDay"
                                name="pricePerDay"
                                value={formData.pricePerDay}
                                onChange={handleChange}
                                className={inputStyle}
                                placeholder="Enter Price (e.g., 50)"
                                min="0"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className={labelStyle}>Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={inputStyle}
                                placeholder="City or Area Name"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className={labelStyle}>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className={inputStyle}
                            placeholder="Provide a detailed description of the vehicle..."
                            required
                        ></textarea>
                    </div>

                    {/* Cover Image & User Email - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cover Image (UPDATED to Text Input) */}
                        <div>
                            <label htmlFor="coverImage" className={labelStyle}>Cover Image URL</label>
                            <input
                                type="text" // CHANGED: From 'file' to 'text'
                                id="coverImage"
                                name="coverImage"
                                value={formData.coverImage} // Bind value to state
                                onChange={handleChange}
                                className={inputStyle}
                                placeholder="Paste Image URL (e.g., https://example.com/image.jpg)"
                                required
                            />
                        </div>

                        {/* User Email */}
                        <div>
                            <label htmlFor="userEmail" className={labelStyle}>User Email</label>
                            <input
                                type="email"
                                id="userEmail"
                                name="userEmail"
                                value={formData.userEmail}
                                onChange={handleChange}
                                className={inputStyle}
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Add Vehicle 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddVahicles;
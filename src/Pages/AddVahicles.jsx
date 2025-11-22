// AddVahicles.jsx
import React from 'react';

const AddVahicles = () => {

    const handleAddVehicle = () => {
        
    }

    return (
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Vehicle</h2>
            <form onSubmit={handleAddVehicle} className="space-y-4">
                <input type="text" name="vehicleName" placeholder="Vehicle Name" className="input input-bordered w-full" />
                <input type="text" name="owner" placeholder="Owner" className="input input-bordered w-full" />
                <input type="text" name="category" placeholder="Category" className="input input-bordered w-full" />
                <input type="number" name="pricePerDay" placeholder="Price per Day" className="input input-bordered w-full" />
                <input type="text" name="location" placeholder="Location" className="input input-bordered w-full" />
                <input type="text" name="availability" placeholder="Availability" className="input input-bordered w-full" />
                <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
                <input type="text" name="coverImage" placeholder="Cover Image URL" className="input input-bordered w-full" />
                <input type="email" name="userEmail" placeholder="User Email" className="input input-bordered w-full" />
                <input type="date" name="createdAt" placeholder="Created At" className="input input-bordered w-full" />
                <input type="text" name="categories" placeholder="Categories" className="input input-bordered w-full" />
                <input type="number" name="ratings" placeholder="Ratings" className="input input-bordered w-full" />

                <button type="submit" className="btn btn-primary w-full mt-4">Add Vehicle</button>
            </form>
        </div>
    );
};

export default AddVahicles;

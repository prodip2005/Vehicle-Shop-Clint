// AddVahicles.jsx
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const AddVahicles = () => {

    const handleAddVehicle = (e) => {
        e.preventDefault();
        const vehicleName = e.target.vehicleName.value;
        const owner = e.target.owner.value;
        const category = e.target.category.value;
        const pricePerDay = e.target.pricePerDay.value;
        const location = e.target.location.value;
        const availability = e.target.availability.value;
        const description = e.target.description.value;
        const coverImage = e.target.coverImage.value;
        const userEmail = e.target.userEmail.value;
        const createdAt = e.target.createdAt.value;
        const categories = e.target.category.value;
        const ratings = e.target.ratings.value;

        const newdata = { vehicleName, owner, category, pricePerDay, location, availability, description, coverImage, userEmail, createdAt, categories, ratings };

        axios.post('http://localhost:3000/allVehicles',newdata).then(res => {
            console.log('posted all data', res.data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Vehicle Added",
                showConfirmButton: false,
                timer: 1500
            });
            e.target.reset();
            
        })
        
        
        console.log(vehicleName,owner,category,pricePerDay,location,availability,description,coverImage,userEmail,createdAt,ratings);
        
    }

    return (
        <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center bg-clip-text text-transparent 
               bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-md">
                Add Vehicle
            </h2>

            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md mx-auto mt-10">
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

                    <input type="number" name="ratings" placeholder="Ratings" className="input input-bordered w-full" />

                    <button type="submit" className="btn btn-primary w-full mt-4">Add Vehicle</button>
                </form>
            </div>
        </div>
    );
};

export default AddVahicles;

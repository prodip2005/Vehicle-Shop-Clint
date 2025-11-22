import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';

const UpdateVehicle = () => {

    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/allVehicles/${id}`)
            .then(res => {
                setData(res.data);
        })
    },[id])
    


    const handleUpdateVehicle = (e) => {
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

        console.log(newdata );
        
        axios.put(`http://localhost:3000/allVehicles/${id}`, newdata).then(res => {
            console.log(res);
            Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Information Updated",
                            showConfirmButton: false,
                            timer: 1500
                        });
            
        })
            .catch(error => {
            console.log(error);
            
        })

        console.log(vehicleName, owner, category, pricePerDay, location, availability, description, coverImage, userEmail, createdAt, ratings);

    }
    return (

        
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Vehicle</h2>
            <form onSubmit={handleUpdateVehicle} className="space-y-4">
                <input  defaultValue={data?.vehicleName} type="text" name="vehicleName" placeholder="Vehicle Name" className="input input-bordered w-full" />
                <input  defaultValue={data?.owner} type="text" name="owner" placeholder="Owner" className="input input-bordered w-full" />
                <input  defaultValue={data?.category} type="text" name="category" placeholder="Category" className="input input-bordered w-full" />
                <input  defaultValue={data?.pricePerDay} type="number" name="pricePerDay" placeholder="Price per Day" className="input input-bordered w-full" />
                <input  defaultValue={data?.location} type="text" name="location" placeholder="Location" className="input input-bordered w-full" />
                <input  defaultValue={data?.availability} type="text" name="availability" placeholder="Availability" className="input input-bordered w-full" />
                <textarea  defaultValue={data?.description} name="description" placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
                <input  defaultValue={data?.coverImage} type="text" name="coverImage" placeholder="Cover Image URL" className="input input-bordered w-full" />
                <input readOnly  defaultValue={data?.userEmail} type="email" name="userEmail" placeholder="User Email" className="input  text-gray-500 input-bordered w-full" />
                <input  defaultValue={data?.createdAt} type="date" name="createdAt" placeholder="Created At" className="input input-bordered w-full" />
                <input  defaultValue={data?.ratings} type="number" name="ratings" placeholder="Ratings" className="input input-bordered w-full" />

                <button type="submit" className="btn btn-primary w-full mt-4">Update Vehicle</button>
            </form>
        </div>
    );
};

export default UpdateVehicle;
// src/Pages/UpdateProfile.jsx

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router';
import { getExtras, setExtras } from '../utils/storage';

const UpdateProfile = () => {
    const { user, loading, updateUser, updateUserPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');


    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        photoURL: user?.photoURL || '',
        newPassword: '',
        occupation: '',
        location: '',
        phone: '',
        facebook: '',
        github: '',
        linkedin: '',
    });

   
    useEffect(() => {
        const saved = getExtras(user);
        if (saved) {
            setFormData(prev => ({
                ...prev,
                ...saved,
                name: user?.displayName || prev.name,
                photoURL: user?.photoURL || prev.photoURL,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                name: user?.displayName || prev.name,
                photoURL: user?.photoURL || prev.photoURL,
               
            }));
        }
    }, [user]);

    if (loading) {
        return <p className="text-center my-20 text-xl">Loading user data...</p>;
    }

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async e => {
        e.preventDefault();
        setUpdateError('');
        setUpdateSuccess('');

        const {
            name,
            photoURL,
            newPassword,
            occupation,
            location,
            phone,
            facebook,
            github,
            linkedin,
        } = formData;

        try {
            
            if (name !== user?.displayName || photoURL !== user?.photoURL) {
                await updateUser({ displayName: name, photoURL });
            }

          
            if (newPassword) {
                await updateUserPassword(newPassword);
            }

            setExtras(user, {
                occupation,
                location,
                phone,
                facebook,
                github,
                linkedin,
            });

            setUpdateSuccess('Profile updated successfully! Redirecting...');

            setTimeout(() => {
                navigate('/profile');
            }, 1200);
        } catch (error) {
            // console.error('Profile Update Error:', error);
            setUpdateError(
                `Update Failed: ${error.message}. You might need to log in again to change your password.`
            );
        }
    };

    return (
        <div className="bg-base-200 min-h-screen p-4 flex justify-center items-start">
            <div className="max-w-xl w-full mx-auto my-10 bg-base-100 border border-base-300 rounded-2xl shadow p-6 space-y-4">
                <h1 className="text-3xl font-bold text-center mb-6">Update Your Profile</h1>

                {updateSuccess && <p className="text-green-600 font-bold text-center">{updateSuccess}</p>}
                {updateError && <p className="text-red-600 font-bold text-center">{updateError}</p>}

                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Display Name */}
                    <div>
                        <label className="label">Display Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                        />
                    </div>

                    {/* Profile Photo URL */}
                    <div>
                        <label className="label">Profile Photo URL</label>
                        <input
                            type="url"
                            name="photoURL"
                            value={formData.photoURL}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter image URL"
                        />
                        <div className="mt-2 text-center">
                            {formData.photoURL ? (
                                <img
                                    src={formData.photoURL}
                                    alt="Preview"
                                    className="w-20 h-20 rounded-full mx-auto object-cover border border-gray-300"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full mx-auto border border-dashed grid place-items-center text-xs opacity-60">
                                    No Image
                                </div>
                            )}
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="label">New Password (Leave blank to keep current)</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="New Password (min 6 characters)"
                        />
                    </div>

                    {/* Social & Extras */}
                    <h2 className="text-xl font-semibold pt-4">Social Links & Info</h2>

                    {/* Occupation */}
                    <div>
                        <label className="label">Occupation / Work Title</label>
                        <input
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="e.g. Frontend Developer, MERN Stack Dev, UI Designer"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="label">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="City, Country"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="label">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="+880 1X-XXXX-XXXX"
                        />
                    </div>

                    {/* Facebook */}
                    <div>
                        <label className="label">Facebook Link</label>
                        <input
                            type="url"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="https://facebook.com/your-profile"
                        />
                    </div>

                    {/* GitHub */}
                    <div>
                        <label className="label">GitHub Link</label>
                        <input
                            type="url"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="https://github.com/username"
                        />
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label className="label">LinkedIn Link</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="https://www.linkedin.com/in/username"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-6">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;

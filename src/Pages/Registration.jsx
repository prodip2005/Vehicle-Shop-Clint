import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';

const Registration = () => {
    const [nameError, setNameError] = useState('');
    const [error, setError] = useState('');
    const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;


        if (name.length <= 5) {
            setNameError("Name must contain at least 6 characters");
            return;
        }


        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;

        if (!hasUpperCase) {
            setNameError("Password must contain at least one uppercase letter");
            return;
        }
        if (!hasLowerCase) {
            setNameError("Password must contain at least one lowercase letter");
            return;
        }
        if (!isValidLength) {
            setNameError("Password must be at least 6 characters long");
            return;
        }


        setNameError('');

        createUser(email, password)
            .then((res) => {
                const user = res.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        navigate('/');
                    })
                    .catch((error) => {
                        // console.error(error);
                        setUser(user);
                    });
            })
            .catch((error) => {
                alert(error.code + ': ' + error.message);
            });
    };

    const signInWithGoogle = () => {
        setError('');
        googleSignIn()
            .then(() => {
                navigate('/');
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl text-center font-bold">Register now!</h1>

                        <form onSubmit={handleRegister} className="fieldset">
                            {/* Name */}
                            <label className="label">Your Name(At least 6 character)</label>
                            <input
                                required
                                name="name"
                                type="text"
                                className="input input-bordered"
                                placeholder="Enter Full Name"
                            />

                            {/* Photo */}
                            <label className="label">User Photo(Short URL)</label>
                            <input
                                required
                                name="photo"
                                type="text"
                                className="input input-bordered"
                                placeholder="Photo URL"
                            />

                            {/* Email */}
                            <label className="label">Email</label>
                            <input
                                required
                                name="email"
                                type="email"
                                className="input input-bordered"
                                placeholder="Email"
                            />

                            {/* Password */}
                            <label className="label">Password</label>
                            <input
                                required
                                name="password"
                                type="password"
                                className="input input-bordered"
                                placeholder="Password"
                            />

                       

                            {/* Error message */}
                            {nameError && (
                                <p className="text-red-600 font-bold text-[15px] mt-2">{nameError}</p>
                            )}
                            {error && <p className='text-red-600 font-bold text-[15px]'>{error}</p>}

                            <button type="submit" className="btn btn-neutral mt-4 w-full">
                                Register
                            </button>
                            <button
                                type="button"
                                onClick={signInWithGoogle}
                                className="btn btn-neutral mt-4 flex items-center justify-center space-x-2"
                            >
                                <FcGoogle className='w-7 h-7' /> <span>Sign in With Google</span>
                            </button>
                        </form>

                        <h2 className="font-bold text-center mt-4">
                            Already have an account?{' '}
                            <Link to="/login" className="text-red-500 font-bold">
                                Login
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;

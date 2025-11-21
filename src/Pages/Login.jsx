import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [error, setError] = useState('');
    const [emailForReset, setEmailForReset] = useState('');
    const { signIn, passReset, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setError('');
        signIn(email, password)
            .then(() => {
                navigate(location.state || '/');
            })
            .catch((err) => setError(err.code || 'Login failed'));
    };

   

    const signInWithGoogle = () => {
        setError('');
        googleSignIn()
            .then(() => {
                navigate(location.state || '/');
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl text-center font-bold">Login now!</h1>

                        <form onSubmit={handleLogin} className="fieldset">
                            {/* Email */}
                            <label className="label">Email</label>
                            <input
                                required
                                name='email'
                                type="email"
                                className="input input-bordered"
                                placeholder="Email"
                                value={emailForReset}
                                onChange={(e) => setEmailForReset(e.target.value)}
                            />

                            {/* Password */}
                            <label className="label">Password</label>
                            <input
                                required
                                name='password'
                                type="password"
                                className="input input-bordered"
                                placeholder="Password"
                            />

                            

                            {error && <p className='text-red-600 font-bold text-[15px]'>{error}</p>}

                            <button type='submit' className="btn btn-neutral mt-4">Login</button>

                            <button
                                type="button"
                                onClick={signInWithGoogle}
                                className="btn btn-neutral mt-4 flex items-center justify-center space-x-2"
                            >
                                <FcGoogle className='w-7 h-7' /> <span>Sign in With Google</span>
                            </button>

                            <h2 className='font-bold mt-4'>
                                Don't have an Account?
                                <Link className='text-red-600 font-bold ml-1' to='/register'>Register</Link>
                            </h2>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

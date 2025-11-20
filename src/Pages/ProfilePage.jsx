
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { getExtras } from '../utils/storage';

const ProfilePage = () => {
    const { user, loading } = useContext(AuthContext);

  
    const [extras, setExtras] = useState({
        occupation: '',
        location: '',
        phone: '',
        github: '',
        linkedin: '',
        facebook: '',
    });


    useEffect(() => {
        const saved = getExtras(user);
        if (saved) setExtras(prev => ({ ...prev, ...saved }));
        else
            setExtras({
                occupation: '',
                location: '',
                phone: '',
                github: '',
                linkedin: '',
                facebook: '',
            });
    }, [user]);

    const userName = user?.displayName || 'Guest User';
    const userEmail = user?.email || 'N/A';
    const userPhotoURL =
        user?.photoURL ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9duKEBYAVzHQ9eUWKW84UCOCo2E1c-b3yAA&s';

    const mailHref = `mailto:${userEmail}`;
    const telHref = extras.phone
        ? `tel:${(extras.phone || '').replace(/[^\d+]/g, '')}`
        : undefined;

    return (
        <div className="bg-base-200 min-h-screen flex justify-center items-center p-4">
            {loading ? (
                <p className="text-xl my-20 font-semibold">Profile is Loading...</p>
            ) : (
                <div className="max-w-md w-full mx-auto my-10 bg-base-100 border border-base-300 rounded-2xl shadow-xl p-6 text-center space-y-5">
                 
                    <img
                        alt={userName}
                        src={userPhotoURL}
                        className="w-28 h-28 rounded-full mx-auto object-cover ring ring-primary ring-offset-2 ring-offset-base-100"
                    />

                
                    <h1 className="text-2xl font-bold">{userName}</h1>

                    <p className="text-sm opacity-80">
                        {(extras.occupation || '—')}{' '}
                        {extras.location ? `• ${extras.location}` : '• —'}
                    </p>

                 
                    <div className="text-sm flex items-center justify-center gap-3 flex-wrap border-t border-b py-3 border-base-200">
                     
                        <a
                            href={mailHref}
                            className="link inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2Z" /><path d="m22 6-10 7L2 6" /></svg>
                            {userEmail}
                        </a>

                
                        {extras.phone ? (
                            <a
                                href={telHref}
                                className="link inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.11a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z" /></svg>
                                {extras.phone}
                            </a>
                        ) : (
                            <span className="opacity-70 inline-flex items-center gap-1">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.11a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z" /></svg>
                                No phone set
                            </span>
                        )}
                    </div>

                   

                    <Link to="/update" className="block">
                        <button className="btn btn-primary w-full mt-4">Update Profile</button>
                    </Link>

                    <ul className="flex justify-center gap-2 pt-3">
                        <li>
                            <a
                                className="btn btn-xs"
                                aria-label="GitHub"
                                href={extras.github || '#'}
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                className="btn btn-xs"
                                aria-label="LinkedIn"
                                href={extras.linkedin || '#'}
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                className="btn btn-xs"
                                aria-label="Facebook"
                                href={extras.facebook || '#'}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Facebook
                            </a>
                        </li>
                    </ul>

                    <p className="text-xs opacity-70 pt-4 border-t border-base-200">
                        © <span>2025</span> Shadow Monarch
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

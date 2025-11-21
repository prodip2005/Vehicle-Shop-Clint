import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Newsletter from '../components/Newsletter';
import usePageTitle from '../hooks/usePageTitle';

const MainSection = () => {
    usePageTitle();
    const { state } = useNavigation();

    return (
        <div className="min-h-screen">
            <Navbar />
            {state === 'loading' ? <Loading /> : <Outlet />}
            <Newsletter />
            <Footer />
        </div>
    );
};

export default MainSection;

import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import PopularGames from './PopularGames';
// import { useLoaderData } from 'react-router';
import Newsletter from './Newsletter';
import axios from 'axios';

const Home = () => {
    // const data = useLoaderData()
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('https://vehicle-hub-server-delta.vercel.app/allVehicles')
            .then(res => {
                // console.log('Get all data', res.data);
                setData(res.data)

            })
    }, [])

    return (
        <div>
            <Banner />
            <PopularGames data={data} />
        </div>
    );
};

export default Home;
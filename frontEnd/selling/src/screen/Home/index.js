import React, { memo, useEffect } from 'react';
import './styles.css';

import Header from 'screen/Header';
import HomeOverView from './components/HomeOverView';
import HomeChart from './components/HomeChart';
import HomeFooter from './components/HomeFooter';
import HomeMessage from './components/HomeMessage';

import { useNavigate } from "react-router-dom";

import { getCookie } from "auth/cookie";

const Home = () => {

    const navigate = useNavigate();

    const selectedProviderCookie = getCookie('selectedProvider');
    // let selectedProvider = null;

    useEffect(() => {
        if (selectedProviderCookie) {
            // selectedProvider = JSON.parse(selectedProviderCookie);
        } else {
            navigate('/firstProvider');
        }
    }, [navigate, selectedProviderCookie])

    return (
        <div className='Home'>
            <Header />
            <div className='Home-main'>
                <div className='Home-center'>
                    <HomeOverView />
                    <HomeChart />
                    <HomeFooter />
                    <HomeMessage />
                </div>
            </div>
        </div>
    )
}

export default memo(Home);
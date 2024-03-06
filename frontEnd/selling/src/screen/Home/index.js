import React, { memo } from 'react';
import './styles.css';

import Header from 'screen/Header';
import HomeOverView from './components/HomeOverView';
import HomeChart from './components/HomeChart';
import HomeFooter from './components/HomeFooter';
import HomeMessage from './components/HomeMessage';

const Home = () => {

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
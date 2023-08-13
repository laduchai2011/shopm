import React from 'react';
import './styles.css';

import HomeRightBoxExamine from './components/HomeRightBoxExamine';
import HomeRightBoxAmbulance from './components/HomeRightBoxAmbulance';

const HomeRight = () => {
    return (
        <div className='HomeRight'>
            <div>
                <div className='HomeRight-boxExamine'>
                    <HomeRightBoxExamine />
                </div>
                <div className='HomeRight-boxAmbulance'>
                    <HomeRightBoxAmbulance />
                </div>
            </div>
        </div>
    )
}

export default HomeRight;
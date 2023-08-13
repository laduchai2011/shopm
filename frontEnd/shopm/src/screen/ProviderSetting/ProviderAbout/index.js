import React from 'react';
import './styles.css';

import Header from 'screen/Header';
import HeaderProviderSetting from '../components/HeaderProviderSetting';
import ProviderAboutHeader from './components/ProviderAboutHeader';
import ProviderAboutBody from './components/ProviderAboutBody';

const ProviderAbout = () => {
    window.scrollTo(0, 0);
    return (
        <div className='ProviderAbout'>
            <Header />
            <HeaderProviderSetting index={ 2 } />
            <div className="ProviderAbout-main">
                <ProviderAboutHeader index={ 0 } />
                <ProviderAboutBody />
            </div>
        </div>
    )
}

export default ProviderAbout;
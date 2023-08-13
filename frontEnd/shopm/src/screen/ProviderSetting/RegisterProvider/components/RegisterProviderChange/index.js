import React from 'react';
import './styles.css';

import Header from 'screen/Header';
import HeaderProviderSetting from 'screen/ProviderSetting/components/HeaderProviderSetting';
import RegisterProviderHeader from '../RegisterProviderHeader';

const RegisterProviderChange = () => {
    return (
        <div className='RegisterProviderChange'>
            <Header />
            <HeaderProviderSetting index={ 1 } />
            <RegisterProviderHeader index={ 1 } />
        </div>
    )
}

export default RegisterProviderChange;
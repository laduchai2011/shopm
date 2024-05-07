import React from 'react';
import './styles.css';

import Header from 'screen/Header';
import HeaderProviderSetting from 'screen/ProviderSetting/components/HeaderProviderSetting';
import RegisterProviderHeader from '../RegisterProviderHeader';
import RegisterProviderDeleteBody from './components/RegisterProviderDeleteBody';
import RegisterProviderToastMessage from '../RegisterProviderToastMessage';

const RegisterProviderDelete = () => {
    return (
        <div className='RegisterProviderDelete'>
            <Header />
            <HeaderProviderSetting index={ 1 } />
            <div className="RegisterProviderDelete-main">
                <RegisterProviderHeader index={ 2 } />
                <RegisterProviderDeleteBody />
            </div>
            <RegisterProviderToastMessage />
        </div>
    )
}

export default RegisterProviderDelete;
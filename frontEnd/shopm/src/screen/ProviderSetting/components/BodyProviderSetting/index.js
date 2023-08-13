import React from 'react';
import './styles.css';

import BodyProviderSettingTop from './components/BodyProviderSettingTop';
import BodyProviderSettingBottom from './components/BodyProviderSettingBottom';

const BodyProviderSetting = () => {
    return (
        <div className='BodyProviderSetting'>
            <BodyProviderSettingTop />
            <BodyProviderSettingBottom />
        </div>
    )
}

export default BodyProviderSetting;
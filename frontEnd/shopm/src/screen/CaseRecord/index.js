import React from 'react';
import './styles.css';

import Header from 'screen/Header';
import CaseRecordInfor from './components/CaseRecordInfor';
import CaseRecordPage from './components/CaseRecordPage';

const CaseRecord = () => {
    return (
        <div className='CaseRecord'>
            <Header />
            <div className='CaseRecord-main'>
                <div className='CaseRecord-main1'>
                    <CaseRecordInfor />
                    <CaseRecordPage />
                </div>
            </div>
        </div>
    )
}

export default CaseRecord;
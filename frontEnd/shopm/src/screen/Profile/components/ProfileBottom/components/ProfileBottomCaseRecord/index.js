import React, { memo, useContext } from 'react';
import './styles.css';

import ProfileBottomCaseRecordHeader from './components/ProfileBottomCaseRecordHeader';
import ProfileBottomCaseRecordBox from './components/ProfileBottomCaseRecordBox';

import { ProfileBottomContext } from '../../utilize/ProfileBottomContext';

const ProfileBottomCaseRecord = () => {

    const { caseRecords } = useContext(ProfileBottomContext);

    const list_caseRecordBox = caseRecords.map((data, index) => {
        return <ProfileBottomCaseRecordBox key={index} index={index} onData={data} />
    })
    
    return (
        <div className='ProfileBottomCaseRecord'>
            <ProfileBottomCaseRecordHeader />
            { list_caseRecordBox }
        </div>
    )
}

export default memo(ProfileBottomCaseRecord);
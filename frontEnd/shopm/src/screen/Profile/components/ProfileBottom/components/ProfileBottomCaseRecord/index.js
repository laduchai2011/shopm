import React, { memo } from 'react';
import './styles.css';

import ProfileBottomCaseRecordBox from './components/ProfileBottomCaseRecordBox';

const ProfileBottomCaseRecord = () => {
    const list_caseRecordBox = [1,2,3,4,5,6].map((data, index) => {
        return <ProfileBottomCaseRecordBox key={index} index={index} />
    })
    return (
        <div className='ProfileBottomCaseRecord'>
            { list_caseRecordBox }
        </div>
    )
}

export default memo(ProfileBottomCaseRecord);
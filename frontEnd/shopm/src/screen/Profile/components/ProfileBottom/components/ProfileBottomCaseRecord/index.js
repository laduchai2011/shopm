import React, { memo, useEffect } from 'react';
import './styles.css';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProfileBottomCaseRecordHeader from './components/ProfileBottomCaseRecordHeader';
import ProfileBottomCaseRecordBox from './components/ProfileBottomCaseRecordBox';

import { fetchBulkReadCaseRecord } from 'reduxStore/slice/profileCaseRecordSlice';

const ProfileBottomCaseRecord = () => {
    const fetching = useSelector((state) => state.profileCaseRecord.fetching);
    const caseRecords = useSelector((state) => state.profileCaseRecord.caseRecords);
    const emptyDB = useSelector((state) => state.profileCaseRecord.emptyDB);
    const dispatch = useDispatch();
    const { id: uuid_user } = useParams();

    useEffect(() => {
        let promise_fetchBulkReadCaseRecord;
        if (!fetching && caseRecords.length===0) {
            promise_fetchBulkReadCaseRecord = dispatch(fetchBulkReadCaseRecord(uuid_user));
        }

        return () => {
            promise_fetchBulkReadCaseRecord?.abort();
        }

        // eslint-disable-next-line
    }, [])

    window.onscroll = function() {
        const scrollable = window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight;
        if((scrollable > -10) && !fetching && !emptyDB) {
            dispatch(fetchBulkReadCaseRecord(uuid_user))
        }
    } 

    const list_caseRecordBox = caseRecords.map((data, index) => {
        return <ProfileBottomCaseRecordBox key={index} index={index} onData={data} />
    })
    
    return (
        <div className='ProfileBottomCaseRecord'>
            <ProfileBottomCaseRecordHeader />
            { caseRecords.length!==0 ? list_caseRecordBox : <div className='ProfileBottomCaseRecord-empty'>Empty</div>  }
        </div>
    )
}

export default memo(ProfileBottomCaseRecord);
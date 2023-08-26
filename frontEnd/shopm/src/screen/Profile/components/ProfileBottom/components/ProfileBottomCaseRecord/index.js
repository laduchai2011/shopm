import React, { memo, useEffect } from 'react';
import './styles.css';

import { useDispatch, useSelector } from 'react-redux';

import ProfileBottomCaseRecordHeader from './components/ProfileBottomCaseRecordHeader';
import ProfileBottomCaseRecordBox from './components/ProfileBottomCaseRecordBox';

import { SERVER_ADDRESS_GETLIST_CASERECORD } from 'config/server';

import { fetchBulkReadCaseRecord } from 'reduxStore/slice/profileCaseRecordSlice';

const ProfileBottomCaseRecord = () => {
    const fetching = useSelector((state) => state.profileCaseRecord.fetching);
    const caseRecords = useSelector((state) => state.profileCaseRecord.caseRecords);
    const emptyDB = useSelector((state) => state.profileCaseRecord.emptyDB);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!fetching && caseRecords.length===0) {
            dispatch(fetchBulkReadCaseRecord(SERVER_ADDRESS_GETLIST_CASERECORD));
        }
    }, [fetching, caseRecords, emptyDB, dispatch])

    window.onscroll = function() {
        const scrollable = window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight;
        if((scrollable > -10) && !fetching && !emptyDB) {
            dispatch(fetchBulkReadCaseRecord(SERVER_ADDRESS_GETLIST_CASERECORD))
        }
    } 

    const list_caseRecordBox = caseRecords.map((data, index) => {
        return <ProfileBottomCaseRecordBox key={index} index={index} onData={data} />
    })
    
    return (
        <div className='ProfileBottomCaseRecord'>
            <button onClick={() => dispatch(fetchBulkReadCaseRecord(SERVER_ADDRESS_GETLIST_CASERECORD))}>test</button>
            <ProfileBottomCaseRecordHeader />
            { list_caseRecordBox }
        </div>
    )
}

export default memo(ProfileBottomCaseRecord);
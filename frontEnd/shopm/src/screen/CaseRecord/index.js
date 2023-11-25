import React, { useState, useEffect } from 'react';
import './styles.css';

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Header from 'screen/Header';
import CaseRecordInfor from './components/CaseRecordInfor';
import CaseRecordPage from './components/CaseRecordPage';

import { getCookie } from 'auth/cookie';


const CaseRecord = () => {
    const { id: uuid_caseRecord } = useParams();
    const dispatch = useDispatch();

    const caseRecordRole = getCookie('caseRecordRole');
    const [caseRecordRoleState, setCaseRecordRoleState] = useState(false);
    const loadingCaseRecord = useSelector(state => state.caseRecord.loadingCaseRecord);

    useEffect(() => {
        dispatch({type: 'caseRecordInit', payload: uuid_caseRecord});

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const roles = ['patient', 'doctorOrPharmacist'];
        if (roles.indexOf(caseRecordRole) !== -1) {
            setCaseRecordRoleState(true);
        }
    }, [loadingCaseRecord, caseRecordRole])

    return (
        <div className='CaseRecord'>
            <Header />
            <div className='CaseRecord-main'>
                { caseRecordRoleState ? 
                    <div className='CaseRecord-main1'>
                        <CaseRecordInfor />
                        <CaseRecordPage />
                    </div> : 
                    <div className='CaseRecord-main1-empty'>You can not access this page !</div>
                }
            </div>
        </div>
    )
}

export default CaseRecord;
import React, { useState, useEffect } from 'react';
import './styles.css';

import { useParams } from "react-router-dom";

import Header from 'screen/Header';
import CaseRecordInfor from './components/CaseRecordInfor';
import CaseRecordPage from './components/CaseRecordPage';
import MedicationTableDelete from './components/CaseRecordPage/components/MedicationTable/MedicationTableDelete';
import MedicationTableEdit from './components/CaseRecordPage/components/MedicationTable/MedicationTableEdit';
import CaseRecordToastMessage from './components/CaseRecordToastMessage';

import { useGetCaseRecordQuery } from 'reduxStore/RTKQuery/caseRecordRTKQuery';
// import { $ } from 'utilize/Tricks';


const CaseRecord = () => {
    const { id: uuid_caseRecord } = useParams();

    const [caseRecordRole, setCaseRecordRole] = useState();
    const [caseRecord, setCaseRecord] = useState();
    const [caseRecordRoleState, setCaseRecordRoleState] = useState(false);

    const {data, isFetching, isError, error} = useGetCaseRecordQuery({uuid_caseRecord: uuid_caseRecord});

    useEffect(() => {
        isError && console.log(error);
    }, [isError, error])

    useEffect(() => {
        const resData = data;
        if (resData?.success) {
            setCaseRecordRole(resData?.caseRecordRole);
            setCaseRecord(resData?.caseRecord);
        }
    }, [data]) 

    // useEffect(() => {
    //     const q_CaseRecordInfor = $('.CaseRecordInfor');
    //     if (!isFetching) {
    //         setTimeout(() => {
    //             q_CaseRecordInfor.classList.remove('CaseRecordInfor-loadingCaseRecord');
    //         }, 500);
    //     } else { 
    //         q_CaseRecordInfor.classList.add('CaseRecordInfor-loadingCaseRecord');
    //     }
    // }, [isFetching])

    useEffect(() => {
        const roles = ['patient', 'doctorOrPharmacist'];
        if (roles.indexOf(caseRecordRole) !== -1) {
            setCaseRecordRoleState(true);
        }
    }, [caseRecordRole])

    return (
        <div className='CaseRecord'>
            <Header />
            <div className='CaseRecord-main'>
                { caseRecordRoleState ? 
                    <div className='CaseRecord-main1'>
                        <CaseRecordInfor caseRecord={ caseRecord } caseRecordRole={ caseRecordRole } />
                        <CaseRecordPage caseRecord={ caseRecord } caseRecordRole={ caseRecordRole } />
                        <MedicationTableDelete caseRecord={ caseRecord } />
                        <MedicationTableEdit caseRecord={ caseRecord } />
                        <CaseRecordToastMessage caseRecordRole={ caseRecordRole }/>
                    </div> : <>{
                        isFetching ? 
                        <div className='CaseRecord-main1-loading'>Loading ...</div> :
                        <div className='CaseRecord-main1-empty'>You can not access this page !</div>
                    }</>
                }
            </div>
        </div>
    )
}

export default CaseRecord;
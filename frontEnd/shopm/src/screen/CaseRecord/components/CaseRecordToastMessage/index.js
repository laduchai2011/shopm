import React, { memo, useEffect, useCallback } from "react";
import './styles.css';

import { useSelector, useDispatch } from "react-redux";

import { 
    setCaseRecordToastMessageType
} from "reduxStore/slice/caseRecordSlice";

import { $ } from "utilize/Tricks";

import CaseRecordToastMessageCurrentPage from "./components/CaseRecordToastMessageCurrentPage";
import CaseRecordToastMessageCompleted from "./components/CaseRecordToastMessageCompleted";
import CaseRecordToastMessageCompletedPrescription from "./components/CaseRecordToastMessageCompletedPrescription";
import CaseRecordToastMessageLocked from "./components/CaseRecordToastMessageLocked";
import CaseRecordToastMessageOutOfMedication from "./components/CaseRecordToastMessageOutOfMedication";

const CaseRecordToastMessage = () => {
    const dispatch = useDispatch();
    // const caseRecordLockOptions = useSelector(state => state.caseRecord.caseRecordLockOptions);
    const type = useSelector(state => state.caseRecord.caseRecordToastMessageOptions.type);

    const removeCaseRecordToastMessage = useCallback(() => {
        $('.CaseRecordToastMessage').classList.remove('show');
        setTimeout(() => {
            dispatch(setCaseRecordToastMessageType(null));
        }, 300)
    }, [dispatch])

    // useEffect(() => {
    //     if (caseRecordLockOptions?.isLock && (caseRecordLockOptions?.caseRecordRole!==caseRecordRole)) {
    //         $('.CaseRecordToastMessage').classList.add('show');
    //     }
    // }, [caseRecordLockOptions, caseRecordRole])

    useEffect(() => {
        if (type!==null) {
            $('.CaseRecordToastMessage').classList.add('show');
        }
    }, [type])

    return (
        <div className="CaseRecordToastMessage" onClick={() => removeCaseRecordToastMessage()}>
            { type==='currentPage' && <CaseRecordToastMessageCurrentPage removeCaseRecordToastMessage={ removeCaseRecordToastMessage } /> }
            { type==='completed' && <CaseRecordToastMessageCompleted removeCaseRecordToastMessage={ removeCaseRecordToastMessage } /> }
            { type==='completedPrescription' && <CaseRecordToastMessageCompletedPrescription removeCaseRecordToastMessage={ removeCaseRecordToastMessage } /> }
            { type==='completedOrCompletedPrescription' && <CaseRecordToastMessageCompletedPrescription removeCaseRecordToastMessage={ removeCaseRecordToastMessage } /> }
            { type==='locked' && <CaseRecordToastMessageLocked removeCaseRecordToastMessage={ removeCaseRecordToastMessage } /> }
            { type==='orderMedication' && <CaseRecordToastMessageCompletedPrescription removeCaseRecordToastMessage={ removeCaseRecordToastMessage } /> }
            { type==='outOfMedication' && <CaseRecordToastMessageOutOfMedication removeCaseRecordToastMessage={ removeCaseRecordToastMessage } /> }
        </div>
    )
}

export default memo(CaseRecordToastMessage);
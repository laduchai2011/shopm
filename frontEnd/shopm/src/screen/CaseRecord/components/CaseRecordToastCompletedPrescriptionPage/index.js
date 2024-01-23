import React, { memo } from "react";
import './styles.css';

import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";

import { $ } from "utilize/Tricks";

const CaseRecordToastCompletedPrescriptionPage = () => {
    const toastCompletedPrescriptionPage = useSelector(state => state.caseRecord.toastCompletedPrescriptionPage);

    const removeCaseRecordToastCompletedPrescriptionPage = () => {
        $('.CaseRecordToastCompletedPrescriptionPage').classList.remove('show');
    }

    return (
        <div className="CaseRecordToastCompletedPrescriptionPage" onClick={() => removeCaseRecordToastCompletedPrescriptionPage()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <TiDelete onClick={() => removeCaseRecordToastCompletedPrescriptionPage()} size={ 25 } />
                </div>
                <div>{ toastCompletedPrescriptionPage?.message }</div>
            </div>
        </div>
    )
}

export default memo(CaseRecordToastCompletedPrescriptionPage);
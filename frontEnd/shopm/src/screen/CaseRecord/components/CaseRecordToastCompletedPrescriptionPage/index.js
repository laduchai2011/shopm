import React, { memo } from "react";
import './styles.css';

import { TiDelete } from "react-icons/ti";

import { $ } from "utilize/Tricks";

const CaseRecordToastCompletedPrescriptionPage = () => {
    const removeCaseRecordToastCompletedPrescriptionPage = () => {
        $('.CaseRecordToastCompletedPrescriptionPage').classList.remove('show');
    }

    return (
        <div className="CaseRecordToastCompletedPrescriptionPage" onClick={() => removeCaseRecordToastCompletedPrescriptionPage()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <TiDelete onClick={() => removeCaseRecordToastCompletedPrescriptionPage()} size={ 25 } />
                </div>
                <div>
                    This page is NOT completed Prescription yet !
                    You need to wait it complete
                </div>
            </div>
        </div>
    )
}

export default memo(CaseRecordToastCompletedPrescriptionPage);
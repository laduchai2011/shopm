import React, { memo } from "react";
import './styles.css';

import { useSelector } from 'react-redux';

import { TiDelete } from "react-icons/ti";
import { RiErrorWarningFill } from "react-icons/ri";

import { 
    useDeleteCaseRecordMedicationMutation
} from "reduxStore/RTKQuery/caseRecordRTKQuery";

import { $ } from "utilize/Tricks";

const MedicationTableDelete = ({ caseRecord }) => {
    const [deleteCaseRecordMedication] = useDeleteCaseRecordMedicationMutation();
    
    const current_caseRecordMedication = useSelector((state) => state.caseRecord.current_caseRecordMedication);
    const index = useSelector((state) => state.caseRecord.index);

    const removeShowTableDeleteMedication = () => {
        const q_medicationDelete = $('.MedicationTableDelete');
        q_medicationDelete.classList.remove('show');
    }

    const handleDeleteMedication = () => {
        deleteCaseRecordMedication({
            caseRecord: caseRecord,
            uuid_caseRecordMedication: current_caseRecordMedication?.uuid_caseRecordMedication
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                removeShowTableDeleteMedication();
            } else { console.log(resData?.message) }
        }).catch(err => console.error(err));
    }
    
    return (
        <div className="MedicationTableDelete" onClick={() => removeShowTableDeleteMedication()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <RiErrorWarningFill size={ 25 } color="red" />
                    <TiDelete onClick={() => removeShowTableDeleteMedication()} size={ 25 } />
                </div>
                <div>
                    {`Are you sure to want to delete (${ index }) ?`}
                </div>
                <div>
                    <button onClick={() => handleDeleteMedication()}>Yes</button>
                    <button onClick={() => removeShowTableDeleteMedication()}>No</button>
                </div>
            </div>
        </div>
    )
}

export default memo(MedicationTableDelete);
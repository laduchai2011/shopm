import React, { memo } from "react";
import './styles.css';

import { TiDelete } from "react-icons/ti";
import { RiErrorWarningFill } from "react-icons/ri";

import { $ } from "utilize/Tricks";

const MedicationTableDelete = () => {
    const removeShowTableDeleteMedication = () => {
        const q_medicationDelete = $('.MedicationTableDelete');
        q_medicationDelete.classList.remove('show');
    }
    
    return (
        <div className="MedicationTableDelete" onClick={() => removeShowTableDeleteMedication()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <RiErrorWarningFill size={ 25 } color="red" />
                    <TiDelete onClick={() => removeShowTableDeleteMedication()} size={ 25 } />
                </div>
                <div>
                    Are you sure to want to delete ?
                </div>
                <div>
                    <button>Yes</button>
                    <button>No</button>
                </div>
            </div>
        </div>
    )
}

export default memo(MedicationTableDelete);
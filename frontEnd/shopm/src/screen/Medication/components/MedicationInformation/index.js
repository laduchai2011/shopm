import React, { useEffect, useContext, memo } from "react";
import './styles.css';

import { MedicationContext } from "screen/Medication/MedicationContext";

import { $ } from "utilize/Tricks";

const MedicationInformation = () => {
    const { medicationSate } = useContext(MedicationContext);
    useEffect(() => {
        $('.MedicationInformation-body').innerHTML = medicationSate.information;
    }, [medicationSate.information])
    return (
        <div className="MedicationInformation">
            <div className="MedicationInformation-header">Information</div>
            <div className="MedicationInformation-body">Empty</div>
        </div>
    )
}

export default memo(MedicationInformation); 
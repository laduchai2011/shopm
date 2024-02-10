import React, { memo } from "react";
import './styles.css';

import { useSelector } from "react-redux";

import { TiDelete } from "react-icons/ti";
import { MdError } from "react-icons/md";

const CaseRecordToastMessageOutOfMedication = ({ removeCaseRecordToastMessage }) => {
    const message = useSelector(state => state.caseRecord.caseRecordToastMessageOptions.outOfMedication?.message);

    return (
        <div>
            <div>
                <TiDelete onClick={() => removeCaseRecordToastMessage()} size={ 25 } />
            </div>
            <div>
                { message }
            </div>
            <div>
                <MdError size={ 60 } color="yellow"/>
            </div>
        </div>
    )
}

export default memo(CaseRecordToastMessageOutOfMedication);
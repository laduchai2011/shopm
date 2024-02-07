import React, { memo } from "react";
import './styles.css';

import { useSelector } from "react-redux";

import { TiDelete } from "react-icons/ti";
import { IoIosLock } from "react-icons/io";

const CaseRecordToastMessageLocked = ({ removeCaseRecordToastMessage }) => {
    const message = useSelector(state => state.caseRecord.caseRecordToastMessageOptions.locked?.message);

    return (
        <div>
            <div>
                <TiDelete onClick={() => removeCaseRecordToastMessage()} size={ 25 } />
            </div>
            <div>
                { message }
            </div>
            <div>
                <IoIosLock size={ 60 } color="red"/>
            </div>
        </div>
    )
}

export default memo(CaseRecordToastMessageLocked);
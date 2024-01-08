import React, { memo, useEffect, useState } from "react";
import './styles.css';

import { useSelector } from "react-redux";

import { TiDelete } from "react-icons/ti";
import { IoIosLock } from "react-icons/io";

import { $ } from "utilize/Tricks";

const CaseRecordToastMessage = ({ caseRecordRole }) => {
    const caseRecordLockOptions = useSelector(state => state.caseRecord.caseRecordLockOptions)
    const [message, setMessage] = useState();

    const removeCaseRecordToastMessage = () => {
        $('.CaseRecordToastMessage').classList.remove('show');
    }

    useEffect(() => {
        if (caseRecordLockOptions?.isLock && (caseRecordLockOptions?.caseRecordRole!==caseRecordRole)) {
            setMessage('CaseRecord is locked')
            $('.CaseRecordToastMessage').classList.add('show');
        }
    }, [caseRecordLockOptions, caseRecordRole])

    return (
        <div className="CaseRecordToastMessage" onClick={() => removeCaseRecordToastMessage()}>
            <div onClick={(e) => e.stopPropagation()}>
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
        </div>
    )
}

export default memo(CaseRecordToastMessage);
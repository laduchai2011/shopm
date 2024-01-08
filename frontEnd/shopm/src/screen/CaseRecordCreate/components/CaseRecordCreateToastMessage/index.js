import React, { memo } from 'react';
import './styles.css';

import { TiDelete } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

import { $ } from 'utilize/Tricks';

const CaseRecordCreateToastMessage = ({ message, loading, success }) => {
    const handleRemove = () => {
        $('.CaseRecordCreateToastMessage').classList.remove('show');
    }
    return (
        <div className='CaseRecordCreateToastMessage' onClick={() => handleRemove()} size={25}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <TiDelete onClick={() => handleRemove()} size={25} />
                </div>
                <div>
                    { message }
                </div>
                <div>
                    { loading && <AiOutlineLoading3Quarters className='CaseRecordCreateToastMessage-loading' size={ 60 } color="blue"/> }
                    { !loading && <>
                        { success && <FaCheck size={ 60 } color="greenyellow"/> }
                        { !success && <FaInfoCircle size={ 60 } color="red"/> }
                    </> }
                </div>
            </div>
        </div>
    )
}

export default memo(CaseRecordCreateToastMessage);
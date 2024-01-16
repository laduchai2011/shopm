import React, { memo } from "react";
import './styles.css';

import { TiDelete } from "react-icons/ti";

import { $ } from "utilize/Tricks";

const CaseRecordToastCompletedPage = () => {
    const removeCaseRecordToastCompletedPage = () => {
        $('.CaseRecordToastCompletedPage').classList.remove('show');
    }

    return (
        <div className="CaseRecordToastCompletedPage" onClick={() => removeCaseRecordToastCompletedPage()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <TiDelete onClick={() => removeCaseRecordToastCompletedPage()} size={ 25 } />
                </div>
                <div>
                    This page is completed !
                    You can't change it
                </div>
            </div>
        </div>
    )
}

export default memo(CaseRecordToastCompletedPage);
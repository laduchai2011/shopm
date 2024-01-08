import React, { memo, useState } from "react";
import './styles.css';

import { useSelector } from "react-redux";

import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { $ } from "utilize/Tricks";

const CaseRecordEditImage = ({ caseRecord }) => {
    const current_caseRecordImage = useSelector((state) => state.caseRecord.current_caseRecordImage);
    
    const removeCaseRecordEditImage = () => {
        $('.CaseRecordEditImage').classList.remove('show');
    }

    const handlEditImage = () => {
        // deleteCaseRecordImage({
        //     caseRecord: caseRecord,
        //     uuid_caseRecordImage: current_caseRecordImage.uuid_caseRecordImage
        // }).then(res => {
        //     const resData = res.data;
        //     if (resData?.success) {
        //         $('.CaseRecordEditImage').classList.remove('show');
        //     }
        // }).catch(err => console.error(err))
    }

    const handleChangeTitle = (e) => {
        const value = e.target.value;
        console.log(value)
    }

    return (
        <div className="CaseRecordEditImage" onClick={() => removeCaseRecordEditImage()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <MdEdit size={ 25 } color="greenyellow"/>
                    <TiDelete onClick={() => removeCaseRecordEditImage()} size={ 25 } />
                </div>
                <div>
                    <img src={ current_caseRecordImage?.image } alt="CaseRecordToastDelImage"/>
                    <input value={ current_caseRecordImage?.title } onChange={(e) => handleChangeTitle(e)} alt="CaseRecordToastDelImage"/>
                </div>
                <div>
                    <button onClick={() => handlEditImage()}>Oke</button>
                    <button onClick={() => removeCaseRecordEditImage()}>No </button>
                </div>
            </div>
        </div>
    )
}

export default memo(CaseRecordEditImage);
import React, { memo, useState, useEffect } from "react";
import './styles.css';

import { useSelector } from "react-redux";

import { usePatchCaseRecordImageTitleMutation } from "reduxStore/RTKQuery/caseRecordRTKQuery";

import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { $ } from "utilize/Tricks";

const CaseRecordEditImage = ({ caseRecord }) => {
    const current_caseRecordImage = useSelector((state) => state.caseRecord.current_caseRecordImage);
    const [title, setTitle] = useState('123');

    const [patchCaseRecordImageTitle] = usePatchCaseRecordImageTitleMutation();

    useEffect(() => {
        setTitle(current_caseRecordImage?.title);
    }, [current_caseRecordImage])

    const removeCaseRecordEditImage = () => {
        $('.CaseRecordEditImage').classList.remove('show');
    }

    const handlEditImage = () => {
        patchCaseRecordImageTitle({
            caseRecord: caseRecord,
            uuid_caseRecordImage: current_caseRecordImage.uuid_caseRecordImage,
            title: title.trim()
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                $('.CaseRecordEditImage').classList.remove('show');
            }
        }).catch(err => console.error(err))
    }

    const handleChangeTitle = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    return (
        <div className="CaseRecordEditImage" onClick={() => removeCaseRecordEditImage()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <MdEdit size={ 25 } color="greenyellow"/>
                    <TiDelete onClick={() => removeCaseRecordEditImage()} size={ 25 } />
                </div>
                <div>
                    <img src={ current_caseRecordImage?.image } alt=""/>
                    <input value={`${title}`} onChange={(e) => handleChangeTitle(e)} />
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
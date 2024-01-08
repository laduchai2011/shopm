import React, { memo } from "react";
import './styles.css';

import { CiCircleRemove } from 'react-icons/ci';
import { MdEdit } from "react-icons/md";

import { useDispatch } from 'react-redux';
import { 
    setCurrent_caseRecordImage,
} from "reduxStore/slice/caseRecordSlice";

import { $ } from "utilize/Tricks";

/**
*@typedef {
*pageNumber: string,
*image: string,
*title: string,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/ 

const CaseRecordPageImage = ({ editBoolD, onData, removeImages, setRemoveImages }) => {
    const dispatch = useDispatch();

    const handleUnRemoveImages = (data) => {
        const cpRemoveImages = [...removeImages];
        cpRemoveImages.splice(cpRemoveImages.indexOf(data), 1);
        setRemoveImages(cpRemoveImages);
    }

    const handleRemoveImage = () => {
        $('.CaseRecordToastDelImage').classList.add('show');
        dispatch(setCurrent_caseRecordImage({caseRecordImage: onData}));
    }

    const handleEditImage = () => {
        $('.CaseRecordEditImage').classList.add('show');
        dispatch(setCurrent_caseRecordImage({caseRecordImage: onData}));
    }

    const handleEditImageTitle = (e) => {
        // const value = e.target.value;
    }

    return (
        <div className="CaseRecordPageImage">
            { editBoolD && <div className="CaseRecordPageImage-icons">
                <MdEdit onClick={() => handleEditImage()} size={ 25 } color="greenyellow" />
                <CiCircleRemove onClick={() => handleRemoveImage()} size={ 25 } /> 
            </div> }
            <img src={ onData.image } alt="" />
            <div className="CaseRecordPageImage-title">{ `${onData.title} dfgsnb sdn sdf kjsbdkfgsdkbksdbn kjsdb sdbkjbsd kbsdsbdfb sfd` }</div>
        </div>
    )
}

export default memo(CaseRecordPageImage);
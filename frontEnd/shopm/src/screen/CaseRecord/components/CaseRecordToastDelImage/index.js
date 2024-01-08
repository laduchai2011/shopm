import React, { memo } from "react";
import './styles.css';

import { useSelector } from "react-redux";

import { useDeleteCaseRecordImageMutation } from "reduxStore/RTKQuery/caseRecordRTKQuery";

import { TiDelete } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { $ } from "utilize/Tricks";

const CaseRecordToastDelImage = ({ caseRecord }) => {
    const [deleteCaseRecordImage] = useDeleteCaseRecordImageMutation();
    const current_caseRecordImage = useSelector((state) => state.caseRecord.current_caseRecordImage);
    
    const removeCaseRecordToastDelImage = () => {
        $('.CaseRecordToastDelImage').classList.remove('show');
    }

    const handleDelImage = () => {
        deleteCaseRecordImage({
            caseRecord: caseRecord,
            uuid_caseRecordImage: current_caseRecordImage.uuid_caseRecordImage
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                $('.CaseRecordToastDelImage').classList.remove('show');
            }
        }).catch(err => console.error(err))
    }

    return (
        <div className="CaseRecordToastDelImage" onClick={() => removeCaseRecordToastDelImage()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <MdDelete size={ 25 } color="red"/>
                    <TiDelete onClick={() => removeCaseRecordToastDelImage()} size={ 25 } />
                </div>
                <div>
                    <img src={ current_caseRecordImage?.image } alt="CaseRecordToastDelImage"/>
                    <div>Are you sure to delete this image !</div>
                </div>
                <div>
                    <button onClick={() => handleDelImage()}>Yes</button>
                    <button onClick={() => removeCaseRecordToastDelImage()}>No </button>
                </div>
            </div>
        </div>
    )
}

export default memo(CaseRecordToastDelImage);
import React, { memo, useState } from "react";
import './styles.css';

import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

import { TiDelete } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useAddCaseRecordImageMutation } from "reduxStore/RTKQuery/caseRecordRTKQuery";

import { handleCaseRecordMid } from "../utilize";

import { 
    SERVER_ADDRESS_UPLOADIMAGE,
    SERVER_ADDRESS_GETIMAGE
} from "config/server";

import { $ } from "utilize/Tricks";

/**
*@typedef {
*pageNumber: string,
*imageUrl: string,
*title: string,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/  

/**
*@typedef {
*isCheckCurrentPage: boolean,
*isCheckCompleted: boolean,
*isCheckCompletedPrescription: boolean,
*isCheckCompletedOrCompletedPrescription: boolean,
*isCheckLock: boolean,
*isCheckOrderMedication: boolean,
*isCheckOutOfMedication: boolean
*} isCheckCaseRecordMidOptions
*/ 

const CaseRecordAddImage = ({ caseRecord }) => {
    const dispatch = useDispatch();
    const current_pageNumber = useSelector(state => state.caseRecord.current_pageNumber);

    const [image, setImage] = useState(); // [{title: '', file: '', blob: ''}]

    const [addCaseRecordImage] = useAddCaseRecordImageMutation();

    const removeCaseRecordAddImage = () => {
        $('.CaseRecordAddImage').classList.remove('show');
    }

    const handleImageInput = (e) => {
        const files = e.target.files;

        const newImage = {
            title: '',
            file: files[0],
            blob: URL.createObjectURL(files[0])
        }

        setImage(newImage);
    }

    const handleTitle = (e) => {
        const value = e.target.value;
        const cpImage = {...image};
        cpImage.title = value;
        setImage(cpImage);
    }

    const uploadImage = (files) => {
        const promise_uploadImage = new Promise((resolve, reject) => {
            const formData = new FormData();
            files.forEach(file => formData.append("file", file));
            axios.post(
                SERVER_ADDRESS_UPLOADIMAGE,
                formData,
                {
                    withCredentials: true
                }
            ).then(res => {
                if (res?.data?.status) {
                    const paths = res.data.paths;
                    const imageUrls = [];
                    paths.forEach(path => imageUrls.push(`${SERVER_ADDRESS_GETIMAGE}/${path}`))
                    resolve(imageUrls);
                }
            }).catch(err => reject(err));
        })

        return promise_uploadImage;
    }

    const handleSubmitImage = async () => {
        try {
            const files = [image.file];
            const imageUrls = await uploadImage(files);
            const caseRecordImageOptions = {
                pageNumber: '',
                image: imageUrls[0],
                title: image?.title.trim(),
                status: 'notComplete',
                uuid_caseRecord: caseRecord.uuid_caseRecord
            }
            addCaseRecordImage({
                uuid_caseRecord: caseRecord.uuid_caseRecord,
                pageNumber: current_pageNumber,
                caseRecordImageOptions: caseRecordImageOptions
            }).then(res => {
                const resData = res.data;
                if (resData?.success===false) {
                    const isCheckCaseRecordMidOptions = {
                        isCheckCurrentPage: true,
                        isCheckCompleted: true,
                        isCheckCompletedPrescription: true,
                        isCheckCompletedOrCompletedPrescription: false,
                        isCheckLocked: true,
                        isCheckOrderMedication: false,
                        isCheckOutOfMedication: false
                    }
                    handleCaseRecordMid({
                        isCheckCaseRecordMidOptions: isCheckCaseRecordMidOptions,
                        resData: resData,
                        dispatch: dispatch
                    })
                }
            }).catch(err => console.error(err))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="CaseRecordAddImage" onClick={() => removeCaseRecordAddImage()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <IoIosAddCircleOutline size={ 25 } color="blue"/>
                    <TiDelete onClick={() => removeCaseRecordAddImage()} size={ 25 } />
                </div>
                <div>
                    <div>Click to add new image !</div>
                    <label htmlFor='inputImg'>
                        <IoIosAddCircleOutline size={ 40 } color="blue"/>
                        <input id='inputImg' type='file' hidden="hidden" accept="image/*" onChange={(e) => handleImageInput(e)} />
                    </label>
                </div>
                <div>
                    <input onChange={(e) => handleTitle(e)} placeholder="Title" /> 
                    { image?.blob && <img src={ image?.blob } alt="" /> }
                </div>
                { image?.blob && <div>
                    <button onClick={() => handleSubmitImage()}>Oke</button>
                    <button onClick={() => removeCaseRecordAddImage()}>Cance</button>
                </div> }
            </div>
        </div>
    )
}

export default memo(CaseRecordAddImage);
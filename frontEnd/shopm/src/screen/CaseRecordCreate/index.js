import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import './styles.css';

import axios from 'axios';

import CaseRecordCreateToastMessage from './components/CaseRecordCreateToastMessage';
import CaseRecordCreateImage from './components/CaseRecordCreateImage';

import { BsFillImageFill, BsFillCameraVideoFill } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';

import Header from 'screen/Header';

import { 
    SERVER_ADDRESS_CREATE_CASERECORD,
    SERVER_ADDRESS_PATCH_STATUS_CRC_CASERECORD,
    SERVER_ADDRESS_CASERECORD_CREATE_DESCRIPTION,
    SERVER_ADDRESS_CASERECORD_BULKCREATE_IMAGE,
    SERVER_ADDRESS_CASERECORD_CREATE_PRESCRIPTION,
    SERVER_ADDRESS_UPLOADIMAGE, 
    SERVER_ADDRESS_GETIMAGE, 
    // SERVER_ADDRESS_POST_CASERECORD 
} from 'config/server';

import { $, $$ } from 'utilize/Tricks';

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*report: string,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/ 

/**
*@typedef {
*pageNumber: string,
*description: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordDescriptionOptions
*/

/**
*@typedef {
*pageNumber: string,
*image: string,
*title: string,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/  

/**
*@typedef {
*pageNumber: string,
*videos: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordVideoOptions
*/  

/**
*@typedef {
*pageNumber: string,
*prescription: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordPrescriptionOptions
*/  

/**
*@typedef {
*pageNumber: string,
*name: string,
*amount: INTEGER.UNSIGNED,
*note: text,
*price: INTEGER.UNSIGNED,
*discount: FLOAT,
*cost: INTEGER.UNSIGNED,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordMedicationOptions
*/  

const CaseRecordCreate = () => {
    const [imageList, setImageList] = useState([]); // [{title: '', file: '', blob: ''}]
    const [videoList, setVideoList] = useState([]); // [{title: '', file: '', blob: ''}]
    const [title, setTitle] = useState('');
    const [titleEmpty, setTitleEmpty] = useState('');
    const [describe, setDescribe] = useState('');

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        return () => {
            imageList.forEach(element => {
                URL.revokeObjectURL(element.blob);
            })
            videoList.forEach(element => {
                URL.revokeObjectURL(element.blob);
            })
        }

        // eslint-disable-next-line
    }, [])

    useLayoutEffect(() => {
        const q_imageContainers = $('.CaseRecordCreate-imageVideo-image').children;
        for(let i = 0; i < q_imageContainers.length; i++) {
            q_imageContainers[i].classList.remove('hidden');
        }
    }, [imageList])

    const handleImageInput = (e) => {
        const files = e.target.files;

        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            const newImage = {
                title: '',
                file: files[i],
                blob: URL.createObjectURL(files[i])
            }

            newImages.push(newImage);
        }

        setImageList(pre => pre.concat(newImages));
    }

    const handleVideoInput = (e) => {
        const files = e.target.files;

        const newVideos = [];

        for (let i = 0; i < files.length; i++) {
            const newVideo = {
                file: files[i],
                blob: URL.createObjectURL(files[i])
            }

            newVideos.push(newVideo);
        }

        setVideoList(pre => pre.concat(newVideos));
    }

    const handleDeleteVideo = (index) => {
        const cp_videoList = [...videoList];

        URL.revokeObjectURL(cp_videoList[index].blob);
        cp_videoList.splice(index, 1);

        setVideoList(cp_videoList);
    }

    const uploadImage = (files, callback) => {
        const formData = new FormData();
        files.forEach(file => formData.append("file", file))
        axios.post(
            SERVER_ADDRESS_UPLOADIMAGE,
            formData,
            {
                withCredentials: true, 
            }
        ).then(res => {
            const resData= res.data;
            if (resData.success) {
                const paths = resData.paths;
                const imageUrls = [];
                paths.forEach(path => imageUrls.push(`${SERVER_ADDRESS_GETIMAGE}/${path}`))
                callback(imageUrls);
            }
        }).catch(err => console.error(err));
    }

    const promiseUpLoadImage = () => {
        const imageFiles = [];
        for (let i = 0; i < imageList.length; i++) {
            imageFiles.push(imageList[i].file)
        }
        return new Promise((resolve, reject) => {
            if (imageList.length > 0) {
                uploadImage(imageFiles, (imageUrls) => {
                    resolve(imageUrls);
                })
            } else {
                resolve();
            }
        });
    }

    const promiseCreateCaseRecord = () => {
        if (title.length === 0) {
            setTitleEmpty('must is a string NOT empty !');
        } else {
            const caseRecordOptions = {
                title: title,
                priceTotal: 0,
                pageTotal: 1,
                report: null,
                status: 'notYetCreate',
                uuid_doctorOrPharmacist: null,
                uuid_user: null
            }
    
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: SERVER_ADDRESS_CREATE_CASERECORD,
                    withCredentials: true,
                    data: {
                        caseRecordOptions: caseRecordOptions
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    const resData = res.data;
                    if (resData.success) {
                        resolve(resData.caseRecord);
                    } else {
                        reject(resData.message);
                    }
                }).catch(error => reject(error))
            })
        }
    }

    const promiseCreateDescription = (uuid_caseRecord) => {
        const caseRecordDescriptionOptions = {
            pageNumber: '1',
            description: describe,
            status: 'notComplete',
            uuid_caseRecord: uuid_caseRecord
        }

        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: SERVER_ADDRESS_CASERECORD_CREATE_DESCRIPTION,
                withCredentials: true,
                data: {
                    caseRecordDescriptionOptions: caseRecordDescriptionOptions
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                const resData = res.data;
                if (resData.success) {
                    resolve(resData.caseRecordDescription);
                } else {
                    reject(resData.message);
                }
            }).catch(error => reject(error))
        })
    }

    const promiseCreateImage = (uuid_caseRecord, imageUrls) => {
        if (imageUrls) {
            const caseRecordImageOptionsArray = [];

            for (let i = 0; i < imageUrls.length; i++) {
                const caseRecordImageOptions = {
                    pageNumber: '1',
                    image: imageUrls[i],
                    title: imageList[i].title,
                    status: 'notComplete',
                    uuid_caseRecord: uuid_caseRecord
                }

                caseRecordImageOptionsArray.push(caseRecordImageOptions);
            }

            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: SERVER_ADDRESS_CASERECORD_BULKCREATE_IMAGE,
                    withCredentials: true,
                    data: {
                        caseRecordImageOptionsArray: caseRecordImageOptionsArray
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    const resData = res.data;
                    if (resData.success) {
                        console.log('promiseCreateImage', resData)
                        resolve(resData.caseRecordImages);
                    } else {
                        reject(resData.message);
                    }
                }).catch(error => reject(error))
            })
        }
    }

    const promiseCreatePrescription = (uuid_caseRecord) => {
        const caseRecordPrescriptionOptions = {
            pageNumber: '1',
            prescription: '',
            status: 'notComplete',
            uuid_caseRecord: uuid_caseRecord
        }  

        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: SERVER_ADDRESS_CASERECORD_CREATE_PRESCRIPTION,
                withCredentials: true,
                data: {
                    caseRecordPrescriptionOptions: caseRecordPrescriptionOptions
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                const resData = res.data;
                if (resData.success) {
                    resolve(resData.caseRecordPrescription);
                } else {
                    reject(resData.message);
                }
            }).catch(error => reject(error))
        })
    }

    const handleCreate = async () => {
        try {
            setMessage('Waiting ... !');
            setLoading(true);
            setSuccess(false);
            $('.CaseRecordCreateToastMessage').classList.add('show');

            const imageUrls = await promiseUpLoadImage();
            const caseRecord = await promiseCreateCaseRecord();
            const uuid_caseRecord = caseRecord.uuid_caseRecord;
            // const caseRecordDescription_promise = promiseCreateDescription(uuid_caseRecord);
            // const caseRecordImages_promise = promiseCreateImage(uuid_caseRecord, imageUrls);
            // const caseRecordPrescription_promise = promiseCreatePrescription(uuid_caseRecord);
            Promise.all([
                promiseCreateDescription(uuid_caseRecord), 
                promiseCreateImage(uuid_caseRecord, imageUrls), 
                promiseCreatePrescription(uuid_caseRecord)
            ]).then((values) => {
                if (values[0] && values[2]) {
                    if ((imageUrls && values[1]) || (!imageUrls && !values[1])) {
                        axios({
                            method: 'patch',
                            url: SERVER_ADDRESS_PATCH_STATUS_CRC_CASERECORD,
                            withCredentials: true,
                            data: {
                                caseRecord: caseRecord
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => {
                            const resData = res.data;
                            if (resData.success) {
                                setMessage('Success !');
                                setLoading(false);
                            } else {
                                setMessage('Failure !');
                                setLoading(false);
                            }
                            setSuccess(resData.success);
                        }).catch(error => console.error(error))
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteImage = useCallback((index) => {
        // const cp_imageList = [...imageList];
        const q_imageContainers = $$('.CaseRecordCreateImage');

        q_imageContainers[index].classList.add('hidden');
        // URL.revokeObjectURL(cp_imageList[index].blob);
        // cp_imageList.splice(index, 1);

        setTimeout(() => {
            if (index < (q_imageContainers.length - 1)) {
                for (let i = 0; i < q_imageContainers.length - 1; i++) {
                    if (i >= index) {
                        if (q_imageContainers[i + 1].children[1].classList.contains("show")) {
                            q_imageContainers[i].children[1].classList.add("show");
                        } else {
                            q_imageContainers[i].children[1].classList.remove("show");
                        }
                    }
                }
            }
            // setImageList(cp_imageList);
            setImageList(pre => {
                const cp_imageList = [...pre];
                URL.revokeObjectURL(cp_imageList[index].blob);
                cp_imageList.splice(index, 1);
                return cp_imageList
            })
        }, 300)
    }, [])  

    const list_image = imageList.map((data, index) => {
        return (
            <CaseRecordCreateImage 
                key={ index } 
                index={ index } 
                onData={ data } 
                setDatas={ setImageList }
                onHandleDeleteImage={() => handleDeleteImage(index)} 
            />
        )
    })

    const list_video = videoList.map((data, index) => {
        return (
            <div key={ index }>
                <TiDeleteOutline size={20} onClick={() => handleDeleteVideo(index)} />
                <video src={ data.blob }controls />
            </div>
        )
    })

    return (
        <div className='CaseRecordCreate'>
            <Header />
            <div className='CaseRecordCreate-main'>
                <div className='CaseRecordCreate-main1'>
                    <h3>Create case-record</h3>
                    <div className='CaseRecordCreate-title'><strong>Title:</strong><span>{` ${titleEmpty}`}</span></div>
                    <textarea className='CaseRecordCreate-textarea title' value={title} onChange={(e) => {setTitle(e.target.value); setTitleEmpty('')}} />
                    <div><strong>Describe:</strong></div>
                    <textarea className='CaseRecordCreate-textarea describe' value={describe} onChange={(e) => setDescribe(e.target.value)} />
                    <div><strong>Image and Video:</strong></div>
                    <div className='CaseRecordCreate-imageVideo-iconContainer'>
                        <label htmlFor='inputImg'>
                            <span>Image</span>
                            <BsFillImageFill />
                            <input id='inputImg' type='file' hidden="hidden" accept="image/*" multiple onChange={(e) => handleImageInput(e)} />
                        </label>
                        <label htmlFor='inputVideo'>
                            <span>Video</span>
                            <BsFillCameraVideoFill />
                            <input id='inputVideo' type='file' hidden="hidden" accept="video/mp4, video/mov" multiple onChange={(e) => handleVideoInput(e)} />
                        </label>
                    </div>
                    <div className='CaseRecordCreate-imageVideo'>
                        <div className='CaseRecordCreate-imageVideo-image'>
                            { list_image } 
                        </div>
                    </div>
                    <div className='CaseRecordCreate-imageVideo'>
                        <div className='CaseRecordCreate-imageVideo-video'>
                            { list_video } 
                        </div>
                    </div>
                    <div className='CaseRecordCreate-createBtn'><button onClick={() => handleCreate()}>Create</button></div>
                </div>
            </div>
            <CaseRecordCreateToastMessage message={ message } loading={ loading } success={ success }/>
        </div>
    )
}

export default CaseRecordCreate;
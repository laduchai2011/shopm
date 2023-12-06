import React, { useState, useEffect } from 'react';
import './styles.css';

import axios from 'axios';

import { BsFillImageFill, BsFillCameraVideoFill } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';

import Header from 'screen/Header';

import { SERVER_ADDRESS_UPLOADIMAGE, SERVER_ADDRESS_GETIMAGE, SERVER_ADDRESS_POST_CASERECORD } from 'config/server';

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
*images: text,
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
*cost: INTEGER.UNSIGNED,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordMedicationOptions
*/  

/**
*@typedef {
*dataPage: text,
*priceTotal: integer,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordPageOptions
*/ 

/**
*@typedef {
*priceTotal: integer,
*status: string,
*description: {
*   note: string,
*   images: [],
*   videos: []
*},
*Prescription: {
*   note: text,
*   medicationList: []    
*}
*} dataPage
*/ 

const CaseRecordCreate = () => {
    const [imageList, setImageList] = useState([]); // [{file: '', blob: ''}]
    const [videoList, setVideoList] = useState([]); // [{file: '', blob: ''}]
    const [title, setTitle] = useState('');
    const [titleEmpty, setTitleEmpty] = useState('');
    const [describe, setDescribe] = useState('');
    // const [creating, setCreating] = useState('');

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

    const handleImageInput = (e) => {
        const files = e.target.files;

        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            const newImage = {
                file: files[i],
                blob: URL.createObjectURL(files[i])
            }

            newImages.push(newImage);
        }

        setImageList(pre => pre.concat(newImages));
    }

    const handleDeleteImage = (index) => {
        const cp_imageList = [...imageList];

        URL.revokeObjectURL(cp_imageList[index].blob);
        cp_imageList.splice(index, 1);

        setImageList(cp_imageList);
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

    const handleCreate = () => {
        if (title.length === 0) {
            setTitleEmpty('must is a string NOT empty !')
        } else {
            const imageFiles = [];
            const videoFiles = [];
            for (let i = 0; i < imageList.length; i++) {
                imageFiles.push(imageList[i].file)
            }
            for (let i = 0; i < videoList.length; i++) {
                videoFiles.push(videoList[i].file)
            }

            uploadImage(imageFiles, (imageUrls) => {
                const data = {
                    caseRecordOptions: {
                        title: title,
                        priceTotal: 0,
                        pageTotal: 1,
                        report: null,
                        status: 'notComplete',
                        uuid_doctorOrPharmacist: null,
                        uuid_user: null
                    },
                    caseRecordDescriptionOptions: {
                        pageNumber: '1',
                        description: describe,
                        status: 'notComplete',
                        uuid_caseRecord: null
                    },
                    caseRecordImageOptions: {
                        pageNumber: '1',
                        images: JSON.stringify({images: imageUrls}),
                        status: 'notComplete',
                        uuid_caseRecord: null
                    },
                    caseRecordVideoOptions: {
                        pageNumber: '1',
                        videos: JSON.stringify({videos: videoList}),
                        status: 'notComplete',
                        uuid_caseRecord: null
                    } 
                }

                axios({
                    method: 'post',
                    url: SERVER_ADDRESS_POST_CASERECORD,
                    withCredentials: true,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    const resData = res.data;
                    console.log(resData);
                }).catch(error => console.error(error))
            })
        }
    }

    const list_image = imageList.map((data, index) => {
        return (
            <div key={ index }>
                <TiDeleteOutline size={20} onClick={() => handleDeleteImage(index)} />
                <img src={ data.blob } alt=''/>
            </div>
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
        </div>
    )
}

export default CaseRecordCreate;
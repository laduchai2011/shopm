import React, { useState, useLayoutEffect, useEffect } from "react";
import './styles.css';

import axios from "axios";

import { RiDeleteBack2Fill } from 'react-icons/ri';
import { AiFillFileImage } from 'react-icons/ai';

import { $, $$ } from "utilize/Tricks";
import Header from "screen/Header";
import { SERVER_ADDRESS_POSTIMAGE, SERVER_ADDRESS_UPLOADIMAGE, SERVER_ADDRESS_GETIMAGE } from "config/server";

const Add = () => {

    const [data, setData] = useState({
        tag: '',
        content: '',
        imageBlobs: [], 
        imageFiles: []
    });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        return() => {
            data.imageBlobs.forEach(urlImage => {
                URL.revokeObjectURL(urlImage);
            })
        }

        // eslint-disable-next-line
    }, [])

    useLayoutEffect(() => {
        const imgContainer = $$('.Add-imgContainer');
        for(let i = 0; i < imgContainer.length; i++) {
            imgContainer[i].classList.remove('hidden');
        }
    }, [data.imageBlobs])

    const handleChangeInput = (e, type) => {
        const value = e.target.value;

        switch(type) {
            case 'tag':
                setData({
                    ...data,
                    tag: value
                })
                break;
            case 'content':
                setData({
                    ...data,
                    content: value
                })
                break;
            default:
                throw new Error('Invalid parameter !');
        }
    }

    const handleSelectImage = (e) => {
        const new_imageBlobs = [];
        const new_imageFiles = []
        const imageInput = e.target.files;
        for(let i = 0; i < imageInput.length; i++) {
            new_imageBlobs.push(URL.createObjectURL(imageInput[i]));
            new_imageFiles.push(imageInput[i]);
        }
        const newImageBlobs = [...data.imageBlobs];
        const newImageFiles = [...data.imageFiles];
        setData({
            ...data,
            imageBlobs: newImageBlobs.concat(new_imageBlobs),
            imageFiles: newImageFiles.concat(new_imageFiles)
        })
    }

    const handleRemoveImage = (index) => {
        const imgContainer = $$('.Add-imgContainer');
        imgContainer[index].classList.add('hidden');

        URL.revokeObjectURL(data.imageBlobs[index]);

        const newImageBlobs = [...data.imageBlobs];
        const newImageFiles = [...data.imageFiles];
        newImageBlobs.splice(index, 1);
        newImageFiles.splice(index, 1);

        setTimeout(() => {
            setData({
                ...data,
                imageBlobs: newImageBlobs,
                imageFiles: newImageFiles
            })
        }, 1000)
    }

    const uploadImage = (files, callback) => {
        const formData = new FormData();
        files.forEach(file => formData.append("file", file));
        axios.post(
            SERVER_ADDRESS_UPLOADIMAGE,
            formData,
            {
                withCredentials: true, 
                onUploadProgress: ProgressEvent => {
                    const circleProcessContainer = $('.Add-circleProcess');
                    let progress1 = Math.round(ProgressEvent.loaded / ProgressEvent.total);
                    setProgress(progress1 * 100);
                    circleProcessContainer.style.background = `conic-gradient(rgb(117, 117, 255) ${progress1*360}deg, white 0deg)`
                }
            }
        ).then(res => {
            if (res.data.status) {
                const paths = res.data.paths;
                const imageUrls = [];
                paths.forEach(path => imageUrls.push(`${SERVER_ADDRESS_GETIMAGE}/${path}`))
                callback(imageUrls);
            }
        }).catch(err => console.error(err));
    }

    const handleSubmit = () => {
        const qLoading = $('.Add-loading')
        const circleProcessContainer = $('.Add-circleProcess');
        const qSubmit = $('.Add-Submit');
        const qContinue = $('.Add-Continue');

        qSubmit.classList.remove('active');
        setTimeout(() => {
            qSubmit.classList.remove('show');
            qContinue.classList.add('show');
            setTimeout(() => {
                qContinue.classList.add('active')
            }, 100)
        }, 500)
        

        circleProcessContainer.classList.add('show');
        setTimeout(() => {
            circleProcessContainer.classList.add('active');
            qLoading.classList.add('active');
        }, 0)

        // console.log([...data.imageFiles])

        setTimeout(() => {
            uploadImage([...data.imageFiles], (imageUrls) => {
                const coppyData = {
                    tag: data.tag,
                    content: data.content,
                    imageUrls: imageUrls
                }
                axios({
                    method: 'post',
                    url: SERVER_ADDRESS_POSTIMAGE,
                    withCredentials: true,
                    data: coppyData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    const resData = res.data;
                    console.log(resData)
                }).catch(error => console.error(error))
            })
        }, 1000)
    }

    const handleContinue = () => {
        const qLoading = $('.Add-loading')
        const circleProcessContainer = $('.Add-circleProcess');
        const qSubmit = $('.Add-Submit');
        const qContinue = $('.Add-Continue');

        qContinue.classList.remove('active');
        setTimeout(() => {
            qContinue.classList.remove('show');
            qSubmit.classList.add('show');
            setTimeout(() => {
                qSubmit.classList.add('active')
            }, 100)
        }, 500)

        circleProcessContainer.classList.remove('active');
        setTimeout(() => {
            setTimeout(() => {
                circleProcessContainer.classList.remove('show');
            }, 500)
            qLoading.classList.remove('active');
        }, 0)

        setProgress(0);
    }

    // const click = (submit) => {
    //     const qLoading = $('.Add-loading')
    //     const circleProcessContainer = $('.Add-circleProcess');
    //     const qSubmit = $('.Add-Submit');
    //     const qContinue = $('.Add-Continue');

    //     if (submit) {
    //         qSubmit.classList.remove('active');
    //         setTimeout(() => {
    //             qSubmit.classList.remove('show');
    //             qContinue.classList.add('show');
    //             setTimeout(() => {
    //                 qContinue.classList.add('active')
    //             }, 100)
    //         }, 500)
            

    //         circleProcessContainer.classList.add('show');
    //         setTimeout(() => {
    //             circleProcessContainer.classList.add('active');
    //             qLoading.classList.add('active');
    //         }, 0)

    //     } else {
    //         qContinue.classList.remove('active');
    //         setTimeout(() => {
    //             qContinue.classList.remove('show');
    //             qSubmit.classList.add('show');
    //             setTimeout(() => {
    //                 qSubmit.classList.add('active')
    //             }, 100)
    //         }, 500)

    //         circleProcessContainer.classList.remove('active');
    //         setTimeout(() => {
    //             setTimeout(() => {
    //                 circleProcessContainer.classList.remove('show');
    //             }, 500)
    //             qLoading.classList.remove('active');
    //         }, 0)
    //     }
    // }

    const list_image = data.imageBlobs.map((data, index) => {
        return (
            <div key={ index } className="Add-imgContainer">
                <RiDeleteBack2Fill onClick={() => handleRemoveImage(index)} size={25} />
                <img src={ data } alt=""/>
            </div>
        )
    });

    return (
        <div className="Add">
            <Header index={ 2 } />
            <div className="Add-main">
                <div className="Add-form">
                    <div className="Add-submitContainer">
                        <span className="Add-loading">Loading ...</span>
                        <button className="Add-Submit show active" onClick={() => handleSubmit()}>Submit</button>
                        <button className="Add-Continue" onClick={() => handleContinue()}>Continue</button>
                    </div>
                    <div className="Add-circleProcessContainer">
                        <div className="Add-circleProcess">
                            <span className="Add-textProcess">{ `${progress}%` }</span>
                        </div>
                    </div>
                    <div className="Add-form-row">
                        <span>Tag</span>
                        <input onChange={(e) => handleChangeInput(e, 'tag')} value={ data.tag } />
                    </div>
                    <div className="Add-form-row">
                        <span>Content</span>
                        <textarea onChange={(e) => handleChangeInput(e, 'content')} value={ data.content } />
                    </div>
                    <div className="Add-form-row">
                        <label className="Add-form-iconImg" htmlFor='inputImg'>
                            <AiFillFileImage size={30} color="green" />
                            <span>Image</span>
                            <input id='inputImg' type='file' hidden="hidden" multiple onChange={(e) => handleSelectImage(e)} />
                            <div className="Add-form-iconImg-div"></div>
                        </label>
                    </div>
                    <div className="Add-form-row images">
                        { list_image }
                    </div>
                </div>
                <div className="Add-custom">
                    ve chung toi
                </div>
            </div>
        </div>
    )
}

export default Add;
import React, { useState, useEffect } from "react";
import './styles.css';

// import { useLocation } from "react-router-dom";
import axios from "axios";

import { AiFillFileImage } from 'react-icons/ai';
import { GiTatteredBanner } from 'react-icons/gi';
import { TiDeleteOutline } from 'react-icons/ti';

import RegisterProviderBodyOverlay from "./components/RegisterProviderBodyOverlay";

import { $ } from "utilize/Tricks";
import { 
    SERVER_ADDRESS_UPLOADIMAGE, 
    SERVER_ADDRESS_GETIMAGE, 
    SERVER_ADDRESS_CREATEPROVIDER 
} from "config/server";


/**
*@typedef {
*name: string,
*avatar: string,
*banner: text,
*follow: integer,
*averageRating: float,
*rateCount: integer,
*status: string,
*uuid_user: uuid
*} providerOptions
*/

const RegisterProviderBody = () => {
    // const { state: navigateState } = useLocation(); // message sent from menu

    const [name, setName] = useState('');
    const [image, setImage] = useState({
        banner: {
            blobPath: null,
            file: null
        },
        avatar: {
            blobPath: null,
            file: null
        }
    })

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(image.banner.blobPath);
            URL.revokeObjectURL(image.avatar.blobPath);
        }

        // eslint-disable-next-line
    }, [])

    const handleCreateProvider = () => {  
        const qLoadingOverlay = $('.RegisterProviderBodyOverlay');  
        const qMessage = $('.RegisterProviderBody-message');
        let providerOptions;
        
        if (name.length > 0) {       
            qLoadingOverlay.classList.add('active');
            const uploadBanner = new Promise((resolve, reject) => {
                try {
                    if (image.banner.file !== null) {
                        uploadImage([image.banner.file], (imageUrls) => {
                            resolve(imageUrls[0]);
                        })
                    } else {
                        resolve('');
                    }
                    
                } catch (error) {
                    reject(error);
                }
            });
    
            const uploadAvatar = new Promise((resolve, reject) => {
                try {
                    if (image.avatar.file !== null) {
                        uploadImage([image.avatar.file], (imageUrls) => {
                            resolve(imageUrls[0]);
                        })
                    } else {
                        resolve('');
                    }
                } catch (error) {
                    reject(error);
                }
            });

            Promise.all([uploadBanner, uploadAvatar]).then((imageUrls) => {
                providerOptions = {
                    name: name,
                    avatar: imageUrls[1],
                    banner: imageUrls[0],
                    follow: 0,
                    averageRating: 0,
                    rateCount: 0,
                    status: 'normal',
                    uuid_user: ''
                }

                axios({
                    method: 'post',
                    url: SERVER_ADDRESS_CREATEPROVIDER,
                    withCredentials: true,
                    data: providerOptions,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    const resData = res.data;
                    if (!resData.exist) {
                        qMessage.classList.add('showSuccess');
                        qMessage.classList.remove('showFailure');
                    } else {
                        qMessage.classList.remove('showSuccess');
                        qMessage.classList.add('showFailure');
                    } 
                    qLoadingOverlay.classList.remove('active')
                }).catch(error => {
                    qMessage.classList.remove('showSuccess');
                    qMessage.classList.add('showFailure');
                    console.error(error);
                }).finally(() => qLoadingOverlay.classList.remove('active'))
            }).catch(error => console.error(error))
        } else {
            $('.RegisterProviderBody-row-nameErr').style.display = 'block';
        }
        
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
            if (res.data.status) {
                const paths = res.data.paths;
                const imageUrls = [];
                paths.forEach(path => imageUrls.push(`${SERVER_ADDRESS_GETIMAGE}${path}`))
                callback(imageUrls);
            }
        }).catch(err => console.error(err));
    }

    const handleRemoveImage = (type) => {
        switch(type) {
            case 'banner':
                $('.RegisterProviderBody-row.banner').classList.add('close');
                URL.revokeObjectURL(image.banner.blobPath);
                setTimeout(() => {
                    setImage({
                        ...image,
                        banner: {
                            blobPath: null,
                            file: null
                        }
                    });
                    $('.RegisterProviderBody-row.banner.close').classList.remove('close');
                }, 500)
                break;
            case 'avatar':
                $('.RegisterProviderBody-row.avatar').classList.add('close');
                URL.revokeObjectURL(image.avatar.blobPath);
                setTimeout(() => {
                    setImage({
                        ...image,
                        avatar: {
                            blobPath: null,
                            file: null
                        }
                    });
                    $('.RegisterProviderBody-row.avatar.close').classList.remove('close');
                }, 500)
                break;
            default:
                throw new Error("Invalid parameter !"); 
        }
    }

    const handleSelectImage = (e, type) => {
        const imageInput = e.target.files;

        switch(type) {
            case 'banner':
                setImage({
                    ...image,
                    banner: {
                        blobPath: URL.createObjectURL(imageInput[0]),
                        file: imageInput[0]
                    }
                })
                break;
            case 'avatar':
                setImage({
                    ...image,
                    avatar: {
                        blobPath: URL.createObjectURL(imageInput[0]),
                        file: imageInput[0]
                    }
                })
                break;
            default:
                throw new Error("Invalid parameter !"); 
        }
    }

    const handleInputName = (e) => {
        const value = e.target.value;
        if (name.length > 0) {
            $('.RegisterProviderBody-row-nameErr').style.display = 'none';
        }
        setName(value);
    }

    return (
        <div className="RegisterProviderBody">
            <div className="RegisterProviderBody-main">
                <div className="RegisterProviderBody-message" />
                <div className="RegisterProviderBody-row">
                    <input value={ name } onChange={(e) => handleInputName(e)} maxLength={50} placeholder="Provider name" />
                </div>
                <span className="RegisterProviderBody-row-nameErr">Provider name is not empty</span>
                <div className="RegisterProviderBody-row">
                    <label className="RegisterProviderBody-rowLabel banner" htmlFor='inputBanner'>
                        <GiTatteredBanner size={30} color="red" />
                        <span>Banner</span>
                        <input id='inputBanner' type='file' hidden="hidden" onChange={(e) => handleSelectImage(e, 'banner')} />
                        <div className="RegisterProviderBody-rowLabel-overlay" />
                    </label>
                </div>
                {image.banner.blobPath && <div className="RegisterProviderBody-row banner">
                    <TiDeleteOutline className="RegisterProviderBody-deleteImage" onClick={() => handleRemoveImage('banner')} size={25} />
                    <img src={ image.banner.blobPath } alt=""/>
                </div>}
                <div className="RegisterProviderBody-row">
                    <label className="RegisterProviderBody-rowLabel avatar" htmlFor='inputAvatar'>
                        <AiFillFileImage size={30} color="green" />
                        <span>Avatar</span>
                        <input id='inputAvatar' type='file' hidden="hidden" onChange={(e) => handleSelectImage(e, 'avatar')} />
                        <div className="RegisterProviderBody-rowLabel-overlay" />
                    </label>
                </div>
                {image.avatar.blobPath && <div className="RegisterProviderBody-row avatar">
                    <TiDeleteOutline className="RegisterProviderBody-deleteImage" onClick={() => handleRemoveImage('avatar')} size={25} />
                    <img src={ image.avatar.blobPath } alt=""/>
                </div>}
                <div className="RegisterProviderBody-row">
                    <button onClick={() => handleCreateProvider()}>Create</button>
                </div>
            </div>  
            <RegisterProviderBodyOverlay />      
        </div>
    )
}

export default RegisterProviderBody;
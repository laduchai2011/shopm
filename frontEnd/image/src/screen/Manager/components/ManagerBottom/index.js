import React, { useState, useRef, useEffect } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { GrAdd } from 'react-icons/gr';
import { AiFillDelete, AiFillEye, AiOutlineCloseCircle } from 'react-icons/ai';

import { SERVER_ADDRESS_GETIMAGELIST_MANAGER } from "config/server";
import { $, $$ } from "utilize/Tricks";
import { Timestamp } from "utilize/Timestamp";


const ManagerBottom = () => {
    const navigate = useNavigate();

    const [imageList, setImageList] = useState([]);

    // const isDatabaseEmpty = useRef(false);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 28;
    const pageAmount = useRef(1);

    useEffect(() => {
        // getImageList(pageNumber.current, pageSize);
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GETIMAGELIST_MANAGER}?pageIndex=${pageNumber}&pageSize=${pageSize}`,
            withCredentials: true
        }).then(res => {
            const resData = res.data;
            const images = resData.images?.rows;
            const count = resData.images?.count;

            // handle page amount
            if(count%pageSize > 0) {
                pageAmount.current = Math.floor(count/pageSize) + 1;
            } else {
                pageAmount.current = Math.floor(count/pageSize);
            }

            if(resData.status) {
                setImageList(images);
            }
        }).catch(error => console.error(error))

    }, [pageNumber])

    // eslint-disable-next-line

    // get data
    // const getImageList = (pageIndex, pageSize) => {
    //     if (!isDatabaseEmpty.current) {
    //         axios({
    //             method: 'get',
    //             url: `${SERVER_ADDRESS_GETIMAGELIST_MANAGER}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    //             withCredentials: true
    //         }).then(res => {
    //             const resData = res.data;
    //             const images = resData.images.rows;
    //             const count = resData.images.count;

    //             // handle page amount
    //             if(count%pageSize > 0) {
    //                 pageAmount.current = Math.floor(count/pageSize) + 1;
    //             } else {
    //                 pageAmount.current = Math.floor(count/pageSize);
    //             }

    //             console.log(resData)
    //             if(resData.status) {
    //                 setImageList(imageList.concat(images));
    //             }
    //         }).catch(error => console.error(error))
    //     }
        
    // }   

    const handleView = (type, index) => {
        const imageRow = $$('.ManagerBottom-row.image');
        const imageContainer = $$('.ManagerBottom-imageContainer');
        const toastMessage = $('.ToastMessage');
        
        switch(type) {
            case 'view':
                imageContainer[index].classList.add('display');
                imageRow[index].classList.add('active');
                setTimeout(() => {
                    imageContainer[index].classList.add('show');
                }, 0)
                break;

            case 'close':
                imageContainer[index].classList.remove('show');
                imageRow[index].classList.remove('active');
                setTimeout(() => {
                    imageContainer[index].classList.remove('display');
                }, 300)
                break;

            case 'delete':
                imageRow.forEach(element => {
                    element.classList.remove('active');
                });
                imageRow[index].classList.add('active');
                if (toastMessage.classList.contains('show')) {
                    toastMessage.classList.remove('show');
                    setTimeout(() => {
                        toastMessage.classList.add('show');
                    }, 1000)
                } else {
                    toastMessage.classList.add('show');
                }
                break;

            default:
                throw new Error('Invalid parameter !');
        }
    }

    const handleAllView = (type) => {
        for(let i = 0; i < imageList.length; i++) {
            handleView(type, i);
        }
    }

    const handlePage = (type) => {
        switch(type) {
            case 'next':
                if (pageNumber < pageAmount.current) {
                    setPageNumber(pre => pre + 1);
                }
                break;

            case 'back':
                if (pageNumber > 1) {
                    setPageNumber(pre => pre - 1);
                }
                break;

            default:
                throw new Error('Invalid parameter !');
        }
    }

    const list_img = imageList.map((data, index) => {   
        return (
            <div key={ index } className="ManagerBottom-row image">
                <div className="ManagerBottom-row-stt">{ index }</div>
                <div className="ManagerBottom-row-id">{ data.uuidImage }</div>
                <div className="ManagerBottom-row-tag">{ data.tag }</div>
                <div className="ManagerBottom-row-content">{ data.content }</div>
                <div className="ManagerBottom-iconContainer image">
                    <AiFillEye onClick={() => handleView('view', index)} color="green" size={20} />
                    <AiFillDelete onClick={() => handleView('delete', index)} color="red" size={20} />
                    <AiOutlineCloseCircle onClick={() => handleView('close', index)} color="gray" size={20} />
                </div>
                <div className="ManagerBottom-imageContainer">
                    <span>{ Timestamp(data.createdAt) }</span>
                    <img src={ data.url } alt=""/>
                </div>
            </div>
        )
    })

    return (
        <div className="ManagerBottom">
            <div className="ManagerBottom-controler">
                <button className="ManagerBottom-addBtn" onClick={() => navigate('/add')}><GrAdd />Add</button>
                <button onClick={() => handlePage('back')}>Back</button>
                <span>{ `${pageNumber}/${pageAmount.current}` }</span>
                <button onClick={() => handlePage('next')}>Next</button>
            </div>
            <div className="ManagerBottom-row header">
                <div className="ManagerBottom-row-stt">STT</div>
                <div className="ManagerBottom-row-id">ID</div>
                <div className="ManagerBottom-row-tag">Tag</div>
                <div className="ManagerBottom-row-content">Content</div>
                <div className="ManagerBottom-iconContainer header">
                    <AiFillEye onClick={() => handleAllView('view')} color="green" size={20} />
                    <AiFillDelete onClick={() => handleAllView('delete')} color="red" size={20} />
                    <AiOutlineCloseCircle onClick={() => handleAllView('close')} color="gray" size={20} />
                </div>
            </div>
            { list_img }
        </div>
    )
}

export default ManagerBottom;
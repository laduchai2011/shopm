import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import './styles.css';

import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

import { FiMoreHorizontal } from 'react-icons/fi';
import { GrNext, GrAddCircle } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';

import { $ } from "utilize/Tricks";
import { ThemeContextApp } from "utilize/ContextApp";
import { SERVER_ADDRESS_GET_MEDICATION_LIST } from "config/server";

const fakeMedication = {
    name: '',
    image: '',
    subject: '',
    object: '',
    symptom: '',
    type: '',
    price: 0,
    note: '',
    catalog: '',
    information: '',
    amount: 0,
    sold: 0,
    discount: 0,
    averageRating: 0,
    rateCount: 0,
    status: '',
    uuid_provider: ''
}

const ProviderBottomProduct = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { clickDocument } = useContext(ThemeContextApp);

    const [state, setSate] = useState({
        medications: [fakeMedication, fakeMedication, fakeMedication, fakeMedication, fakeMedication],
        pageIndex: 1,
        pageAmount: 1, 
        loadData: false
    })
    const pageSize = 5;

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_MEDICATION_LIST}?uuid_provider=${params.id}&pageIndex=${state.pageIndex}&pageSize=${pageSize}`
        }).then(res => {
            const resData = res.data;
            if (resData.success) {
                setSate(pre => {
                    return {
                        ...pre,
                        medications: resData.medications.rows,
                        pageAmount: handlePageAmount(resData.medications.count),
                        loadData: true
                    }
                })
            } else {
                alert(resData.message);
            }
        }).catch(error => console.error(error))
    }, [params.id, state.pageIndex])

    useLayoutEffect(() => {
        if (state.loadData) {
            $('.ProviderBottomProduct').classList.remove('ProviderBottomProduct-loading');
            setSate(pre => {
                return {
                    ...pre,
                    loadData: false
                }
            })
        }
    }, [state])

    const handlePageAmount = (rows) => {
        const mod = rows % 5;
        if (mod > 0) {
            return Math.floor(rows/5) + 1;
        } else {
            return Math.floor(rows/5);
        }
    }

    const handleMore = (e) => {
        e.stopPropagation();
        const optionsShow = $('.ProviderBottomProduct-options');
        optionsShow.classList.toggle('show');
        clickDocument.pushElement(optionsShow);
    }

    const handleIconChangePage = (type) => {

        switch (type) {
            case 'back':
                if (state.pageIndex > 1) {
                    setSate(pre => {
                        return {
                            ...pre,
                            pageIndex: pre.pageIndex - 1
                        }
                    })
                }    
                break;
            
            case 'next':
                if (state.pageIndex < state.pageAmount) {
                    setSate(pre => {
                        return {
                            ...pre,
                            pageIndex: pre.pageIndex + 1
                        }
                    })
                }
                break;
    
            default:
                throw new Error('Invalid action.')
        }
    }

    const handleChangePage = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            const pageIndex = Number(value);
            if ((pageIndex > 0) && (pageIndex <= state.pageAmount)) {
                setSate(pre => {
                    return {
                        ...pre,
                        pageIndex: pageIndex
                    }
                })
            }
        }
    }

    

    const list_medication = state.medications.map((data, index) => {
        const { name, image, subject, object, symptom, type, price, note} = data;
        return (
            <div key={index} className="ProviderBottomProduct-product">
                <div className="ProviderBottomProduct-product-imgContainer">
                    <img src={ image.length > 0 ? JSON.parse(image).urls[0] : image } alt=""/>
                </div>
                <div className="ProviderBottomProduct-product-catolog">-Name: <span>{ name }</span></div>
                <div className="ProviderBottomProduct-product-catolog">-Subject: <span>{ subject }</span></div>
                <div className="ProviderBottomProduct-product-catolog">-Object: <span>{ object }</span></div>
                <div className="ProviderBottomProduct-product-catolog">-Symptom: <span>{ symptom }</span></div>
                <div className="ProviderBottomProduct-product-catolog">-Type: <span>{ type }</span></div>
                <div className="ProviderBottomProduct-product-catolog">-Price: <span>{price}</span></div>
                <div className="ProviderBottomProduct-product-catolog">-Note: <span>{ note }</span></div>
            </div>
        )
    })

    return (
        <div className="ProviderBottomProduct ProviderBottomProduct-loading">
            <div className="ProviderBottomProduct-headerContainer">
                <div className="ProviderBottomProduct-header">Products</div>
                <div className="ProviderBottomProduct-optionsContainer">
                    <FiMoreHorizontal onClick={(e) => handleMore(e)} size={25} />
                    <div className="ProviderBottomProduct-options">
                        <div onClick={() => navigate(`/provider/${params.id}/addMedication`)}>Add Product</div>
                        <div>Delete Product</div>
                        <div onClick={() => navigate(`/provider/${params.id}/manageMedication`)}>Manage Product</div>
                        <div onClick={() => navigate(`/provider/${params.id}/medications`)}>All</div>
                    </div>
                </div>
            </div>
            { state.medications.length === 0 && <div className="ProviderBottomProduct-empty">
                <div><h4>Empty</h4></div>
                <div><GrAddCircle onClick={() => navigate(`/provider/${params.id}/addMedication`)} /></div>
            </div> }
            <div className="ProviderBottomProduct-container">
                { state.medications.length > 0 && <>{ list_medication }</> }
            </div>
            <div className="ProviderBottomProduct-custom">
                <IoIosArrowBack onClick={() => handleIconChangePage('back')} size={20} />
                <input value={ state.pageIndex } onChange={(e) => handleChangePage(e)} />
                <span>/ { state.pageAmount }</span>
                <span onClick={() => navigate(`/provider/${params.id}/medications`)}>All</span>
                <GrNext onClick={() => handleIconChangePage('next')} />
            </div>
        </div>
    )
}

export default ProviderBottomProduct;
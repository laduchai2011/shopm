import React, { memo, useContext, useEffect, useState } from 'react';
import './styles.css';

import axios from 'axios';

import { CiCircleRemove } from 'react-icons/ci';

import { $ } from 'utilize/Tricks';
import { MedicationContext } from "screen/Medication/MedicationContext";
import { SERVER_ADDRESS_CREATE_ORDERMEDICATION } from 'config/server';

/**
*@typedef {
*title: string,
*image_video: text,
*note1: text,
*note2: text,
*history: string,
*total: float,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} orderAllMedicationOptions
*/ 

/**
*@typedef {
*amount: int,
*uuid_orderAllMedication: uuid,
*uuid_medication: uuid
*} orderMedicationOptions
*/ 

/**
*@typedef {
*type: string,
*information: text,
*cost: int,
*status: string,
*uuid_orderMedication: uuid
*} paymentMedicationOptions
*/ 

/**
*@typedef {
*type: string,
*information: text,
*cost: int,
*status: string,
*uuid_orderMedication: uuid
*} transportOptions
*/ 

const MedicationPay = () => {
    const { medicationSate, buyNow, setBuyNow } = useContext(MedicationContext);
    // const [buy, setBuy] = useState(false);
    const [medicationPayState, setMedicationPayState] = useState({
        buy: false,
        transportCost: 20, 
        uuid_orderMedication: '',
        notification: ''
    });

    useEffect(() => {
        if (buyNow.status) {
            $('.MedicationPay').classList.add('active');
        } else {
            $('.MedicationPay').classList.remove('active');
        }
        const q_buy = $('.MedicationPay-buy');
        q_buy.children[0].classList.remove('active');
    }, [buyNow])

    const handleClose = () => {
        setBuyNow(pre => {
            return {
                ...pre,
                status: false
            }
        }); 
    }

    const handleBuy = () => {
        // const orderFinalMedicationOptions = {
        //     medicateList: JSON.stringify({medications: [medicationSate.uuid_medication]}), 
        //     note: 'thuoc ho',
        //     history: '10000',
        //     payments: 'cash',
        //     total: buyNow.priceTotal + medicationPayState.transportCost,
        //     transportCost: medicationPayState.transportCost,
        //     uuid_doctorOrPharmacist: null,
        //     uuid_user: ''
        // }
        const orderFinalMedicationOptions = {
            orderAllMedicationOptions: {
                title: '',
                image_video: null,
                note1: '',
                note2: null,
                history: '10000',
                total: buyNow.priceTotal + medicationPayState.transportCost,
                status: 'normal',
                uuid_doctorOrPharmacist: null,
                uuid_user: ''
            },
            orderMedicationOptionsList: [
                {
                    amount: buyNow.orderAmount,
                    uuid_orderAllMedication: '',
                    uuid_medication: medicationSate.uuid_medication
                }
            ],
            paymentMedicationOptions: {
                type: 'cash',
                information: null,
                cost: 0,
                status: 'normal',
                uuid_orderAllMedication: ''
            },
            transportOptions: {
                type: 'normal',
                information: JSON.stringify({transportCost: [medicationPayState.transportCost]}),
                cost: 100,
                status: 'normal',
                uuid_orderMedication: ''
            }
        }
        axios({
            method: 'post',
            url: SERVER_ADDRESS_CREATE_ORDERMEDICATION,
            withCredentials: true,
            data: orderFinalMedicationOptions,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            // console.log(resData)
            if (resData.success) {
                setMedicationPayState(pre => {
                    return {
                        ...pre,
                        buy: true,
                        uuid_orderMedication: resData.orderAllMedication.uuid_orderAllMedication,
                        notification: 'Order is successly, order view in '
                    }
                })
            } else {
                setMedicationPayState(pre => {
                    return {
                        ...pre,
                        buy: true,
                        uuid_orderMedication: resData.orderAllMedication.uuid_orderAllMedication,
                        notification: 'Order is NOT successly'
                    }
                })
            }
            const q_buy = $('.MedicationPay-buy');
            q_buy.children[0].classList.add('active');
        }).catch(err => console.error(err))
        
        // setBuy(true);
    }

    return (
        <div className='MedicationPay'>
            <CiCircleRemove size={25} onClick={() => handleClose()} />
            <div className='MedicationPay-header'><span>Pay</span></div>
            <div>
                <div className='MedicationPay-pay'>
                    <div className='MedicationPay-pay-header'>Payments</div>
                    <div className='MedicationPay-pay-content'>
                        <span>Cash ( default )</span>
                    </div>
                </div>
                <div className='MedicationPay-transport'>
                    <div className='MedicationPay-transport-header'>Transport</div>
                    <div className='MedicationPay-transport-content'>
                        <span>{ medicationPayState.transportCost } $</span>
                    </div>
                </div>
                <div className='MedicationPay-total'>
                    <div className='MedicationPay-total-header'>Total</div>
                    <div className='MedicationPay-total-content'>
                        <span>{ buyNow.priceTotal + medicationPayState.transportCost } $</span>
                    </div>
                </div>
                <div className='MedicationPay-buy'>
                    <div>
                        <span>{ medicationPayState.notification } { medicationPayState.buy && <a href={`/medication/order/${medicationPayState.uuid_orderMedication}`}>here</a>} !</span>
                    </div>
                    <div>
                        <button onClick={() => handleBuy()}>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(MedicationPay);
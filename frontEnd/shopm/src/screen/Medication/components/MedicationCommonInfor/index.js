import React, { useContext, useState, memo, useEffect } from "react";
import './styles.css';

import { GrAdd, GrSubtract } from 'react-icons/gr';
import { AiOutlineShoppingCart} from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'; 

import { MedicationContext } from "screen/Medication/MedicationContext";

import { Timestamp } from "utilize/Timestamp";

import { useGetCurrentCartQuery } from 'reduxStore/RTKQuery/currentCartRTKQuery';
import { 
    useLazyGetCaseRecordQuery,
    useAddCaseRecordMedicationsMutation
} from "reduxStore/RTKQuery/caseRecordRTKQuery";

import { baseURL } from "config/server";


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
*uuid_caseRecord: uuid,
*uuid_medication: uuid
*} caseRecordMedicationOptions
*/  

const MedicationCommonInfor = () => {
    const { medicationSate, setBuyNow } = useContext(MedicationContext);
    const [imgs, setImgs] = useState({
        show: JSON.parse(medicationSate.image).urls[0],
        list: JSON.parse(medicationSate.image).urls
    });

    const [caclPrice, setCaclPrice] = useState({
        orderAmount: 1,
        allPrice: medicationSate.price,
        discount: medicationSate.price * medicationSate.discount/100, 
        finalyPrice: medicationSate.price - medicationSate.price * medicationSate.discount/100
    });

    const [getCaseRecord] = useLazyGetCaseRecordQuery();
    const [addCaseRecordMedications] = useAddCaseRecordMedicationsMutation();

    const { 
        data: data_currentCart,
        isError: isError_currentCart,
        error: error_currentCart
    } = useGetCurrentCartQuery();

    useEffect(() => {
        isError_currentCart && console.log(error_currentCart);
    }, [isError_currentCart, error_currentCart])
    useEffect(() => {
        // console.log('MedicationCommonInfor', data_currentCart)
    }, [data_currentCart])

    const selectImg = (index) => {
        setImgs({
            ...imgs,
            show: imgs.list[index]
        })
    }

    const handleOrderAmount = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            alert('Amount must is a number > 0 !');
        } else {
            const new_caclPrice = {...caclPrice}
            if (Number(value) > medicationSate.amount) {
                new_caclPrice.orderAmount = medicationSate.amount;
            } else {
                new_caclPrice.orderAmount = Number(value);
            }
            new_caclPrice.allPrice = new_caclPrice.orderAmount * medicationSate.price;
            new_caclPrice.discount = new_caclPrice.allPrice * (medicationSate.discount/100);
            new_caclPrice.finalyPrice = new_caclPrice.allPrice - new_caclPrice.discount;
            setCaclPrice(new_caclPrice);
        }
    }

    const handleOrderAmountIcon = (type) => {
        const new_caclPrice = {...caclPrice}
        switch (type) {
            case 'add':
                if (new_caclPrice.orderAmount < medicationSate.amount) {
                    new_caclPrice.orderAmount = new_caclPrice.orderAmount + 1;
                }
                break;
            case 'sub':
                if (new_caclPrice.orderAmount > 1) {
                    new_caclPrice.orderAmount = new_caclPrice.orderAmount - 1;
                }
                break;
        
            default:
                throw new Error('Invalid action.')
        }

        new_caclPrice.allPrice = new_caclPrice.orderAmount * medicationSate.price;
        new_caclPrice.discount = new_caclPrice.allPrice * (medicationSate.discount/100);
        new_caclPrice.finalyPrice = new_caclPrice.allPrice - new_caclPrice.discount;
    
        setCaclPrice(new_caclPrice);
    }

    const handleBuyNow = () => {
        setBuyNow({
            orderAmount: caclPrice.orderAmount,
            priceTotal: caclPrice.finalyPrice,
            status: true
        });
    }

    const handleAddCart = () => {
        // check carrent cart
        if (data_currentCart?.success) {
            const currentCart = data_currentCart.currentCart;
            getCaseRecord({
                uuid_caseRecord: currentCart.uuid_caseRecord
            }).then(res => {
                const resData = res.data;
                if (resData?.success) {
                    const caseRecord = resData.caseRecord;
                    const caseRecordMedicationOptions = {
                        pageNumber: currentCart.pageNumber,
                        name: medicationSate.name,
                        amount: caclPrice.orderAmount,
                        note: 'chua sot',
                        price: medicationSate.price,
                        discount: medicationSate.discount,
                        cost: caclPrice.finalyPrice,
                        status: 'notComplete',
                        uuid_caseRecord: currentCart.uuid_caseRecord,
                        uuid_medication: medicationSate.uuid_medication
                    }
                    addCaseRecordMedications({
                        uuid_caseRecord: currentCart.uuid_caseRecord, 
                        pageNumber: currentCart.pageNumber.toString(),
                        caseRecordMedicationOptions: caseRecordMedicationOptions
                    }).then(res1 => {
                        const resData1 = res1.data;
                        if (resData1?.success) {} else { alert(resData1?.message) }
                    }).catch(err => console.error(err));
                } else {
                    console.log(resData.message);
                }
            }).catch(err => console.error(err));
        } else {
            alert('You have NOT current cart !');
        }
    }

    const listImg = imgs.list.map((data, index) => {
        return (
            <img key={index} src={data} onClick={() => selectImg(index)} alt="" />
        )
    })

    const isIntergerRange = (fistInt, lastInt, averageInt) => {
        if (averageInt >= 0) {
            if ((fistInt <= averageInt) && (averageInt < lastInt)) {
                return true;
            } 
            return false
        }
        return false;
    } 

    const list_star = [0,1,2,3,4].map((data1, index) => {
        const averageRating = medicationSate.averageRating;
        return (
            <div key={index}>
            {
                isIntergerRange(0, 0.25, averageRating - data1) ? 
                <BsStar key={index} size={20} color="red" /> : <>{
                    isIntergerRange(0.25, 0.75, averageRating - data1) ? 
                    <BsStarHalf key={index} size={20} color="red" /> : <>{
                        isIntergerRange(0.75, 1, averageRating - data1) ? 
                        <BsStarFill key={index} size={20} color="red" /> : <>{
                            isIntergerRange(1, 5, averageRating - data1) ?
                            <BsStarFill key={index} size={20} color="red" /> : 
                            <BsStar key={index} size={20} color="red" />
                        }</>
                    }</>
                }</> 
            }
            </div>
        )
    })

    return (
        <div className="MedicationCommonInfor">
            <div className="MedicationCommonInfor-imgContainer">
                <img className="MedicationCommonInfor-mainImg" src={imgs.show} alt=""/>
                <div className="MedicationCommonInfor-listImg">
                    { listImg }
                </div>
            </div>
            <div className="MedicationCommonInfor-text">
                <div className="MedicationCommonInfor-text-top">
                    <h2>{ medicationSate.name }</h2>
                    <div className="MedicationCommonInfor-listStar">{ list_star }</div>
                    <h5>Provider:<a href={`${baseURL}:3000/provider/${medicationSate.uuid_provider}`}> go to Provider</a></h5>
                    <h5>Status: { medicationSate.status } / Time: { Timestamp(medicationSate.createdAt) }</h5>
                    <div className="MedicationCommonInfor-warn">
                        Warning: Let select a Doctor/Pharmacist to buy
                    </div>
                    <div className="MedicationCommonInfor-text1">
                        <div><strong>Subject</strong></div>
                        <div>{ medicationSate.subject }</div>
                        <div><strong>Object</strong></div>
                        <div>{ medicationSate.object }</div>
                        <div><strong>Symptom</strong></div>
                        <div>{ medicationSate.symptom }</div>
                        <div><strong>Type</strong></div>
                        <div>{ medicationSate.type }</div>
                        <div><strong>Note</strong></div>
                        <div>{ medicationSate.note }</div>
                    </div>
                </div>
                <div className="MedicationCommonInfor-text-bottom">
                    <div className="MedicationCommonInfor-text-bottom-1">
                        <div>{ medicationSate.sold } / { medicationSate.amount }</div>
                        <div>{ medicationSate.price } $</div>
                        <div>{ medicationSate.discount } %</div>
                    </div>
                    <div className="MedicationCommonInfor-text-bottom-2">
                        <div>
                            <GrSubtract onClick={() => handleOrderAmountIcon('sub')} />
                            <input value={caclPrice.orderAmount} onChange={(e) => handleOrderAmount(e)} />
                            <GrAdd onClick={() => handleOrderAmountIcon('add')} />
                        </div>
                        <div>
                            { caclPrice.orderAmount } : { `${caclPrice.allPrice} $` } : { `${caclPrice.discount} $` } = <strong>{`: ${caclPrice.finalyPrice} $`}</strong>
                        </div>
                        <div>
                            <button onClick={() => handleBuyNow()}>Buy Now</button>
                            <button onClick={() => handleAddCart()}><AiOutlineShoppingCart /> Add Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(MedicationCommonInfor);
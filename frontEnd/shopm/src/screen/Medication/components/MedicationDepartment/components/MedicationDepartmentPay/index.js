import React, { useState, useRef } from "react";
import './styles.css';

import { 
    BigUpArrow,
    BigDownArrow,
    Overlay,
    DeleteCircle
} from "react-tks/components";
import { moneyString } from 'react-tks/utils';

import {QRCodeSVG} from 'qrcode.react';


const MedicationDepartmentPay = ({selectedDepartments_toBuy_subGroup, total}) => {

    const moneyString_ = (numberString) => {
        return moneyString({
            numberString: numberString,
            money_type: 'VND',
            alias_list: ['K', 'TR', 'T', 'KT'],
            isLog: true
        })
    } 

    const isData = selectedDepartments_toBuy_subGroup.length > 0 ? true : false;
    const text_dialog = isData ? 'Pay via this QR. Please.' : 'There are NOT orders yet';
    
    const [isShow_methodPay, set_isShow_methodPay] = useState(false);
    const show_pay_method_element = useRef(null);
    const [payType, setPayType] = useState('cash');
    const [text, setText] = useState('Cash selected (default)');

    const handleShow_payMethod = () => {
        let isShow = isShow_methodPay;
        if (show_pay_method_element.current) {
            if (show_pay_method_element.current.classList.contains('show')) {
                show_pay_method_element.current.classList.remove('show');
                isShow = false;
            } else {
                show_pay_method_element.current.classList.add('show');
                isShow = true;
            }
        }

        setTimeout(() => {
            set_isShow_methodPay(isShow);
        }, 300)
    }

    const handleSelecte = (type) => {
        setPayType(type);
        if (type==='cash') {
            setText('Cash selected (default)');
        }
        if (type==='transfer') {
            setText('Transfer');
        }
    }

    const [isShow_QRPay, set_isShow_QRPay] = useState(false);
    const handleShowQRPay = () => {
        set_isShow_QRPay(true);
    }
   
    const handleClose_overlay = (TKS) => {
        const isShow = TKS.data.isShow;
        set_isShow_QRPay(isShow);
    }

    const handleClose_overlay_deleteIcon = () => {
        set_isShow_QRPay(false);
    }

    return (
        <div className="MedicationDepartmentPay">
            <div>
                <div>Pay Method</div>
                {
                    isShow_methodPay ?
                    <BigUpArrow onClick={() => handleShow_payMethod()} /> :
                    <BigDownArrow onClick={() => handleShow_payMethod()} />
                }  
            </div>
            <div ref={show_pay_method_element}>
                <div>
                    <div>{ text }</div>
                    { payType==='transfer' && <div><button onClick={() => handleShowQRPay()}>Click to pay</button></div> }
                </div>
                <div>
                    <div onClick={() => handleSelecte('cash')}>Cash</div>
                    <div onClick={() => handleSelecte('transfer')}>Transfer</div>
                </div>
            </div>
            <Overlay
                className="MedicationDepartmentPay-QR_Dialog"
                overlay={{
                    control: { isShow: isShow_QRPay },
                    event: { onClose: (TKS) => handleClose_overlay(TKS)}
                }}
            >
                <div>
                    <div>
                        <DeleteCircle onClick={() => handleClose_overlay_deleteIcon()} />
                    </div>
                    <div>
                        <p>{text_dialog}</p>
                    </div>
                    <div>
                        <p>Total: <strong>{ `${moneyString_(Math.round(total).toString()).full_with_round} (${total})` }</strong></p>
                    </div>
                    { isData && <div>
                        <QRCodeSVG value="https://reactjs.org/" />
                    </div> }
                </div>
            </Overlay>
        </div>
    )
}

export default MedicationDepartmentPay;
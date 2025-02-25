import React, { useState, useRef} from "react";
import './styles.css';

import { 
    BigUpArrow,
    BigDownArrow,
    Overlay
} from "react-tks/components";

const MedicationDepartmentPay = () => {
    
    const [isShow_methodPay, set_isShow_methodPay] = useState(false);
    const show_pay_method_element = useRef(null);
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
                <div>Cash selected (default)</div>
                <div>
                    <div>Cash</div>
                    <div>Transfer</div>
                </div>
            </div>
            <Overlay overlay={{
                control: { isShow: true },
                // event: { onClose: (TKS) => handleClose_overlay(TKS)}
            }}></Overlay>
        </div>
    )
}

export default MedicationDepartmentPay;
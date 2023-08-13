import React, { useState } from "react";
import './styles.css';

import { RiFolderWarningFill } from 'react-icons/ri';

import { $ } from "utilize/Tricks";

const ToastMessage = () => {

    const [deleting, setDeleting] = useState(false);

    const handleOke = () => {
        $('.ToastMessage-button div').classList.add('oke');
        setDeleting(true);
    }

    const handleCancle = () => {
        const toastMessage = $('.ToastMessage');
        toastMessage.classList.remove('show');
        $('.ToastMessage-button div').classList.remove('oke');
        $('.row.image.active').classList.remove('active');
        setTimeout(() => {
            setDeleting(false);
        }, 1000)
    }

    return (
        <div className="ToastMessage">
            <div className="ToastMessage-content">
                {
                    deleting ? 
                    <div className="ToastMessage-deleting">
                        <span>Deleting</span>
                        <span> </span>
                        <span className="ToastMessage-deleting-dot" style={{'--i': 1}}>.</span>
                        <span className="ToastMessage-deleting-dot" style={{'--i': 2}}>.</span>
                        <span className="ToastMessage-deleting-dot" style={{'--i': 3}}>.</span>
                    </div>:
                    <>
                        <RiFolderWarningFill size={20} color="blue" />
                        <div>Are you sure deleting image !</div>
                    </>
                }
            </div>
            <div  className="ToastMessage-button">
                {
                    deleting ? 
                    <div onClick={() => handleCancle()}>Cancle</div>:
                    <>
                        <div onClick={() => handleOke()}>Oke</div>
                        <div onClick={() => handleCancle()}>Cancle</div>
                    </>
                }      
            </div>
        </div>
    )
}

export default ToastMessage;
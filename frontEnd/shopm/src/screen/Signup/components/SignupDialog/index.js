import React, { memo } from "react";
import './styles.css';

import { $, $$ } from "utilize/Tricks";

const SignupDialog = ({ onSetEmailOrPhone }) => {

    const handleSelect = (type) => {
        const dialog = $('.SignupDialog');
        const icons = $$('.Signup-form-input-icon');

        dialog.classList.remove('show');
        for(let i = 0; i < icons.length; i++) {
            icons[i].classList.remove('active');
            icons[i].classList.remove('display');
        }
        switch(type) {
            case 'email':
                icons[0].classList.add('display');
                setTimeout(() => {
                    icons[0].classList.add('active');
                }, 500)
                onSetEmailOrPhone('Email', 'email', '.+@globex.com');
                break;
            case 'phone':
                icons[1].classList.add('display');
                setTimeout(() => {
                    icons[1].classList.add('active');
                }, 500)
                onSetEmailOrPhone('Phone', 'tel', '[0-9]{3}-[0-9]{2}-[0-9]{3}');
                break;
            default:
                throw new Error('Invalid parameter !');
        }
    }

    return (
        <div className="SignupDialog">
            <div className="SignupDialog-msg">Email or Phone ?</div>
            <div className="SignupDialog-btn">
                <button onClick={() => handleSelect('email')}>Email</button>
                <button onClick={() => handleSelect('phone')}>Phone</button>
            </div>
        </div>
    )
}

export default memo(SignupDialog);
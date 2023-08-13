import React, { memo, useState } from "react";
import './styles.css';

import axios from "axios";

import { verifyCode } from '../../firebase';
import { SERVER_ADDRESS_SIGNUP } from "config/server";

const SignupVerify = () => {
    const [code, setCode] = useState('');
    const [note, setNote] = useState('');

    const handleCode = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            setNote('Input must is number !');
        } else {
            setCode(Number(value));
        }
    }

    const handleAccept = () => {
        verifyCode(code, (result) => {
            const idToken = result._tokenResponse.idToken;
            axios({
                method: 'post',
                url: SERVER_ADDRESS_SIGNUP,
                data: {}, 
                headers: {
                    'X-Firebase-CheckToken': idToken,
                }
            }).then((res) => {
                console.log(res.data)
            }).catch(error => console.error(error))
        });
    }
    
    return (
        <div className="SignupVerify">
            <div className="SignupVerify-inputContainer">
                <div className="SignupVerify-note">{ note }</div>
                <input value={ code } onChange={(e) => handleCode(e)} placeholder="code" />
            </div>
            <div className="SignupVerify-btn">
                <button onClick={() => handleAccept()}>Accept</button>
                <button>Cancel</button>
            </div>
        </div>
    )
}

export default memo(SignupVerify);
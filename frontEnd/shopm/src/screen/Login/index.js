import React, { useState } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";
import axios from "axios";

import backgroundtop from './images/backgroundtop.png';
import backgroundtopsmall from './images/backgroundtopsmall.png';
import backgroundbottom from './images/backgroundbottom.png';
import backgroundbottomsmall from './images/backgroundbottomsmall.png';
import user from './icons/user.svg';
import password from './icons/password.svg';
import nextlarge from './icons/nextlarge.svg';
import nextsmall from './icons/nextsmall.svg';

import { isSpace, isSpecialChar } from "utilize/StringValidate";
import { SERVER_ADDRESS_LOGIN } from "config/server";

const Login = () => {

    const navigate = useNavigate();
    const [infor, setInfor] = useState({
        user: '',
        password: ''
    })

    const [note, setNote] = useState('');

    // document.cookie = `user=hai; expires=${ new Date()}`

    const handleInfor = (e, type) => {
        const value = e.target.value;

        if (isSpace(value)) {
            alert('Account or passwork is not space');
        } else if (isSpecialChar(value)) {
            alert('Account or passwork is not special char');
        }

        switch(type) {
            case 'account':
                setInfor({
                    ...infor, 
                    user: value
                })
                break;
            
            case 'password':
                setInfor({
                    ...infor,
                    password: value
                })
                break;

            default:
                throw new Error('Parameter invalid !');
        }
    }

    const handleLogin = () => {
        if (infor.user==='') {
            alert('Account is not allow empty !');
        } else if (infor.password==='') {
            alert('Password is not allow empty !');
        } else {
            axios({
                method: 'post',
                url: SERVER_ADDRESS_LOGIN,
                withCredentials: true,
                data: infor, 
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                const resData = res.data;
                console.log('resData', resData)
                if (resData.exist) {
                    navigate('/');
                } else {
                    setNote(resData.message)
                }
            }).catch(error => console.error(error))
        }
    }
    
    return (
        <div className="Login">
            <div className="Login-main">
                <div className="Login-main-top">
                    <img src={backgroundtop} alt=""/>
                    <img src={backgroundtopsmall} alt=""/>
                    <span className="Login-main-top-span">Login</span>
                </div>
                <div className="Login-form">
                    <div className="Login-form-inputContainer">
                        <div className="Login-form-input Login-form-inputUser">
                            <img src={user} alt="" />
                            <input value={ infor.user } onChange={(e) => handleInfor(e, 'account')} placeholder="Account" type="text" />
                        </div>
                        <div className="Login-form-mid"/>
                        <div className="Login-form-input Login-form-inputPassword">
                            <img src={password} alt="" />
                            <input value={ infor.password} onChange={(e) => handleInfor(e, 'password')} placeholder="***********" type='password' />
                        </div>
                    </div>
                    <img className="Login-form-next" onClick={() => handleLogin()} src={nextlarge} alt="" />
                </div>
                <span className="Login-note">{ note }</span>
                <span className="Login-forgot">Forgot ?</span>
                <div className="Login-register">
                    <span>Register</span>
                    <img src={nextsmall} alt="" />
                </div>
                <div className="Login-main-bottom">
                    <img className="Login-main-bottom-img1" src={backgroundbottom} alt="" />
                    <img className="Login-main-bottom-img2" src={backgroundbottomsmall} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login;
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

import axios from "axios";

import backgroundtop from './images/backgroundtop.png';
import backgroundtopsmall1 from './images/backgroundtopsmall1.png';
import backgroundtopsmall2 from './images/backgroundtopsmall2.png';
import backgroundbottom from './images/backgroundbottom.png';
import backgroundbottomsmall1 from './images/backgroundbottomsmall1.png';
import backgroundbottomsmall2 from './images/backgroundbottomsmall2.png';
import user from './icons/user.svg';
// import email from './icons/email.svg';
import password from './icons/password.svg';
import repassword from './icons/repassword.svg';

import { AiFillPhone, AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { HiCursorClick } from 'react-icons/hi';

import { $ } from "utilize/Tricks";
import { ThemeContextApp } from "utilize/ContextApp";
// import SignupDialog from "./components/SignupDialog";
import SignupVerify from "./components/SignupVerify";
import SignupMessage from "./components/SignupMessage";

// import { renderCaptcha, clearCaptcha, phoneAuth } from "./firebase";
import { SERVER_ADDRESS_SIGNUP } from "config/server";
import { isSpace, isSpecialChar } from "utilize/StringValidate";

/**
*@typedef {
*user: string, 
*password: string,
*phone: string,
*firstName: string,
*lastName: string
*} userOptions
*/

const Signup = () => {

    // const [emailOrPhone, setEmailOrPhone] = useState({
    //     placeholder: 'Email (default) or Phone',
    //     type: 'email',
    //     pattern: '.+@globex.com'
    // });

    const navigate = useNavigate();

    const message = useRef({});
    const [note, setNote] = useState('');

    // infor is userOptions
    const [infor, setInfor] = useState({
        user: '',
        password: '',
        rePassword: '',
        phone: '',
        firstName: '',
        lastName: ''
    });

    const clickDocument = useContext(ThemeContextApp);

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    useEffect(() => {
        // renderCaptcha();
        // return () => {
        //     clearCaptcha();
        // }
    }, [])

    const handleSignup = () => {
        // phoneAuth('+84789860854', () => {
        //     const qvery = $('.SignupVerify');
        //     qvery.classList.add('show');
        // });
        setNote('');
        if (infor.user==='') {
            setNote('Account is not allow empty !');
        } else if (infor.firstName==='') {
            setNote('First Name is not allow empty !');
        } else if (infor.lastName==='') {
            setNote('Last Name is not allow empty !');
        } else if (infor.phone==='') {
            setNote('Phone is not allow empty !');
        } else if (infor.password==='') {
            setNote('Password is not allow empty !');
        } else if (infor.rePassword==='') {
            setNote('Confirm Password is not allow empty !');
        } else if (infor.password !== infor.rePassword) {
            setNote('Password is not the same !');
        } else {
            const loadingIcon = $('.Signup-loading');
            const signupSpan = $('.Signup-signupSpan');

            loadingIcon.classList.add('loading');
            signupSpan.classList.add('hidden');

            setTimeout(() => {
                axios({
                    method: 'post',
                    url: SERVER_ADDRESS_SIGNUP,
                    data: infor
                }).then((res) => {
                    const data = res.data;
                    console.log(data)
                    if (data.exist) {
                        loadingIcon.classList.remove('loading');
                        signupSpan.classList.remove('hidden');
                        setNote(data.message);
                    } else {
                        navigate('/login');
                    }
                }).catch(error => console.error(error))
            }, 3000)
        }
    }

    const handleSignin = () => {
        axios({
            method: 'post',
            url: SERVER_ADDRESS_SIGNUP,
            data: {}, 
            headers: {
                'X-Firebase-CheckToken': '11111111111111',
            }
        }).then((res) => {
            console.log(res.data)
        }).catch(error => console.error(error))
    }

    // const callback_setEmailOrPhone = useCallback((placeholder, type, pattern) => {
    //     setEmailOrPhone({
    //         placeholder: placeholder,
    //         type: type,
    //         pattern: pattern
    //     })
    // }, [])

    // const handleSelect = (e) => {
    //     e.stopPropagation();
    //     const dialog = $('.SignupDialog');
    //     dialog.classList.add('show');
    //     clickDocument.pushElement(dialog);
    // }

    const handleInfor = (e, type) => {
        const value = e.target.value;
        let attribute;

        if (isSpace(value) || isSpecialChar(value)) {
            switch(type) {
                case 'account':
                    attribute = 'Account'
                    break;
    
                case 'firstName':
                    attribute = 'First Name'
                    break;
    
                case 'lastName':
                    attribute = 'Last Name'
                    break;

                case 'phone':
                    attribute = 'Phone'
                    break;
                
                case 'password':
                    attribute = 'Password Name'
                    break;
    
                case 'rePassword':
                    attribute = 'Repassword Name'
                    break;
    
                default:
                    throw new Error('Parameter invalid !');
            }
            if (isSpace(value)) {
                message.current = {
                    attribute: attribute,
                    message: 'not allow space !'
                };
            }
            if (isSpecialChar(value)) {
                message.current = {
                    attribute: attribute,
                    message: 'not allow special char !'
                };
            }
            const qMessage = $('.SignupMessage');
            qMessage.classList.add('show');
            setTimeout(() => {
                qMessage.classList.remove('show');
            }, 2000)
        }

        switch(type) {
            case 'account':
                setInfor({
                    ...infor, 
                    user: value
                })
                break;

            case 'firstName':
                setInfor({
                    ...infor, 
                    firstName: value
                })
                break;

            case 'lastName':
                setInfor({
                    ...infor, 
                    lastName: value
                })
                break;

            case 'phone':
                setInfor({
                    ...infor, 
                    phone: value
                })
                break;
            
            case 'password':
                setInfor({
                    ...infor, 
                    password: value
                })
                break;

            case 'rePassword':
                setInfor({
                    ...infor, 
                    rePassword: value
                })
                break;

            default:
                throw new Error('Parameter invalid !');
        }

        
    }

    return (
        <div className="Signup">
            <div className="Signup-main">
                <div className="Signup-main-top">
                    <img src={backgroundtop} alt="" />
                    <img src={backgroundtopsmall1} alt="" />
                    <img src={backgroundtopsmall2} alt="" />
                    <span>Sign Up</span>
                </div>
                <div className="Signup-form">
                    <div className="Signup-form-input">
                        <img src={user} alt="" />
                        <input value={ infor.user } onChange={(e) => handleInfor(e, 'account')} placeholder="Account" type="text" maxLength={100} />
                    </div>
                    <div className="Signup-form-input">
                        <img src={user} alt="" />
                        <input value={ infor.firstName } onChange={(e) => handleInfor(e, 'firstName')} placeholder="First Name" type="text" maxLength={100} />
                    </div>
                    <div className="Signup-form-input">
                        <img src={user} alt="" />
                        <input value={ infor.lastName } onChange={(e) => handleInfor(e, 'lastName')} placeholder="Last Name" type="text" maxLength={100} />
                    </div>
                    <div className="Signup-form-input">
                        {/* <img className="Signup-form-input-icon display active" src={email} alt="" /> */}
                        <AiFillPhone className="Signup-form-input-icon display active" />
                        {/* <HiCursorClick onClick={(e) => handleSelect(e)} /> */}
                        <input value={ infor.phone } onChange={(e) => handleInfor(e, 'phone')} placeholder="Phone Number" type='[0-9]{3}-[0-9]{2}-[0-9]{3}' maxLength={100} />
                    </div>
                    <div className="Signup-form-input">
                        <img src={password} alt="" />
                        <input value={ infor.password } onChange={(e) => handleInfor(e, 'password')} placeholder="Password***" type="password" maxLength={100} />
                    </div>
                    <div className="Signup-form-input">
                        <img src={repassword} alt="" />
                        <input value={ infor.rePassword } onChange={(e) => handleInfor(e, 'rePassword')} placeholder="Confirm Password***" type="password" maxLength={100} />
                    </div>
                </div>
                <div className="Signup-note">{ note }</div>
                <div className="Signup-signup" id="Signup-signup" onClick={() => handleSignup()}>
                    <AiOutlineLoading3Quarters className="Signup-loading" size={20} color="blue" />
                    <span className="Signup-signupSpan">Sign Up</span>
                </div>
                <span className="Signup-account" onClick={() => handleSignin()}>Have an Account ?</span>
                <div className="Signup-login">
                    <span>Login</span>
                </div>
                <div className="Signup-recaptcha-container">
                    <div id="Signup-recaptcha-container"/>
                </div>
                <div className="Signup-main-bottom">
                    <img src={backgroundbottom} alt="" />
                    <img src={backgroundbottomsmall1} alt="" />
                    <img src={backgroundbottomsmall2} alt="" />
                </div>
            </div>
            {/* <SignupDialog onSetEmailOrPhone={ callback_setEmailOrPhone } /> */}
            <SignupVerify />
            <SignupMessage message={ message.current } />
        </div>
    )
}

export default Signup;
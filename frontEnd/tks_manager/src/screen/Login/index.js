import React, { useState, useEffect, useContext } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import axios from 'axios';

import { ThemeContextApp } from "utilize/ContextApp";

import { SERVER_ADDRESS_READ_TOLOGIN } from "../../config/server";

const Login = () => {
    const { loginInfor } = useContext(ThemeContextApp);

    const navigate = useNavigate();

    const [infor, setInfor] = useState({
        account: '',
        password: ''
    });

    useEffect(() => {
        if (loginInfor!==null) {
            navigate('/');
        }
    }, [loginInfor, navigate])

    const handleInput = (e, type) => {
        const value = e.target.value;

        switch(type) {
            case 'account':
                setInfor({
                    ...infor,
                    account: value
                })
                break;
            case 'password':
                setInfor({
                    ...infor,
                    password: value
                })
                break;
            default:
        }
    }

    const handleLogin = () => {
        axios({
            method: 'POST',
            url: SERVER_ADDRESS_READ_TOLOGIN,
            withCredentials: true,
            data: {
                loginOptions: infor
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                console.log('success');
                window.location.reload();
            } else {
                console.log('failure');
            }
        }).catch(error => console.error(error))
    }

    return (
        <div className='Login'>
            <div>
                <div>
                    <div>Account</div>
                    <input value={infor.account} onChange={(e) => handleInput(e, 'account')} />
                </div>
                <div>
                    <div>Password</div>
                    <input value={infor.passWord} onChange={(e) => handleInput(e, 'password')} />
                </div>
                <div>
                    <strong>canh bao</strong>
                </div>
                <div>
                    <button onClick={() => handleLogin()}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
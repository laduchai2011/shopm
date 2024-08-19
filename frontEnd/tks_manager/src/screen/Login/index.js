import React, { useState } from "react";
import './styles.css';

const Login = () => {
    const [infor, setInfor] = useState({
        useName: '',
        passWord: ''
    });

    const handleInput = (e, type) => {
        const value = e.target.value;

        switch(type) {
            case 'userName':
                setInfor({
                    ...infor,
                    useName: value
                })
                break;
            case 'passWord':
                setInfor({
                    ...infor,
                    passWord: value
                })
                break;
            default:
          }
    }

    return (
        <div className='Login'>
            <div>
                <div>
                    <div>User Name</div>
                    <input value={infor.useName} onChange={(e) => handleInput(e, 'userName')} />
                </div>
                <div>
                    <div>Password</div>
                    <input value={infor.passWord} onChange={(e) => handleInput(e, 'passWord')} />
                </div>
                <div>
                    <strong>canh bao</strong>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
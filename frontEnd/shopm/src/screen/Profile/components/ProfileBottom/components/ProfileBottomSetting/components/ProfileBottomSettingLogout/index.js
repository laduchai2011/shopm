import React from "react";
import './styles.css';

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { SERVER_ADDRESS_LOGOUT } from "config/server";

const ProfileBottomSettingLogout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios({
            method: 'post',
            url: SERVER_ADDRESS_LOGOUT,
            withCredentials: true,
            data: {}, 
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            console.log('resData', resData)
            if (resData.success) {
                navigate('/');
            } else {
                alert(resData.message);
            }
        }).catch(error => {
            console.error(error)
        }).finally(() => {
            window.location.reload();
        })
    }

    return (
        <div className="ProfileBottomSettingLogout">
            <button onClick={() => handleLogout()} title="Log-Out">Log-Out</button>
        </div>
    )
}

export default ProfileBottomSettingLogout;
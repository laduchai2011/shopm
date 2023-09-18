import React, { memo, useContext } from "react";
import './styles.css';

import { ThemeContextApp } from "utilize/ContextApp";
import { ProfileContext } from "screen/Profile/utilize/ProfileContext";

import { getCookie } from "auth/cookie";
import { avatarNull } from "utilize/constant";


const ProfileTop = () => {
    const { profileOptions, setProfileOptions } = useContext(ProfileContext);
    const { loginInfor } = useContext(ThemeContextApp);

    return (
        <div className="ProfileTop">
            <div className="ProfileTop-avatar">
                <img src={loginInfor.avatar!==null ? loginInfor.avatar : avatarNull} alt=""/>
            </div>
            <div className="ProfileTop-name">
                <strong>Name Name Name</strong>
            </div>
            <div className="ProfileTop-options">
                <div className={ profileOptions==='history' ? 'active' : ''} onClick={() => { setProfileOptions('history'); sessionStorage.setItem("profileOption", "history") }}>History</div>
                <div className={ profileOptions==='caserecord' ? 'active' : ''} onClick={() => { setProfileOptions('caserecord'); sessionStorage.setItem("profileOption", "caserecord") }}>CaseRecord</div>
                <div className={ profileOptions==='provider' ? 'active' : ''} onClick={() => { setProfileOptions('provider'); sessionStorage.setItem("profileOption", "provider") }}>Provider</div>
                <div className={ profileOptions==='hospital' ? 'active' : ''} onClick={() => { setProfileOptions('hospital'); sessionStorage.setItem("profileOption", "hospital") }}>Hospital</div>
                <div className={ profileOptions==='follow' ? 'active' : ''} onClick={() => { setProfileOptions('follow'); sessionStorage.setItem("profileOption", "follow") }}>Follow</div>
                { getCookie('profileRole')==='my' && <div className={ profileOptions==='setting' ? 'active' : ''} onClick={() => { setProfileOptions('setting'); sessionStorage.setItem("profileOption", "setting") }}>Setting</div> }
            </div>
        </div>
    )
}

export default memo(ProfileTop);
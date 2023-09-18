import React, { useState, useContext } from "react";
import './styles.css';

import { useParams } from "react-router-dom";

import Header from "screen/Header";
import ProfileTop from "./components/ProfileTop";
import ProfileBottom from "./components/ProfileBottom";

import { ThemeContextApp } from "utilize/ContextApp";
import { ProfileContext } from "./utilize/ProfileContext";

import { setCookie } from "auth/cookie";

const Profile = () => {
    const { id: uuid_user } = useParams();
    const { loginInfor } = useContext(ThemeContextApp);

    if (loginInfor && (loginInfor.uuid === uuid_user)) {
        setCookie('profileRole', 'my', 1);
    } else {
        setCookie('profileRole', 'notMy', 1);
    }

    let storage_profileOption = sessionStorage.getItem("profileOption");
    if (!storage_profileOption) {
        storage_profileOption = 'history';
    }
    const [profileOptions, setProfileOptions] = useState(storage_profileOption);
    return (
        <div className="Profile">
            <Header />
            <ProfileContext.Provider value={{profileOptions, setProfileOptions}}>
                <div className="Profile-main">
                    <ProfileTop />
                    <ProfileBottom />
                </div>  
            </ProfileContext.Provider>
        </div>
    )
}

export default Profile;
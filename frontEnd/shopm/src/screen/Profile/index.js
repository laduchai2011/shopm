import React, { useState } from "react";
import './styles.css';

import Header from "screen/Header";
import ProfileTop from "./components/ProfileTop";
import ProfileBottom from "./components/ProfileBottom";

import { ProfileContext } from "./utilize/ProfileContext";

const Profile = () => {
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
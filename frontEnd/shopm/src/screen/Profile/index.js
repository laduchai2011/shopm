import React from "react";
import './styles.css';

import Header from "../Header";
import ProfileTop from "./components/ProfileTop";
import ProfileBottom from "./components/ProfileBottom";

const Profile = () => {
    
    return (
        <div className="Profile">
            <Header />
            <div className="Profile-main">
                <ProfileTop />
                <ProfileBottom />
            </div>
        </div>
    )
}

export default Profile;
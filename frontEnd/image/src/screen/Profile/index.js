import React from "react";
import './styles.css';

import Header from "screen/Header";

const Profile = () => {
    return (
        <div className="Profile">
            <Header index={3}/>
            <div className="Profile-main">
                <a href="shopm">Go to Shopm</a>
            </div>
        </div>
    )
}

export default Profile;
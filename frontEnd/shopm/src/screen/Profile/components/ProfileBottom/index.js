import React, { useContext } from "react";
import './styles.css';

import { ProfileContext } from "screen/Profile/utilize/ProfileContext";

import ProfileBottomHistory from "./components/ProfileBottomHistory";
import ProfileBottomCaseRecord from "./components/ProfileBottomCaseRecord";
import ProfileBottomSetting from "./components/ProfileBottomSetting";

const ProfileBottom = () => {
    const { profileOptions } = useContext(ProfileContext);
    return (
        <div className="ProfileBottom">
            { profileOptions==='history' && <ProfileBottomHistory /> }
            { profileOptions==='caserecord' && <ProfileBottomCaseRecord /> }
            { profileOptions==='setting' && <ProfileBottomSetting /> }
        </div>
    )
}

export default ProfileBottom;
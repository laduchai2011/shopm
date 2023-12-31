import React, { useContext, memo } from "react";
import './styles.css';

import ProfileBottomHistory from "./components/ProfileBottomHistory";
import ProfileBottomCaseRecord from "./components/ProfileBottomCaseRecord";
import ProfileBottomSetting from "./components/ProfileBottomSetting";

import { ProfileContext } from "screen/Profile/utilize/ProfileContext";

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

export default memo(ProfileBottom);
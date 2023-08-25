import React, { useContext, useState } from "react";
import './styles.css';

import ProfileBottomHistory from "./components/ProfileBottomHistory";
import ProfileBottomCaseRecord from "./components/ProfileBottomCaseRecord";
import ProfileBottomSetting from "./components/ProfileBottomSetting";

import { ProfileContext } from "screen/Profile/utilize/ProfileContext";
import { ProfileBottomContext } from "./utilize/ProfileBottomContext";

const ProfileBottom = () => {
    const { profileOptions } = useContext(ProfileContext);
    const [caseRecords, setCaseRecords] = useState([1,2,3,4,5,6]);

    return (
        <ProfileBottomContext.Provider value={{caseRecords, setCaseRecords}}>
            <div className="ProfileBottom">
                { profileOptions==='history' && <ProfileBottomHistory /> }
                { profileOptions==='caserecord' && <ProfileBottomCaseRecord /> }
                { profileOptions==='setting' && <ProfileBottomSetting /> }
            </div>
        </ProfileBottomContext.Provider>
    )
}

export default ProfileBottom;
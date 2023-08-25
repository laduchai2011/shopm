import React, { memo, useState } from "react";
import './styles.css';

import ProfileBottomSettingSickPerson from "./components/ProfileBottomSettingSickPerson";
import ProfileBottomSettingInformation from "./components/ProfileBottomSettingInformation";

const ProfileBottomSetting = () => {
    const [stOption, setStOption] = useState('sickperson');

    return (
        <div className="ProfileBottomSetting">
            <div className="ProfileBottomSetting-header">
                <div className={stOption==='sickperson' ? 'active' : ''} onClick={() => setStOption('sickperson')}>Sick Person</div>
                <div className={stOption==='information' ? 'active' : ''} onClick={() => setStOption('information')}>Information</div>
            </div>
            { stOption==='sickperson' && <ProfileBottomSettingSickPerson /> }
            { stOption==='information' && <ProfileBottomSettingInformation /> }
        </div>
    )
}

export default memo(ProfileBottomSetting);
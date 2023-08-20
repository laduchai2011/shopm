import React, { memo, useContext } from "react";
import './styles.css';

import { ProfileContext } from "screen/Profile/utilize/ProfileContext";

const ProfileTop = () => {
    const { profileOptions, setProfileOptions } = useContext(ProfileContext);
    return (
        <div className="ProfileTop">
            <div className="ProfileTop-avatar">
                <img src="https://tse1.mm.bing.net/th?id=OIP.PX3wV_L-q92uHvLir0f1owHaEK&pid=Api&rs=1&c=1&qlt=95&w=171&h=96" alt=""/>
            </div>
            <div className="ProfileTop-name">
                <strong>Name Name Name</strong>
            </div>
            <div className="ProfileTop-options">
                <div className={ profileOptions==='history' ? 'active' : ''} onClick={() => setProfileOptions('history')}>History</div>
                <div className={ profileOptions==='caserecord' ? 'active' : ''} onClick={() => setProfileOptions('caserecord')}>CaseRecord</div>
                <div className={ profileOptions==='provider' ? 'active' : ''} onClick={() => setProfileOptions('provider')}>Provider</div>
                <div className={ profileOptions==='hospital' ? 'active' : ''} onClick={() => setProfileOptions('hospital')}>Hospital</div>
                <div className={ profileOptions==='follow' ? 'active' : ''} onClick={() => setProfileOptions('follow')}>Follow</div>
            </div>
        </div>
    )
}

export default memo(ProfileTop);
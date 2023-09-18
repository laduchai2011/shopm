import React from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { getCookie } from "auth/cookie";


const ProfileBottomCaseRecordHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="ProfileBottomCaseRecordHeader">
            { getCookie('profileRole')==='my' && <button onClick={() => navigate('/caseRecord/create')}>Create case-record</button> }
        </div>
    )
}

export default ProfileBottomCaseRecordHeader;
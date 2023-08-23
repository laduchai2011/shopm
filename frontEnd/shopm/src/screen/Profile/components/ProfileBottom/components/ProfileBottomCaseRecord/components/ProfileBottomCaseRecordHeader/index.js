import React from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

const ProfileBottomCaseRecordHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="ProfileBottomCaseRecordHeader">
            <button onClick={() => navigate('/caseRecord/create')}>Create case-record</button>
        </div>
    )
}

export default ProfileBottomCaseRecordHeader;
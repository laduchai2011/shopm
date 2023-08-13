import React, { memo } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

const ProfileBottomHistory = () => {
    const navigate = useNavigate();

    const list_medication = [0,1,2,3,4,5].map((data, index) => {
        return (
            <div key={index} className="ProfileBottomHistory-medicate">
                <div>Title</div>
                <div>Note Note Note Note Note Note Note Note Note</div>
                <div>
                    <button onClick={() => navigate('/medication/order/aff3243sdf')}>Detail</button>
                </div>
            </div>
        )
    })

    return (
        <div className="ProfileBottomHistory">
            <div className="ProfileBottomHistory-header">
                <div className="active">Medication</div>
                <div>Examine</div>
            </div>
            <div className="ProfileBottomHistory-medicateList">
                { list_medication }
            </div>
        </div>
    )
}

export default memo(ProfileBottomHistory);
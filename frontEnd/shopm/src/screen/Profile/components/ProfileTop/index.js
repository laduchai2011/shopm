import React from "react";
import './styles.css';

const ProfileTop = () => {
    return (
        <div className="ProfileTop">
            <div className="ProfileTop-avatar">
                <img src="https://tse1.mm.bing.net/th?id=OIP.PX3wV_L-q92uHvLir0f1owHaEK&pid=Api&rs=1&c=1&qlt=95&w=171&h=96" alt=""/>
            </div>
            <div className="ProfileTop-name">
                <strong>Name Name Name</strong>
            </div>
            <div className="ProfileTop-options">
                <div className="active">History</div>
                <div>Provider</div>
                <div>Hospital</div>
                <div>Follow</div>
            </div>
        </div>
    )
}

export default ProfileTop;
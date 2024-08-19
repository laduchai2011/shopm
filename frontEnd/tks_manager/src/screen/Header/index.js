import React from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='Header'>
            <div>Home</div>
            <div>Manage chest</div>
            <div onClick={() => navigate('/login')}>Login</div>
            <div>Logout</div>
        </div>
    )
}

export default Header;
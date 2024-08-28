import React, { useContext } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { ThemeContextApp } from "utilize/ContextApp";

const Header = () => {
    const { loginInfor } = useContext(ThemeContextApp);
    const navigate = useNavigate();

    return (
        <div className='Header'>
            <div>Home</div>
            <div onClick={() => navigate('/chestManager')}>Manage chest</div>
            { loginInfor===null && <div onClick={() => navigate('/login')}>Login</div>}
            <div>Logout</div>
        </div>
    )
}

export default Header;
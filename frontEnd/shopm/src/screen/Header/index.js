import React, { memo } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';

import Overlay from 'screen/Overlay';

const Header = () => {
    const navigate = useNavigate();

    const handleMenu = () => {
        const overlay = document.querySelector(".Overlay");
        const overlay_menu = document.querySelector(".OverlayMenu");
        overlay_menu.classList.add('show');
        overlay.classList.add('show');
    }


    return (
        <div className='Header'>
            <div className="Header-menu-logo">
                <AiOutlineMenu onClick={() => handleMenu()} />
                <h4 onClick={() => navigate('/')}>SHOPM</h4>
            </div>
            <div className="Header-icon">
                <div>
                    <IoMdNotificationsOutline size={30} />
                    <p>5</p>
                </div>
                <img src="https://1.bp.blogspot.com/-a71p9zvla98/UkP4-cPfK4I/AAAAAAAAAg8/va9AmdChErg/s1600/anh-dep-hinh-nen-thien-nhien-0.jpg" onClick={() => navigate('/profile/23423sdgfsdgds')} alt=""/>
            </div>
            <Overlay />
        </div>
    )
}

export default memo(Header);
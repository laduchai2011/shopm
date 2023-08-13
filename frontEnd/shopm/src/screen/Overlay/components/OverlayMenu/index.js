import React from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { AiOutlineMenu, AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { TbBrandProducthunt } from 'react-icons/tb';
import { BsHospital } from 'react-icons/bs';
import { GiAbstract013 } from 'react-icons/gi';

const OverlayMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="OverlayMenu">
            <div className='OverlayMenu-top'>
                <div className="Header-menu-logo">
                    <AiOutlineMenu />
                    <h4 onClick={() => navigate('/')}>SHOPM</h4>
                </div>
            </div>
            <div className='OverlayMenu-bottom'>
                <div title="Home">
                    <AiOutlineHome size={25} />
                    <span>Home</span>
                </div>
                <div onClick={() => navigate(`/provider/list`)} title="Provider">
                    <TbBrandProducthunt size={25} />
                    <span>Provider</span>
                </div>
                <div title="Hospital">
                    <BsHospital size={25} />
                    <span>Hospital</span>
                </div>
                <div title="Setting">
                    <AiOutlineSetting size={25} />
                    <span>Setting</span>
                </div>
                <div onClick={() => navigate(`/extend`)} title="Extend">
                    <GiAbstract013 size={25} />
                    <span>Extend</span>
                </div>
            </div>
        </div>
    )
}

export default OverlayMenu;
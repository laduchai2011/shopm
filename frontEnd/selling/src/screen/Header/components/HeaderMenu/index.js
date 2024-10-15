import React, { memo, useEffect } from 'react';
import './styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { AiOutlineMenu } from 'react-icons/ai';
import { GrInstall } from "react-icons/gr";
import { GiChest } from "react-icons/gi";

import { setMenuStatus } from 'reduxStore/slice/headerSlice';

import { $ } from 'utilize/Tricks';

const HeaderMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuStatus = useSelector(state => state.headerSlice.menuStatus);

    useEffect(() => {
        const q_HeaderMenu = $('.HeaderMenu');
        if (menuStatus==='on') {
            q_HeaderMenu.classList.add('show');
        }
        if (menuStatus==='off') {
            q_HeaderMenu.classList.remove('show');
        }
    }, [menuStatus])


    return (
        <div className='HeaderMenu'>
            <div className='HeaderMenu-top'>
                <AiOutlineMenu onClick={() => dispatch(setMenuStatus({menuStatus: 'off', overlayStatus: false}))} />
                <p>SellingSHOPM</p>
            </div>
            <div className='HeaderMenu-body'>
                <div className='HeaderMenu-option' onClick={() => navigate('/department')} title='Department'>
                    <GrInstall size={ 30 } />
                    <span>Department</span>
                </div>
            </div>
            <div className='HeaderMenu-body'>
                <div className='HeaderMenu-option' onClick={() => navigate('/chest')} title='Chest'>
                    <GiChest size={ 30 } />
                    <span>Chest</span>
                </div>
            </div>
        </div>
    )
}

export default memo(HeaderMenu);
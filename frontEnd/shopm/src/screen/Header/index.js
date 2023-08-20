import React, { memo, useEffect, useContext } from 'react';
import './styles.css';

import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsCartPlus, BsFillCartPlusFill } from 'react-icons/bs';

import Overlay from 'screen/Overlay';

import { ThemeContextApp } from "utilize/ContextApp";
import { $$ } from 'utilize/Tricks';

const Header = () => {
    const count = useSelector((state) => state.counter.value1);
    const navigate = useNavigate();

    const clickDocument = useContext(ThemeContextApp);

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    const handleMenu = () => {
        const overlay = document.querySelector(".Overlay");
        const overlay_menu = document.querySelector(".OverlayMenu");
        overlay_menu.classList.add('show');
        overlay.classList.add('show');
    }

    const handleShowCartCaseRecord = (e) => {
        e.stopPropagation();
        const q_contentBox0 = $$('.Header-contentBox')[0];
        q_contentBox0.classList.add('show');
        clickDocument.pushElement(q_contentBox0);
    }

    const showDetailMedication = (e) => {
        e.stopPropagation();
    }

    const list_contentBox = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
    ].map((data, index) => {
        return (
            <div className='Header-contentBox-content-row' key={index}>
                <div>name name namename</div>
                <div>{ data }</div>
                <div><button onClick={(e) => showDetailMedication(e)}>Detail</button></div>
            </div>
        )
            
    })

    return (
        <div className='Header'>
            <div className="Header-menu-logo">
                <AiOutlineMenu onClick={() => handleMenu()} />
                <h4 onClick={() => navigate('/')}>SHOPM</h4>
            </div>
            <div className="Header-iconContainer">
                <div className='Header-iconBox' onClick={(e) => handleShowCartCaseRecord(e)}>
                    <BsFillCartPlusFill size={30} />
                    <p>5</p>
                    <div className='Header-contentBox'>
                        <div className='Header-contentBox-header'>You are adding case-record that page number is 1</div>
                        <div className='Header-contentBox-content'>
                            { list_contentBox }
                        </div>
                    </div>
                </div>
                <div className='Header-iconBox'>
                    <BsCartPlus size={30} />
                    <p>5</p>
                </div>
                <div className='Header-iconBox'>
                    <IoMdNotificationsOutline size={30} />
                    <p>5</p>
                </div>
                <img src="https://1.bp.blogspot.com/-a71p9zvla98/UkP4-cPfK4I/AAAAAAAAAg8/va9AmdChErg/s1600/anh-dep-hinh-nen-thien-nhien-0.jpg" onClick={() => navigate('/profile/23423sdgfsdgds')} alt=""/>
                <div>{count}</div>
            </div>
            <Overlay />
        </div>
    )
}

export default memo(Header);
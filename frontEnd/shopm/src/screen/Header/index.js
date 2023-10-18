import React, { memo, useEffect, useContext } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsCartPlus, BsFillCartPlusFill } from 'react-icons/bs';

import Overlay from 'screen/Overlay';

import { ThemeContextApp } from "utilize/ContextApp";
import { $$ } from 'utilize/Tricks';
import { avatarNull } from 'utilize/constant';

import { useGetNotificationCountQuery } from 'reduxStore/RTKQuery/notificationRTKQuery';


const Header = () => {
    const navigate = useNavigate();

    const { clickDocument, loginInfor } = useContext(ThemeContextApp);

    const skipNotification = loginInfor!==null;
    const { 
        data: notification_data,
        isError: notification_error
    } = useGetNotificationCountQuery({type: 'type1', status: 'receved'}, {skip: !skipNotification});


    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    useEffect(() => {
        console.log('notification_data', notification_data, loginInfor!==null)

        // eslint-disable-next-line
    }, [notification_data])

    useEffect(() => {
        notification_error && alert(`Header: ${notification_error}`);
    }, [notification_error])

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
                { loginInfor!==null && <div className='Header-iconBox' onClick={(e) => handleShowCartCaseRecord(e)}>
                    <BsFillCartPlusFill size={30} />
                    <p>5</p>
                    <div className='Header-contentBox'>
                        <div className='Header-contentBox-header'>You are adding case-record that page number is 1</div>
                        <div className='Header-contentBox-content'>
                            { list_contentBox }
                        </div>
                    </div>
                </div> }
                { loginInfor!==null && <div className='Header-iconBox'>
                    <BsCartPlus size={30} />
                    <p>5</p>
                </div> }
                { loginInfor!==null && <div className='Header-iconBox'>
                    <IoMdNotificationsOutline size={30} />
                    { notification_data?.count > 0 && <p>{ notification_data?.count }</p> }
                </div> }
                { loginInfor!==null ? <img 
                    src={loginInfor?.avatar!==null ? loginInfor?.avatar : avatarNull} 
                    onClick={() => navigate(`/profile/${loginInfor?.uuid}`)} alt=""
                /> : <img 
                    src={ avatarNull } 
                    onClick={() => navigate(`/login`)} alt=""
                />}
            </div>
            <Overlay />
        </div>
    )
}

export default memo(Header);
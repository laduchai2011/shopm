import React, { memo, useEffect, useContext, useState, useRef } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsCartPlus, BsFillCartPlusFill } from 'react-icons/bs';

import Overlay from 'screen/Overlay';

import { ThemeContextApp } from "utilize/ContextApp";
import { $, $$ } from 'utilize/Tricks';
import { avatarNull } from 'utilize/constant';

import { 
    useGetNotificationCountQuery, 
    useLazyGetNotificationListQuery, 
    usePatchNotificationStatusMutation 
} from 'reduxStore/RTKQuery/notificationRTKQuery';
import { 
    useGetCurrentCartQuery,
    useDeleteCurrentCartMutation
} from 'reduxStore/RTKQuery/currentCartRTKQuery';

import HeaderNotification from './components/HeaderNotification';

/**
*@typedef {
*uuid_caseRecord: string,
*pageNumber: string,
*} currentCartOptions
*/ 

const Header = () => {
    const navigate = useNavigate();

    const { clickDocument, loginInfor } = useContext(ThemeContextApp);

    const [notifyList, setNotifyList] = useState([
        { status: 'all', dataArray: [], pageIndex: 0},
        { status: 'receved', dataArray: [], pageIndex: 0},
        { status: 'seen', dataArray: [], pageIndex: 0},
        { status: 'read', dataArray: [], pageIndex: 0}
    ]);
    const notifyIndex = useRef(0);

    const skipNotification = loginInfor!==null;
    const { 
        data: notificationCount_data,
        isError: notificationCount_isError,
        error: notificationCount_error
    } = useGetNotificationCountQuery({type: 'normal', status: 'receved'}, {skip: !skipNotification});

    const [getNotificationList, resultNotificationList] = useLazyGetNotificationListQuery();
    const [patchNotificationStatus] = usePatchNotificationStatusMutation();
    const [deleteCurrentCart] = useDeleteCurrentCartMutation();

    const { 
        // data: notification_live_data,
        isError: notification_live_isError,
        error: notification_live_error
    } = useGetNotificationCountQuery({type: 'type2', status: 'receved'}, {skip: !skipNotification});

    const { 
        data: data_currentCart,
        isError: isError_currentCart,
        error: error_currentCart
    } = useGetCurrentCartQuery();

    useEffect(() => {
        // console.log('data_currentCart', data_currentCart);     
    }, [data_currentCart])

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    useEffect(() => {
        const notifyOptions = $('.Header-contentBox-options').children;
        notifyOptions[notifyIndex.current].classList.add('active');
        notifyOptions.forEach(notifyOption => {
            notifyOption.onclick = function(e) {
                e.stopPropagation();
                let index_m = notifyIndex.current;
                for (let i = 0; i < notifyOptions.length; i++) {
                    if (notifyOptions[i] !== notifyOption) {
                        notifyOptions[i].classList.remove('active');
                    } else {
                        index_m = i;
                    }
                }
                notifyOptions[index_m].classList.add('active');
                notifyIndex.current = index_m;
                getNotificationList({
                    type: 'normal',
                    status: getStatus(index_m),
                    pageIndex: 1,
                    pageSize: 10
                }, true)
            }
        })

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // console.log('notification_data', notification_data, loginInfor!==null)

        // eslint-disable-next-line
    }, [notificationCount_data])

    useEffect(() => {
        const cp_notifyList = [...notifyList];
        const currentNotify = notifyList[notifyIndex.current];

        const dataArray = [...currentNotify.dataArray];

        if (resultNotificationList.isSuccess && currentNotify.pageIndex < 1) {
            if (resultNotificationList.isFetching) {
                dataArray.push(null);
                currentNotify.dataArray = dataArray;
                cp_notifyList[notifyIndex.current] = currentNotify;
                setNotifyList(cp_notifyList);
            }
    
            if (!resultNotificationList.isFetching) {
                dataArray.pop();
                const currentNotify_newData = dataArray.concat(resultNotificationList.data.notifications.rows);
                currentNotify.dataArray = currentNotify_newData;
                currentNotify.pageIndex = 1;
                cp_notifyList[notifyIndex.current] = currentNotify;
                setNotifyList(cp_notifyList);
            }
        }
        
        // eslint-disable-next-line
    }, [resultNotificationList])

    useEffect(() => {
        notificationCount_isError && console.log('Header', notificationCount_error);
        notification_live_isError && console.log('Header', notification_live_error);
        resultNotificationList?.isError && console.log('Header', resultNotificationList?.error);
    
        isError_currentCart && console.log('Header', error_currentCart);
    }, [notificationCount_isError, 
        notification_live_isError, 
        resultNotificationList?.isError,
        notificationCount_error,
        notification_live_error,
        resultNotificationList?.error,

        isError_currentCart,
        error_currentCart
    ])

    const getStatus = (index) => {
        switch (index) {
            case 0:
                return 'all';
            case 1:
                return 'receved';
            case 2:
                return 'seen';
            case 3:
                return 'read';
            default:
                console.log(`invalid param !`);
        }
    }

    const handleMenu = () => {
        const overlay = document.querySelector(".Overlay");
        const overlay_menu = document.querySelector(".OverlayMenu");
        overlay_menu.classList.add('show');
        overlay.classList.add('show');
    }

    const handleShowCartCaseRecord = (e) => {
        e.stopPropagation();
        const q_contentBox0 = $$('.Header-contentBox')[0];
        q_contentBox0.classList.toggle('show');
        clickDocument.pushElement(q_contentBox0);
    }

    const handleShowNotifications = (e) => {
        e.stopPropagation();
        const q_contentBox0 = $$('.Header-contentBox')[1];
        q_contentBox0.classList.toggle('show');
        clickDocument.pushElement(q_contentBox0);

        getNotificationList({
            type: 'normal',
            status: 'all',
            pageIndex: 1,
            pageSize: 10
        }, true)
        patchNotificationStatus({type: 'normal', newStatus: 'seen', currentStatus: 'receved'});
    }

    const handleDeleteCurrentCart = (e) => {
        e.stopPropagation();
        deleteCurrentCart();
    }

    // const showDetailMedication = (e) => {
    //     e.stopPropagation();
    // }

    // const list_contentBox = [
    //     1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
    // ].map((data, index) => {
    //     return (
    //         <div className='Header-contentBox-content-row' key={index}>
    //             <div>name name namename</div>
    //             <div>{ data }</div>
    //             <div><button onClick={(e) => showDetailMedication(e)}>Detail</button></div>
    //         </div>
    //     ) 
    // })

    const list_notification = notifyList[notifyIndex.current].dataArray.map((data, index) => {
        return (
            <HeaderNotification key={ index } data={ data } index={ index } />
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
                    { data_currentCart?.success && <BsFillCartPlusFill size={30} /> }
                    {/* { notification_live_data?.count > 0 && <p>{ notification_live_data?.count }</p> } */}
                    { data_currentCart?.success && <div className='Header-contentBox showCartCaseRecord'>
                        <div className='Header-contentBox-header'>{ `You are adding case-record that page number is ${data_currentCart?.currentCart?.pageNumber}` }</div>
                        <div className='Header-contentBox-content'>
                            {/* { list_contentBox } */}
                            <div>Ban co 1 cart <button onClick={(e) => handleDeleteCurrentCart(e)}>Cancel</button> </div>
                        </div>
                    </div> }
                </div> }
                { loginInfor!==null && <div className='Header-iconBox'>
                    <BsCartPlus size={30} />
                    <p>5</p>
                </div> }
                { loginInfor!==null && <div className='Header-iconBox' onClick={(e) => handleShowNotifications(e)}>
                    <IoMdNotificationsOutline size={30} />
                    { notificationCount_data?.count > 0 && <p>{ notificationCount_data?.count }</p> }
                    <div className='Header-contentBox showNotification' onClick={(e) => e.stopPropagation()}>
                        <div className='Header-contentBox-options'>
                            <span>ALL</span>
                            <span>RECEVED</span>
                            <span>SEEN</span>
                            <span>READ</span>
                        </div>
                        <div className='Header-contentBox-content'>
                            { list_notification }
                        </div>
                    </div>
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
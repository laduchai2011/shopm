import React, { memo, useEffect, useContext, useState, useRef } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsCartPlus, BsFillCartPlusFill } from 'react-icons/bs';

import Overlay from 'screen/Overlay';

import { ThemeContextApp } from "utilize/ContextApp";
import { $$ } from 'utilize/Tricks';
import { avatarNull } from 'utilize/constant';

import { 
    useGetNotificationCountQuery, 
    useLazyGetNotificationListQuery, 
    usePatchNotificationStatusMutation 
} from 'reduxStore/RTKQuery/notificationRTKQuery';
import { 
    // useGetCurrentCartQuery,
    useDeleteCurrentCartMutation
} from 'reduxStore/RTKQuery/currentCartRTKQuery';
import { useGet_OrderGroup_In_CurrentSelectedQuery } from 'reduxStore/RTKQuery/orderMedicationRTKQuery';

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

    const [notifyListNormal, setNotifyListNormal] = useState([
        { status: 'all', dataArray: [], pageIndex: 0},
        { status: 'receved', dataArray: [], pageIndex: 0},
        { status: 'seen', dataArray: [], pageIndex: 0},
        { status: 'read', dataArray: [], pageIndex: 0}
    ]);
    const [notifyListNow, setNotifyListNow] = useState([
        { status: 'all', dataArray: [], pageIndex: 0},
        { status: 'receved', dataArray: [], pageIndex: 0},
        { status: 'seen', dataArray: [], pageIndex: 0},
        { status: 'read', dataArray: [], pageIndex: 0}
    ]);

    const notifyIndexNormal = useRef(0);
    const notifyIndexNow = useRef(0);
    const notifiType = useRef();

    const skipNotification = loginInfor!==null;

    const {
        data: data_notifyNormalCount, 
        // isFetching: isFetching_notifyNormalCount, 
        isError: isError_notifyNormalCount,
        error: error_notifyNormalCount
    } = useGetNotificationCountQuery({type: 'normal', status: 'receved'}, {skip: !skipNotification});

    const {
        data: data_notifyNowCount, 
        // isFetching: isFetching_notifyNowCount, 
        isError: isError_notifyNowCount,
        error: error_notifyNowCount
    } = useGetNotificationCountQuery({type: 'now', status: 'receved'}, {skip: !skipNotification});

    const [getNotificationList, resultNotificationList] = useLazyGetNotificationListQuery();
    const [patchNotificationStatus] = usePatchNotificationStatusMutation();
    const [deleteCurrentCart] = useDeleteCurrentCartMutation();

    // const { 
    //     data: data_currentCart,
    //     isError: isError_currentCart,
    //     error: error_currentCart
    // } = useGetCurrentCartQuery();
    // useEffect(() => {
    //     isError_currentCart && console.log('Header Component Screen: ', error_currentCart);    
    // }, [isError_currentCart, error_currentCart])
    // useEffect(() => {
    //     console.log('data_currentCart', data_currentCart);     
    // }, [data_currentCart])
    const { 
        data: data_OrderGroup_In_CurrentSelected,
        isError: isError_OrderGroup_In_CurrentSelected,
        error: error_OrderGroup_In_CurrentSelected
    } = useGet_OrderGroup_In_CurrentSelectedQuery();
    useEffect(() => {
        isError_OrderGroup_In_CurrentSelected && console.error('Header Component Screen: ', error_OrderGroup_In_CurrentSelected);    
    }, [isError_OrderGroup_In_CurrentSelected, error_OrderGroup_In_CurrentSelected])
    useEffect(() => {
        console.log('data_OrderGroup_In_CurrentSelected', data_OrderGroup_In_CurrentSelected);     
    }, [data_OrderGroup_In_CurrentSelected])

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    useEffect(() => {
        isError_notifyNormalCount && console.log('Header Component Screen: ', error_notifyNormalCount);
    }, [isError_notifyNormalCount, error_notifyNormalCount])
    useEffect(() => {
        // const resData = data_notifyNormalCount;
    }, [data_notifyNormalCount])

    useEffect(() => {
        isError_notifyNowCount && console.log(error_notifyNowCount);
    }, [isError_notifyNowCount, error_notifyNowCount])
    useEffect(() => {
        // const resData = data_notifyNowCount;
    }, [data_notifyNowCount])

    useEffect(() => {
        if (loginInfor!==null) {
            const notifyOptions_normal = $$('.Header-contentBox-options')[1].children;
            notifyOptions_normal[notifyIndexNormal.current].classList.add('active');
            notifyOptions_normal.forEach(notifyOption => {
                notifyOption.onclick = function(e) {
                    e.stopPropagation();
                    let index_m = notifyIndexNormal.current;
                    for (let i = 0; i < notifyOptions_normal.length; i++) {
                        if (notifyOptions_normal[i] !== notifyOption) {
                            notifyOptions_normal[i].classList.remove('active');
                        } else {
                            index_m = i;
                        }
                    }
                    notifyOptions_normal[index_m].classList.add('active');
                    notifyIndexNormal.current = index_m;
                    getNotificationList({
                        type: 'normal',
                        status: getStatus(index_m),
                        pageIndex: 1,
                        pageSize: 10
                    }, true)
                }
            })

            const notifyOptions_now = $$('.Header-contentBox-options')[0].children;
            notifyOptions_now[notifyIndexNow.current].classList.add('active');
            notifyOptions_now.forEach(notifyOption => {
                notifyOption.onclick = function(e) {
                    e.stopPropagation();
                    let index_m = notifyIndexNow.current;
                    for (let i = 0; i < notifyOptions_now.length; i++) {
                        if (notifyOptions_now[i] !== notifyOption) {
                            notifyOptions_now[i].classList.remove('active');
                        } else {
                            index_m = i;
                        }
                    }
                    notifyOptions_now[index_m].classList.add('active');
                    notifyIndexNow.current = index_m;
                    getNotificationList({
                        type: 'now',
                        status: getStatus(index_m),
                        pageIndex: 1,
                        pageSize: 10
                    }, true)
                }
            })
        }
        
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        switch (notifiType.current) {
            case 'normal':
                const cp_notifyList_normal = [...notifyListNormal];
                const currentNotify_normal = {...notifyListNormal[notifyIndexNormal.current]};

                const dataArray_normal = [...currentNotify_normal.dataArray];

                if (resultNotificationList.isSuccess && currentNotify_normal.pageIndex < 1) {
                    if (resultNotificationList.isFetching) {
                        dataArray_normal.push(null);
                        currentNotify_normal.dataArray = dataArray_normal;
                        cp_notifyList_normal[notifyIndexNormal.current] = currentNotify_normal;
                        setNotifyListNormal(cp_notifyList_normal);
                    }
            
                    if (!resultNotificationList.isFetching) {
                        dataArray_normal.pop();
                        const currentNotify_normal_newData = dataArray_normal.concat(resultNotificationList.data.notifications.rows);
                        currentNotify_normal.dataArray = currentNotify_normal_newData;
                        currentNotify_normal.pageIndex = 1;
                        cp_notifyList_normal[notifyIndexNormal.current] = currentNotify_normal;
                        setNotifyListNormal(cp_notifyList_normal);
                    }
                }
                break;
            case 'now':
                const cp_notifyList_now = [...notifyListNow];
                const currentNotify_now = {...notifyListNow[notifyIndexNow.current]};

                const dataArray_now = [...currentNotify_now.dataArray];

                if (resultNotificationList.isSuccess && currentNotify_now.pageIndex < 1) {
                    if (resultNotificationList.isFetching) {
                        dataArray_now.push(null);
                        currentNotify_now.dataArray = dataArray_now;
                        cp_notifyList_now[notifyIndexNow.current] = currentNotify_now;
                        setNotifyListNow(cp_notifyList_now);
                    }
            
                    if (!resultNotificationList.isFetching) {
                        dataArray_now.pop();
                        const currentNotify_now_newData = dataArray_now.concat(resultNotificationList.data.notifications.rows);
                        currentNotify_now.dataArray = currentNotify_now_newData;
                        currentNotify_now.pageIndex = 1;
                        cp_notifyList_now[notifyIndexNow.current] = currentNotify_now;
                        setNotifyListNow(cp_notifyList_now);
                    }
                }
                break;
            default:
                console.log(`invalid param !`);
        }
        
        // eslint-disable-next-line
    }, [resultNotificationList])

    useEffect(() => {
        resultNotificationList?.isError && console.log('Header Component Screen: ', resultNotificationList?.error);
    }, [resultNotificationList?.isError,
        resultNotificationList?.error
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

    const handleShowNotifications = (e, type) => {
        e.stopPropagation();
        notifiType.current = type;
        switch(type) {
            case 'normal':
                const q_contentBox0_normal = $$('.Header-contentBox')[2];
                q_contentBox0_normal.classList.toggle('show');
                clickDocument.pushElement(q_contentBox0_normal);

                getNotificationList({
                    type: 'normal',
                    status: 'all',
                    pageIndex: 1,
                    pageSize: 10
                }, true)
                patchNotificationStatus({type: 'normal', newStatus: 'seen', currentStatus: 'receved'});
                break;
            case 'now':
                const q_contentBox0_now = $$('.Header-contentBox')[1];
                q_contentBox0_now.classList.toggle('show');
                clickDocument.pushElement(q_contentBox0_now);

                getNotificationList({
                    type: 'now',
                    status: 'all',
                    pageIndex: 1,
                    pageSize: 10
                }, true)
                patchNotificationStatus({type: 'now', newStatus: 'seen', currentStatus: 'receved'});
                break;
            default:
                console.log('Param invalid !');
        }
        
    }

    const handleDeleteCurrentCart = (e) => {
        e.stopPropagation();
        deleteCurrentCart();
    }

    const list_notification_normal = notifyListNormal[notifyIndexNormal.current].dataArray.map((data, index) => {
        return (
            <HeaderNotification key={ index } data={ data } index={ index } />
        )
    })

    const list_notification_now = notifyListNow[notifyIndexNow.current].dataArray.map((data, index) => {
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
                    { data_OrderGroup_In_CurrentSelected?.success && <BsFillCartPlusFill size={30} /> }
                    {/* { notification_live_data?.count > 0 && <p>{ notification_live_data?.count }</p> } */}
                    { data_OrderGroup_In_CurrentSelected?.success ? <div className='Header-contentBox showCartCaseRecord'>
                        <div className='Header-contentBox-header'>{ `You are adding case-record that page number is ${data_OrderGroup_In_CurrentSelected?.currentCart?.pageNumber}` }</div>
                        <div className='Header-contentBox-content'>
                            {/* { list_contentBox } */}
                            <div>Ban co 1 cart <button onClick={(e) => handleDeleteCurrentCart(e)}>Cancel</button> </div>
                        </div>
                    </div> : <div className='Header-contentBox'></div> }
                </div> }
                { loginInfor!==null && <div className='Header-iconBox' onClick={(e) => handleShowNotifications(e, 'now')}>
                    <IoMdNotificationsOutline size={30} />
                    { data_notifyNowCount?.count > 0 && <p>{ data_notifyNowCount?.count }</p> }
                    <div className='Header-contentBox showNotification' onClick={(e) => e.stopPropagation()}>
                        <div className='Header-contentBox-options'>
                            <span>ALL</span>
                            <span>RECEVED</span>
                            <span>SEEN</span>
                            <span>READ</span>
                        </div>
                        <div className='Header-contentBox-content'>
                            { list_notification_now }
                        </div>
                    </div>
                </div> }
                { loginInfor!==null && <div className='Header-iconBox'>
                    <BsCartPlus size={30} />
                    <p>5</p>
                </div> }
                { loginInfor!==null && <div className='Header-iconBox' onClick={(e) => handleShowNotifications(e, 'normal')}>
                    <IoMdNotificationsOutline size={30} />
                    { data_notifyNormalCount?.count > 0 && <p>{ data_notifyNormalCount?.count }</p> }
                    <div className='Header-contentBox showNotification' onClick={(e) => e.stopPropagation()}>
                        <div className='Header-contentBox-options'>
                            <span>ALL</span>
                            <span>RECEVED</span>
                            <span>SEEN</span>
                            <span>READ</span>
                        </div>
                        <div className='Header-contentBox-content'>
                            { list_notification_normal }
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
import React, { memo, useState, useEffect } from 'react';
import './styles.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLazyGetUserWithPk_notificationQuery } from 'reduxStore/RTKQuery/userRTKQuery';
import { setCurrentNotify } from 'reduxStore/slice/notificationsSlice';

import { avatarNull } from 'utilize/constant';
import { $$ } from 'utilize/Tricks';

/**
*@typedef {
*type: string,
*notification: text,
*status: string,  // sent - receved - seen - read - deleted / 1 - 2 - 3 - 4 - 5
*uuid_user: uuid
*} notificationOptions
*/  
    
/**
*@typedef {
*title: string, 
*type: string,
*uuid_userSent: string,
*} notification
*/
    

const NotifySmall = ({ data, index }) => {
    console.log('NotifySmall', index)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [notification, setNotification] = useState();
    const [getUser, resultUser] = useLazyGetUserWithPk_notificationQuery();

    useEffect(() => {
        if (data!==null) {
            $$('.NotifySmall')[index].classList.remove('NotifySmall-loading');
            const m_notification = JSON.parse(data.notification);
            setNotification(m_notification);
            getUser({uuid_user: m_notification.uuid_userSent});
        }
    }, [data, index, getUser])

    useEffect(() => {
        resultUser?.isError && console.log('Notifications', resultUser?.error);
    }, [resultUser?.isError,
        resultUser?.error
    ])

    const handleToProfile = (e) => {
        e.stopPropagation();
        navigate('/profile/gfsdgsd');
    }

    const handleViewNotify = () => {
        dispatch(setCurrentNotify({notification, resultUser}));
    }

    return (
        resultUser.isSuccess && !resultUser.isFetching ? 
        <div className='NotifySmall NotifySmall-loading' onClick={() => handleViewNotify()}>
            <div>
                <img src={ resultUser?.data?.user.avatar !== null ? resultUser?.data.user.avatar : avatarNull } onClick={(e) => handleToProfile(e)} alt='' />
            </div>
            <div>
                <div><strong>{ `${resultUser?.data.user.firstName} ${resultUser?.data.user.lastName}` }</strong> { `${notification?.title}` }</div>
                <div>{ data.createdAt }</div>
            </div>
        </div>:<div className='NotifySmall NotifySmall-loading'></div>
    )
}

export default memo(NotifySmall);
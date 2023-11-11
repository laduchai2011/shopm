import React, { useEffect, memo, useState } from 'react';
import './styles.css';

import { useNavigate } from 'react-router-dom';

import { useLazyGetUserWithPk_notificationQuery } from 'reduxStore/RTKQuery/userRTKQuery';

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


const HeaderNotification = ({ data, index }) => {

    const navigate = useNavigate();

    const [notification, setNotification] = useState();

    const [getUser, resultUser] = useLazyGetUserWithPk_notificationQuery();

    useEffect(() => {
        if (data!==null) {
            $$('.HeaderNotification')[index].classList.remove('HeaderNotification-loading');
            const m_notification = JSON.parse(data.notification);
            setNotification(m_notification);
            getUser({uuid_user: m_notification.uuid_userSent});
        }
    }, [data, index, getUser])

    useEffect(() => {
    }, [resultUser])

    useEffect(() => {
        resultUser.isError && console.log('Err (HeaderNotification)', resultUser.error);
    }, [resultUser])

    const handleToNotification = (e) => {
        e.stopPropagation();
        navigate('/notifications', {state: {uuid_notification: data.uuid_notification}});
    }

    const handleToProfile = (e) => {
        e.stopPropagation();
        console.log('handleToProfile')
        navigate('/profile/gfsdgsd');
    }

    return (
        <div className="HeaderNotification HeaderNotification-loading" onClick={(e) => handleToNotification(e)}>
            {
                resultUser.isSuccess && !resultUser.isFetching ?
                <>
                    <div>
                        <img src={ resultUser?.data.user.avatar !== null ? resultUser?.data.user.avatar : avatarNull } onClick={(e) => handleToProfile(e)} alt='' />
                        <div><strong>{ `${resultUser?.data.user.firstName} ${resultUser?.data.user.lastName}` }</strong> { notification?.title }</div>
                    </div>
                    <div>{ data.createdAt }</div>
                </> : <></>
            }
        </div>
    )
}

export default memo(HeaderNotification);

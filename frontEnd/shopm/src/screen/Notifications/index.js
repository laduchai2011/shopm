import React, { useEffect, useState, useRef, memo } from 'react';
import './styles.css';

import { useLocation } from 'react-router-dom';

import NotifySmall from './components/NotifySmall';
import NotifyDetail from './components/NotifyDetail';
import { useLazyGetNotificationListQuery } from 'reduxStore/RTKQuery/notificationRTKQuery';

import { $ } from 'utilize/Tricks';


const Notifications = () => {
    const location = useLocation();
    const uuid_notification = location.state.uuid_notification;
    console.log('Notifications', uuid_notification)

    const [notifyList, setNotifyList] = useState([
        { status: 'all', dataArray: [], pageIndex: 0},
        { status: 'receved', dataArray: [], pageIndex: 0},
        { status: 'seen', dataArray: [], pageIndex: 0},
        { status: 'read', dataArray: [], pageIndex: 0}
    ]);
    const notifyIndex = useRef(0);

    const [getNotificationList, resultNotificationList] = useLazyGetNotificationListQuery();

    useEffect(() => {
        const q_options = $('.Notifications-options').children;
        getNotificationList({
            type: 'normal',
            status: 'all',
            pageIndex: 1,
            pageSize: 10
        }, true)
        q_options.forEach(q_option => {
            q_option.onclick = function(e) {
                // e.stopPropagation();
                for (let i = 0; i < q_options.length; i++) {
                    if (q_options[i] !== q_option) {
                        q_options[i].classList.remove('active');
                    } else {
                        notifyIndex.current = i;
                    }
                }
                q_option.classList.add('active');
                getNotificationList({
                    type: 'normal',
                    status: getStatus(notifyIndex.current),
                    pageIndex: 1,
                    pageSize: 10
                }, true)
            }
        });
    }, [getNotificationList])

    useEffect(() => {
        resultNotificationList?.isError && console.log('Notifications', resultNotificationList?.error);
    }, [resultNotificationList?.isError,
        resultNotificationList?.error
    ])

    useEffect(() => {
        console.log('Notifications')
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

    const showNotyfiList = (bool) => {
        const q_Notifications = $('.Notifications');
        const q_showNotyfiList = q_Notifications.children[0];
        
        if (bool) {
            q_showNotyfiList.classList.add('show');
        } else {
            q_showNotyfiList.classList.remove('show')
        }
    }

    const list_notification = notifyList[notifyIndex.current].dataArray.map((data, index) => {
        return (
            <NotifySmall key={ index } data={ data } index={ index } />
        )
    })

    return (
        <div className='Notifications'>
            <div className='show'>
                <div>
                    <h4>Notifications</h4>
                    <div className='active' onClick={() => showNotyfiList(false)}></div>
                </div>
                <div>
                    <div className='Notifications-options'>
                        <div className='active'>All</div>
                        <div>RECEVED</div>
                        <div>SEEN</div>
                        <div>READ</div>
                    </div>
                    <div className='Notifications-list'>
                        {list_notification}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h4>Detail</h4>
                    <div className='active' onClick={() => showNotyfiList(true)}></div>
                </div>
                <NotifyDetail />
            </div>
        </div>
    )
}

export default memo(Notifications);
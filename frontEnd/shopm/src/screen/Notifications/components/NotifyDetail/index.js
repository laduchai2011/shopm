import React, { memo } from "react";
import './styles.css';

import { useSelector } from 'react-redux'

import NotifyRequireExamine from "./components/NotifyRequireExamine";

const NotifyDetail = () => {
    console.log('NotifyDetail')

    const notifications = useSelector((state) => state.notifications);

    switch(notifications.currentNotify?.type) {
        case 'requireExamine':
            return (<NotifyRequireExamine notifications={ notifications } />)
        default:
            return (
                <div className="NotifyDetail">
                    { `${notifications.currentNotify?.title}` }
                </div>
            )
    }
}

export default memo(NotifyDetail);
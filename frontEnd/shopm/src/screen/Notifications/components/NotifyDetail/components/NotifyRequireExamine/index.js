import React, { memo } from 'react';
import './styles.css';

const NotifyRequireExamine = ({ notifications }) => {

    const resultUser = notifications.resultUser;

    return (
        <div className='NotifyRequireExamine'>
            <span><strong>{`${resultUser?.data.user.firstName} ${resultUser?.data.user.lastName}`}</strong> <span>{ 'require you to examine for them' }</span></span>
            <button>Xem</button>
        </div>
    )
}

export default memo(NotifyRequireExamine);
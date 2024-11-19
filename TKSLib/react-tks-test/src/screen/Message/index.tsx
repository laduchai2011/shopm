import React, { FC, useState } from 'react';
import './styles.css';

import ToastMessage from 'Components/ToastMessage';
import Overlay from 'Components/OverLay';

import { ToastMessageProps } from 'define';

const Message: FC<{}> = () => {

    const [toastMessage, setToastMessage] = useState<ToastMessageProps | undefined>(undefined);

    const [i, setI] = useState<number>(0)

    const handleClick = () => {
        const newMessage: ToastMessageProps = {
            type: 'SUCCESS',
            message: `message ${i}`
        } 
        setI(x => x + 1)
        setToastMessage(newMessage);
    }

    return <div className="TKS-Message">
        <button onClick={() => handleClick()}>click</button>
        <ToastMessage toastMessage={toastMessage} />
        <Overlay  
            isShow={true} 
        />
    </div>;
};

export default Message;
import React, { FC, useState } from 'react';
import './styles.css';

import ToastMessage from 'Components/ToastMessage';

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
    </div>;
};

export default Message;
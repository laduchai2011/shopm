import React, { FC, useState } from 'react';
import './styles.css';

import ToastMessage from 'Components/ToastMessage';
import Overlay from 'Components/OverLay';
import Dialog from 'Components/Dialog';

import { ToastMessageProps } from 'define';

const Message: FC<{}> = () => {

    const [toastMessage, setToastMessage] = useState<ToastMessageProps | undefined>(undefined);

    const [i, setI] = useState<number>(0)
    const [isShow, setIsshow] = useState<boolean>(false);

    const handleClick = () => {
        const newMessage: ToastMessageProps = {
            type: 'SUCCESS',
            message: `message ${i}`
        } 
        setI(x => x + 1)
        setToastMessage(newMessage);
    }

    const handleShowDialog = () => {
        setIsshow(!isShow)
    }

    const handleClose = () : void => {
        setIsshow(false);
    }

    return <div className="TKS-Message">
        <button onClick={() => handleClick()}>click</button>
        <button onClick={() => handleShowDialog()}>showDialog</button>
        <ToastMessage toastMessage={toastMessage} />
        <Overlay  
            isShow={isShow} 
            onClose={() => handleClose()}
        >
            <Dialog dialog={{message_type: 'SUCCESS'}} message='dfdsfsdf' isShow={isShow} onClose={() => handleClose()} />
        </Overlay>
    </div>;
};

export default Message;
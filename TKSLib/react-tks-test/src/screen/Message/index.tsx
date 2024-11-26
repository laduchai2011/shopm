import React, { FC, useState } from 'react';
import './styles.css';

import ToastMessage from 'Components/ToastMessage';
import Overlay from 'Components/OverLay';
import Dialog from 'Components/Dialog';

import { ToastMessageProps } from 'define';
import { TOAST_MESSAGE_CONST } from 'const';
import { TKSProps } from 'define';

const Message: FC<{}> = () => {

    const [i, setI] = useState<number>(0)
    const [isShow, setIsshow] = useState<boolean>(false);

    const [toastMessage, setToastMessage] = useState<ToastMessageProps>({
        config: { name: '1234' },
        event: {
            onData: (TKS) => handleOnData(TKS)
        }
    });

    const handleClick = () => {
        if ((i%2) > 0) {
            setToastMessage({
                ...toastMessage,
                data: { message: `hello ${i}`, type: TOAST_MESSAGE_CONST.TYPE.WARN}
            })
        } else {
            setToastMessage({
                ...toastMessage,
                data: { message: `hello ${i}`, type: TOAST_MESSAGE_CONST.TYPE.ERROR}
            })
        }
        
        setI(x => x + 1)
    }

    const handleShowDialog = () => {
        setIsshow(!isShow)
    }

    const handleClose = () : void => {
        setIsshow(false);
    }

    const handleOnData = (TKS: TKSProps) : void => {
        console.log(TKS)
    }

    return <div className="TKS-Message">
        <button onClick={() => handleClick()}>click</button>
        <button onClick={() => handleShowDialog()}>showDialog</button>
        <ToastMessage toastMessage={toastMessage} />
        <Overlay  
            isShow={isShow} 
            onClose={() => handleClose()}
        >
            <Dialog dialog={{
                data: {message: 'dialog', message_color: 'red', message_type: 'ERROR'},
                control: {isShow: true}
            }} />
          
        </Overlay>
    </div>;
};

export default Message;
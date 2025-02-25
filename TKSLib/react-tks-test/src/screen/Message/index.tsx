import React, { FC, useState } from 'react';
import './styles.css';

import ToastMessage from 'src/components/ToastMessage';
import Overlay from 'src/components/Overlay';
import Dialog from 'src/components/Dialog';

import { ToastMessageProps } from 'src/define';
import { TOAST_MESSAGE_CONST } from 'src/const';
import { TKSProps } from 'src/define';

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
        setIsshow(true)
    }

    // const handleClose = () : void => {
    //     setIsshow(false);
    // }

    const handleOnData = (TKS: TKSProps) : void => {
        // TKS.test = 'asdfasfasf'
    }

    const handleClose_dialog = (TKS: TKSProps) => {
        TKS.removeDefaultFunction();
        setIsshow(false);
    }

    const handleClose_overlay = (TKS: TKSProps) => {
        TKS.removeDefaultFunction();
        setIsshow(false);
    }

    return <div className="TKS-Message">
        <button onClick={() => handleClick()}>click</button>
        <button onClick={() => handleShowDialog()}>showDialog</button>
        <ToastMessage toastMessage={toastMessage} />
        <Overlay overlay={{
            control: { isShow: isShow },
            event: { onClose: (TKS) => handleClose_overlay(TKS)}
        }} >
            <Dialog dialog={{
                data: {message: 'dialog', message_color: 'red', message_type: 'ERROR'},
                control: {isShow: isShow},
                event: {onClose: (TKS) => handleClose_dialog(TKS)}
            }} />
          
        </Overlay>
    </div>;
};

export default Message;
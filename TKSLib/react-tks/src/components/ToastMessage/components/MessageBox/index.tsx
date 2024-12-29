import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import TickSymbol from 'src/components/Icon/TickSymbol';
import WarnTriangle from 'src/components/Icon/WarnTriangle';
import ErrorCircle from 'src/components/Icon/ErrorCircle';
import DeleteCircle from 'src/components/Icon/DeleteCircle';

import { 
    TickSymbolProps,
    WarnTriangleProps,
    ErrorCircleProps,
    DeleteCircleProps 
} from 'src/define';

import { TOAST_MESSAGE_CONST } from 'src/const';

const MessageBox: FC<{ 
    type?: string, 
    message?: string
}> = ({ type, message }) => {

    const messageBoxElement = useRef<HTMLDivElement | null>(null);
    const autoRemoveShow = useRef<boolean>(true);

    let color: string | undefined;
    const successColor = '#6eff33';
    const warnColor = '#ffff00';
    const errorColor = 'red';

    if (type===TOAST_MESSAGE_CONST.TYPE.SUCCESS) {
        color = successColor;
    }
    
    if (type===TOAST_MESSAGE_CONST.TYPE.WARN) {
        color = warnColor;
    } 

    if (type===TOAST_MESSAGE_CONST.TYPE.ERROR) {
        color = errorColor;
    } 

    useEffect(() => {
        let top: number = 50;
       
        if (messageBoxElement.current) {
            messageBoxElement.current.style.setProperty('--show-time', '1'); 
            const interval_addShow = setInterval(() => {
                messageBoxElement.current && messageBoxElement.current.classList.add('show'); 
                clearInterval(interval_addShow);
            }, 100)

            messageBoxElement.current.style.top = `${top}px`;
            messageBoxElement.current.style.setProperty('--message-color', `${color}`);

            const interval_removeShow = setInterval(() => {
                if (messageBoxElement.current && autoRemoveShow.current) {
                    messageBoxElement.current.classList.remove('show'); 
                }
                clearInterval(interval_removeShow);
            }, 5000)
        }    
    }, [color])

    const handleDelete = () : void => {
        if (messageBoxElement.current) {
            messageBoxElement.current.style.setProperty('--show-time', '1'); 
            messageBoxElement.current.classList.remove('show'); 
        }
    }

    const handleMouseOver = () : void => {
        autoRemoveShow.current = false;
    }

    const tickSymbol: TickSymbolProps = {
        size: 30,
        fill: color
    }

    const warnTriangle: WarnTriangleProps = {
        size: 30,
        fill: color
    }

    const errorCircle: ErrorCircleProps = {
        size: 30,
        fill: color
    }

    const deleteCircle: DeleteCircleProps = {
        size: 20
    }

    return <div className="TKS-ToastMessage-MessageBox" ref={messageBoxElement} onMouseOver={() => handleMouseOver()}>
        <div></div>
        <div>
            { type===TOAST_MESSAGE_CONST.TYPE.SUCCESS && <TickSymbol tickSymbol={tickSymbol} /> }
            { type===TOAST_MESSAGE_CONST.TYPE.WARN && <WarnTriangle warnTriangle={warnTriangle} /> }
            { type===TOAST_MESSAGE_CONST.TYPE.ERROR && <ErrorCircle errorCircle={errorCircle} /> }
        </div>
        <div>{ message }</div>
        <div><DeleteCircle deleteCircle={deleteCircle} onClick={() => handleDelete()} /></div>
    </div>;
};

export default React.memo(MessageBox);
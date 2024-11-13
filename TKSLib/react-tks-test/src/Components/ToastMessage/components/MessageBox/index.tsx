import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import TickSymbol from 'Components/Icon/TickSymbol';
import WarnTriangle from 'Components/Icon/WarnTriangle';
import ErrorCircle from 'Components/Icon/ErrorCircle';
import DeleteCircle from 'Components/Icon/DeleteCircle';

import { 
    TickSymbolProps,
    WarnTriangleProps,
    ErrorCircleProps,
    DeleteCircleProps 
} from 'define';

const MessageBox: FC<{ index: number, type: string, data: any }> = ({ index, type, data }) => {

    const messageBoxElement = useRef<HTMLDivElement | null>(null);

    const distanceMessageBoxs = 60;
    const topContainer = 50;
    let color: string | undefined;
    const successColor = '#6eff33';
    const warnColor = '#ffff00';
    const errorColor = 'red';

    if (type==='success') {
        color = successColor;
    }
    
    if (type==='warn') {
        color = warnColor;
    } 

    if (type==='error') {
        color = errorColor;
    } 

    useEffect(() => {
        let top: number = (index + 1) * distanceMessageBoxs - (distanceMessageBoxs - topContainer);
        if (index===0) {
            top = topContainer;
        }
        if (messageBoxElement.current) {
            messageBoxElement.current.style.top = `${top}px`;
            messageBoxElement.current.style.setProperty('--message-color', `${color}`)
        }    
    }, [index, color])

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

    return <div className="TKS-ToastMessage-MessageBox show" ref={messageBoxElement}>
        <div></div>
        <div>
            { type==='success' && <TickSymbol tickSymbol={tickSymbol} /> }
            { type==='warn' && <WarnTriangle warnTriangle={warnTriangle} /> }
            { type==='error' && <ErrorCircle errorCircle={errorCircle} /> }
        </div>
        <div>Message { data }</div>
        <div><DeleteCircle deleteCircle={deleteCircle} /></div>
    </div>;
};

export default MessageBox;
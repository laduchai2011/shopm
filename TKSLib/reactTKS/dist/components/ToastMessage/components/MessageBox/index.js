import React, { useRef, useEffect } from 'react';
import './styles.css';
import TickSymbol from 'components/Icon/TickSymbol';
import WarnTriangle from 'components/Icon/WarnTriangle';
import ErrorCircle from 'components/Icon/ErrorCircle';
import DeleteCircle from 'components/Icon/DeleteCircle';
import { TOAST_MESSAGE_CONST } from 'const';
const MessageBox = ({ type, message }) => {
    const messageBoxElement = useRef(null);
    const autoRemoveShow = useRef(true);
    let color;
    const successColor = '#6eff33';
    const warnColor = '#ffff00';
    const errorColor = 'red';
    if (type === TOAST_MESSAGE_CONST.TYPE.SUCCESS) {
        color = successColor;
    }
    if (type === TOAST_MESSAGE_CONST.TYPE.WARN) {
        color = warnColor;
    }
    if (type === TOAST_MESSAGE_CONST.TYPE.ERROR) {
        color = errorColor;
    }
    useEffect(() => {
        let top = 50;
        if (messageBoxElement.current) {
            messageBoxElement.current.style.setProperty('--show-time', '1');
            const interval_addShow = setInterval(() => {
                messageBoxElement.current && messageBoxElement.current.classList.add('show');
                clearInterval(interval_addShow);
            }, 100);
            messageBoxElement.current.style.top = `${top}px`;
            messageBoxElement.current.style.setProperty('--message-color', `${color}`);
            const interval_removeShow = setInterval(() => {
                if (messageBoxElement.current && autoRemoveShow.current) {
                    messageBoxElement.current.classList.remove('show');
                }
                clearInterval(interval_removeShow);
            }, 5000);
        }
    }, [color]);
    const handleDelete = () => {
        if (messageBoxElement.current) {
            messageBoxElement.current.style.setProperty('--show-time', '1');
            messageBoxElement.current.classList.remove('show');
        }
    };
    const handleMouseOver = () => {
        autoRemoveShow.current = false;
    };
    const tickSymbol = {
        size: 30,
        fill: color
    };
    const warnTriangle = {
        size: 30,
        fill: color
    };
    const errorCircle = {
        size: 30,
        fill: color
    };
    const deleteCircle = {
        size: 20
    };
    return React.createElement("div", { className: "TKS-ToastMessage-MessageBox", ref: messageBoxElement, onMouseOver: () => handleMouseOver() },
        React.createElement("div", null),
        React.createElement("div", null,
            type === TOAST_MESSAGE_CONST.TYPE.SUCCESS && React.createElement(TickSymbol, { tickSymbol: tickSymbol }),
            type === TOAST_MESSAGE_CONST.TYPE.WARN && React.createElement(WarnTriangle, { warnTriangle: warnTriangle }),
            type === TOAST_MESSAGE_CONST.TYPE.ERROR && React.createElement(ErrorCircle, { errorCircle: errorCircle })),
        React.createElement("div", null, message),
        React.createElement("div", null,
            React.createElement(DeleteCircle, { deleteCircle: deleteCircle, onClick: () => handleDelete() })));
};
export default React.memo(MessageBox);

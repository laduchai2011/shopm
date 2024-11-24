import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import MessageBox from './components/MessageBox';
import { handleCutPXInString } from 'utils';
const ToastMessage = ({ toastMessage, onData }) => {
    const toastMessageElement = useRef(null);
    const toastMessageContainerElement = useRef(null);
    const [allData, setAllData] = useState([]);
    const distanceMessageBoxs = 60;
    useEffect(() => {
        const cp_allData = [...allData];
        if (toastMessage) {
            cp_allData.unshift(toastMessage);
            setAllData(cp_allData);
            if (toastMessageContainerElement.current) {
                // const messageBoxElements = toastMessageContainerElement.current.children;
                const messageBoxDivElements_m = toastMessageContainerElement.current.children;
                const messageBoxDivElements = Array.from(messageBoxDivElements_m);
                if (messageBoxDivElements.length > 0) {
                    for (let i = 0; i < messageBoxDivElements.length; i++) {
                        const messageBoxElements = messageBoxDivElements[i].children;
                        if (messageBoxElements[0]) {
                            const pre_top = messageBoxElements[0].style.top;
                            const old_top = Number(handleCutPXInString(pre_top));
                            messageBoxElements[0].style.top = `${old_top + distanceMessageBoxs}px`;
                            if (i > 4) {
                                messageBoxElements[0].style.opacity = '0';
                            }
                            if (i > 2) {
                                messageBoxElements[0].remove();
                            }
                        }
                    }
                    createElement({ message: toastMessage.message });
                }
            }
        }
        // eslint-disable-next-line
    }, [toastMessage]);
    useEffect(() => {
        onData && onData(allData);
    }, [allData, onData]);
    const createElement = (createElement) => {
        var _a;
        const element = React.createElement(MessageBox, { index: 1, type: 'SUCCESS', message: createElement.message });
        const newNode = document.createElement('div');
        newNode.style.width = '300px';
        ReactDOM.createRoot(newNode).render(element);
        (_a = toastMessageContainerElement.current) === null || _a === void 0 ? void 0 : _a.insertBefore(newNode, toastMessageContainerElement.current.firstChild);
    };
    return React.createElement("div", { className: "TKS-ToastMessage", ref: toastMessageElement },
        React.createElement("div", { className: 'TKS-ToastMessage-Container', ref: toastMessageContainerElement },
            React.createElement("div", null),
            React.createElement("div", null)));
};
export default React.memo(ToastMessage);

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useRef, useEffect, useId } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import MessageBox from './components/MessageBox';
import { TKS_Init } from 'define';
import { handleCutPXInString } from 'utils';
const ToastMessage = (_a) => {
    var _b;
    var { toastMessage } = _a, props = __rest(_a, ["toastMessage"]);
    const id = useRef(`ToastMessage__T: ${useId()}`);
    const toastMessageElement = useRef(null);
    const toastMessageContainerElement = useRef(null);
    const maxMessage_ = useRef(10);
    const [allData, setAllData] = useState([]);
    const distanceMessageBoxs = 60;
    useEffect(() => {
        var _a;
        const cp_allData = [...allData];
        if (toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data) {
            cp_allData.unshift(toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data);
            setAllData(cp_allData);
            if (toastMessageContainerElement.current) {
                const messageBoxDivElements_m = toastMessageContainerElement.current.children;
                const messageBoxDivElements = Array.from(messageBoxDivElements_m);
                for (let i = 0; i < messageBoxDivElements.length; i++) {
                    const messageBoxElements = messageBoxDivElements[i].children;
                    if (messageBoxElements[0]) {
                        const pre_top = messageBoxElements[0].style.top;
                        const old_top = Number(handleCutPXInString(pre_top));
                        messageBoxElements[0].style.top = `${old_top + distanceMessageBoxs}px`;
                        if (i === maxMessage_.current) {
                            messageBoxElements[0].style.opacity = '0';
                            const messageBoxDivElements_n = messageBoxDivElements[i];
                            const remove_interval = setInterval(() => {
                                messageBoxDivElements_n.remove();
                                clearInterval(remove_interval);
                            }, 1000);
                        }
                    }
                }
                createElement({ message: (_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data) === null || _a === void 0 ? void 0 : _a.message });
            }
        }
        // eslint-disable-next-line
    }, [toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data]);
    useEffect(() => {
        var _a, _b;
        if ((_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _a === void 0 ? void 0 : _a.max_message) {
            maxMessage_.current = (_b = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _b === void 0 ? void 0 : _b.max_message;
        }
    }, [toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config]);
    useEffect(() => {
        var _a, _b;
        if ((_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _a === void 0 ? void 0 : _a.id) {
            id.current = (_b = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _b === void 0 ? void 0 : _b.id;
        }
    }, [(_b = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _b === void 0 ? void 0 : _b.id]);
    useEffect(() => {
        var _a, _b, _c;
        const TKS = Object.assign(Object.assign({}, TKS_Init), { name: (_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, data: {
                allData: allData
            } });
        ((_b = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.event) === null || _b === void 0 ? void 0 : _b.onData) && ((_c = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.event) === null || _c === void 0 ? void 0 : _c.onData(TKS));
    }, [allData, toastMessage]);
    const createElement = (createElement) => {
        var _a, _b;
        const element = React.createElement(MessageBox, { type: (_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data) === null || _a === void 0 ? void 0 : _a.type, message: createElement.message });
        const newNode = document.createElement('div');
        newNode.style.width = '300px';
        ReactDOM.createRoot(newNode).render(element);
        (_b = toastMessageContainerElement.current) === null || _b === void 0 ? void 0 : _b.insertBefore(newNode, toastMessageContainerElement.current.firstChild);
    };
    return React.createElement("div", Object.assign({ className: "TKS-ToastMessage", ref: toastMessageElement }, props, { id: id.current }),
        React.createElement("div", { className: 'TKS-ToastMessage-Container', ref: toastMessageContainerElement }));
};
export default React.memo(ToastMessage);

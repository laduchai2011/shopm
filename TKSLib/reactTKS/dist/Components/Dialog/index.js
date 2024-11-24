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
import React, { useRef, useEffect } from 'react';
import './styles.css';
import DeleteCircle from 'Components/Icon/DeleteCircle';
import TickSymbol from 'Components/Icon/TickSymbol';
import WarnTriangle from 'Components/Icon/WarnTriangle';
import ErrorCircle from 'Components/Icon/ErrorCircle';
import { DIALOG_CONST } from 'const';
const Dialog = (_a) => {
    var { dialog, message, isShow, onClickButton1, onClickButton2, onClickButton3, onClose } = _a, props = __rest(_a, ["dialog", "message", "isShow", "onClickButton1", "onClickButton2", "onClickButton3", "onClose"]);
    const dialogElement = useRef(null);
    const showCommand = useRef('show');
    const showTime = useRef(0.3);
    const messageType = useRef(undefined);
    const activate_button_1 = useRef(undefined);
    const activate_button_2 = useRef(undefined);
    const activate_button_3 = useRef(undefined);
    const button_1_name = useRef(undefined);
    const button_2_name = useRef(undefined);
    const button_3_name = useRef(undefined);
    messageType.current = dialog === null || dialog === void 0 ? void 0 : dialog.message_type;
    activate_button_1.current = dialog === null || dialog === void 0 ? void 0 : dialog.activate_button_1;
    activate_button_2.current = dialog === null || dialog === void 0 ? void 0 : dialog.activate_button_2;
    activate_button_3.current = dialog === null || dialog === void 0 ? void 0 : dialog.activate_button_3;
    button_1_name.current = dialog === null || dialog === void 0 ? void 0 : dialog.button_1_name;
    button_2_name.current = dialog === null || dialog === void 0 ? void 0 : dialog.button_2_name;
    button_3_name.current = dialog === null || dialog === void 0 ? void 0 : dialog.button_3_name;
    // set default button
    if ((dialog === null || dialog === void 0 ? void 0 : dialog.activate_button_1) === true || (dialog === null || dialog === void 0 ? void 0 : dialog.activate_button_1) === undefined) {
        activate_button_1.current = true;
    }
    if ((dialog === null || dialog === void 0 ? void 0 : dialog.activate_button_3) === true || (dialog === null || dialog === void 0 ? void 0 : dialog.activate_button_3) === undefined) {
        activate_button_3.current = true;
    }
    if ((dialog === null || dialog === void 0 ? void 0 : dialog.button_1_name) === undefined) {
        button_1_name.current = 'Button 1';
    }
    if ((dialog === null || dialog === void 0 ? void 0 : dialog.button_2_name) === undefined) {
        button_2_name.current = 'Button 2';
    }
    if ((dialog === null || dialog === void 0 ? void 0 : dialog.button_3_name) === undefined) {
        button_3_name.current = 'Button 3';
    }
    useEffect(() => {
        if (dialogElement.current) {
            (dialog === null || dialog === void 0 ? void 0 : dialog.opacity_time) && dialogElement.current.style.setProperty('--opacity-time', `${dialog.opacity_time}`);
            (dialog === null || dialog === void 0 ? void 0 : dialog.show_time) && dialogElement.current.style.setProperty('--show-time', `${dialog.show_time}`); /*NOT USE*/
            (dialog === null || dialog === void 0 ? void 0 : dialog.button_font_size) && dialogElement.current.style.setProperty('--button-font-size', `${dialog.button_font_size}`);
            (dialog === null || dialog === void 0 ? void 0 : dialog.button_min_width) && dialogElement.current.style.setProperty('--button-min-width', `${dialog.button_min_width}`);
            (dialog === null || dialog === void 0 ? void 0 : dialog.message_color) && dialogElement.current.style.setProperty('--message-color', `${dialog.message_color}`); /*NOT USE*/
            if (dialog === null || dialog === void 0 ? void 0 : dialog.show_time) {
                showTime.current = dialog.show_time;
            }
        }
    }, [dialog]);
    useEffect(() => {
        if (dialogElement.current) {
            if (isShow) {
                dialogElement.current.style.display = 'block';
                const interval_display = setInterval(() => {
                    if (dialogElement.current) {
                        dialogElement.current.classList.add(showCommand.current);
                    }
                    clearInterval(interval_display);
                }, 0);
            }
            else {
                dialogElement.current.classList.remove(showCommand.current);
                const interval_display = setInterval(() => {
                    if (dialogElement.current) {
                        dialogElement.current.style.display = 'none';
                    }
                    clearInterval(interval_display);
                }, showTime.current * 1000);
            }
        }
    }, [isShow]);
    const handleDelete = () => {
        onClose && onClose();
    };
    const handleButton1Click = (e) => {
        onClickButton1 && onClickButton1(e);
    };
    const handleButton2Click = (e) => {
        onClickButton2 && onClickButton2(e);
    };
    const handleButton3Click = (e) => {
        onClickButton3 && onClickButton3(e);
    };
    return React.createElement("div", Object.assign({ className: "TKS-Dialog" }, props, { ref: dialogElement }),
        React.createElement("div", null,
            React.createElement(DeleteCircle, { deleteCircle: { size: 22 }, onClick: () => handleDelete() })),
        React.createElement("div", null,
            React.createElement("div", null, message),
            messageType.current === DIALOG_CONST.MESSAGE_TYPE.SUCCESS && React.createElement("div", null,
                React.createElement(TickSymbol, null)),
            messageType.current === DIALOG_CONST.MESSAGE_TYPE.WARN && React.createElement("div", null,
                React.createElement(WarnTriangle, null)),
            messageType.current === DIALOG_CONST.MESSAGE_TYPE.ERROR && React.createElement("div", null,
                React.createElement(ErrorCircle, null))),
        React.createElement("div", null,
            activate_button_1.current && React.createElement("button", { className: 'TKS-Dialog-botton1', onClick: (e) => handleButton1Click(e) }, button_1_name.current),
            activate_button_2.current && React.createElement("button", { className: 'TKS-Dialog-botton2', onClick: (e) => handleButton2Click(e) }, button_2_name.current),
            activate_button_3.current && React.createElement("button", { className: 'TKS-Dialog-botton3', onClick: (e) => handleButton3Click(e) }, button_3_name.current)),
        React.createElement("div", null, props.children));
};
export default React.memo(Dialog);

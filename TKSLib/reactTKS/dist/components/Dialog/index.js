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
import React, { useRef, useEffect, useId, useState } from 'react';
import './styles.css';
import DeleteCircle from 'components/Icon/DeleteCircle';
import TickSymbol from 'components/Icon/TickSymbol';
import WarnTriangle from 'components/Icon/WarnTriangle';
import ErrorCircle from 'components/Icon/ErrorCircle';
import { TKS_Init } from 'define';
import { DIALOG_CONST } from 'const';
const Dialog = (_a) => {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var { dialog } = _a, props = __rest(_a, ["dialog"]);
    const id = useRef(`Dialog__T: ${useId()}`);
    const dialogElement = useRef(null);
    const showCommand = useRef('show');
    const [isShow_, setIsShow_] = useState();
    const showTime = useRef(0.3);
    const messageType = useRef(undefined);
    const activate_button_1 = useRef(undefined);
    const activate_button_2 = useRef(undefined);
    const activate_button_3 = useRef(undefined);
    const button_1_name = useRef(undefined);
    const button_2_name = useRef(undefined);
    const button_3_name = useRef(undefined);
    messageType.current = (_b = dialog === null || dialog === void 0 ? void 0 : dialog.data) === null || _b === void 0 ? void 0 : _b.message_type;
    activate_button_1.current = (_c = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _c === void 0 ? void 0 : _c.activate_button_1;
    activate_button_2.current = (_d = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _d === void 0 ? void 0 : _d.activate_button_2;
    activate_button_3.current = (_e = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _e === void 0 ? void 0 : _e.activate_button_3;
    button_1_name.current = (_f = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _f === void 0 ? void 0 : _f.button_1_name;
    button_2_name.current = (_g = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _g === void 0 ? void 0 : _g.button_2_name;
    button_3_name.current = (_h = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _h === void 0 ? void 0 : _h.button_3_name;
    // set default button
    if (((_j = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _j === void 0 ? void 0 : _j.activate_button_1) === true || ((_k = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _k === void 0 ? void 0 : _k.activate_button_1) === undefined) {
        activate_button_1.current = true;
    }
    if (((_l = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _l === void 0 ? void 0 : _l.activate_button_3) === true || ((_m = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _m === void 0 ? void 0 : _m.activate_button_3) === undefined) {
        activate_button_3.current = true;
    }
    if (((_o = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _o === void 0 ? void 0 : _o.button_1_name) === undefined) {
        button_1_name.current = 'Button 1';
    }
    if (((_p = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _p === void 0 ? void 0 : _p.button_2_name) === undefined) {
        button_2_name.current = 'Button 2';
    }
    if (((_q = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _q === void 0 ? void 0 : _q.button_3_name) === undefined) {
        button_3_name.current = 'Button 3';
    }
    useEffect(() => {
        var _a, _b;
        if ((_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.id) {
            id.current = (_b = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _b === void 0 ? void 0 : _b.id;
        }
    }, [(_r = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _r === void 0 ? void 0 : _r.id]);
    useEffect(() => {
        var _a, _b, _c, _d, _e;
        if (dialogElement.current) {
            ((_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.opacity_time) && dialogElement.current.style.setProperty('--opacity-time', `${dialog === null || dialog === void 0 ? void 0 : dialog.config.opacity_time}`);
            ((_b = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _b === void 0 ? void 0 : _b.show_time) && dialogElement.current.style.setProperty('--show-time', `${dialog === null || dialog === void 0 ? void 0 : dialog.config.show_time}`); /*NOT USE*/
            ((_c = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _c === void 0 ? void 0 : _c.button_font_size) && dialogElement.current.style.setProperty('--button-font-size', `${dialog === null || dialog === void 0 ? void 0 : dialog.config.button_font_size}`);
            ((_d = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _d === void 0 ? void 0 : _d.button_min_width) && dialogElement.current.style.setProperty('--button-min-width', `${dialog === null || dialog === void 0 ? void 0 : dialog.config.button_min_width}`);
            if ((_e = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _e === void 0 ? void 0 : _e.show_time) {
                showTime.current = dialog === null || dialog === void 0 ? void 0 : dialog.config.show_time;
            }
        }
    }, [dialog === null || dialog === void 0 ? void 0 : dialog.config]);
    useEffect(() => {
        var _a, _b;
        if (dialogElement.current) {
            ((_a = dialog === null || dialog === void 0 ? void 0 : dialog.data) === null || _a === void 0 ? void 0 : _a.message_color) && dialogElement.current.style.setProperty('--message-color', `${(_b = dialog === null || dialog === void 0 ? void 0 : dialog.data) === null || _b === void 0 ? void 0 : _b.message_color}`);
        }
    }, [dialog === null || dialog === void 0 ? void 0 : dialog.data]);
    useEffect(() => {
        var _a;
        setIsShow_((_a = dialog === null || dialog === void 0 ? void 0 : dialog.control) === null || _a === void 0 ? void 0 : _a.isShow);
    }, [(_s = dialog === null || dialog === void 0 ? void 0 : dialog.control) === null || _s === void 0 ? void 0 : _s.isShow]);
    useEffect(() => {
        if (dialogElement.current) {
            if (isShow_) {
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
    }, [isShow_]);
    const handleDelete = (e) => {
        var _a, _b, _c;
        let isRemoveDefaultFunction = false;
        if ((_a = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _a === void 0 ? void 0 : _a.onClose) {
            const TKS = Object.assign(Object.assign({}, TKS_Init), { name: (_b = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _b === void 0 ? void 0 : _b.name, id: id.current, data: {
                    isShow: false
                }, event: {
                    defaultEvent: e
                }, removeDefaultFunction() {
                    isRemoveDefaultFunction = true;
                } });
            (_c = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _c === void 0 ? void 0 : _c.onClose(TKS);
            if (!isRemoveDefaultFunction) {
                setIsShow_(false);
            }
        }
        else {
            setIsShow_(false);
        }
    };
    const handleButton1Click = (e) => {
        var _a, _b, _c;
        const TKS = Object.assign(Object.assign({}, TKS_Init), { name: (_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, event: {
                defaultEvent: e
            } });
        ((_b = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _b === void 0 ? void 0 : _b.onClickButton1) && ((_c = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _c === void 0 ? void 0 : _c.onClickButton1(TKS));
    };
    const handleButton2Click = (e) => {
        var _a, _b, _c;
        const TKS = Object.assign(Object.assign({}, TKS_Init), { name: (_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, event: {
                defaultEvent: e
            } });
        ((_b = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _b === void 0 ? void 0 : _b.onClickButton2) && ((_c = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _c === void 0 ? void 0 : _c.onClickButton2(TKS));
    };
    const handleButton3Click = (e) => {
        var _a, _b, _c;
        const TKS = Object.assign(Object.assign({}, TKS_Init), { name: (_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, event: {
                defaultEvent: e
            } });
        ((_b = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _b === void 0 ? void 0 : _b.onClickButton3) && ((_c = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _c === void 0 ? void 0 : _c.onClickButton3(TKS));
    };
    return React.createElement("div", Object.assign({ className: "TKS-Dialog" }, props, { ref: dialogElement, id: id.current }),
        React.createElement("div", null,
            React.createElement(DeleteCircle, { deleteCircle: { size: 22 }, onClick: (e) => handleDelete(e) })),
        React.createElement("div", null,
            React.createElement("div", null, (_t = dialog === null || dialog === void 0 ? void 0 : dialog.data) === null || _t === void 0 ? void 0 : _t.message),
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

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
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef, useState, useId } from 'react';
import './styles.css';
import { TKS_Init } from 'define';
import { OVERLAY_CONST } from 'const';
const Overlay = (_a) => {
    var _b, _c, _d;
    var { overlay } = _a, props = __rest(_a, ["overlay"]);
    const overlayElement = useRef(null);
    const showCommand = useRef('showTop');
    const id = useRef(`Dialog__T: ${useId()}`);
    const [isShow_, setIsShow_] = useState();
    useEffect(() => {
        var _a, _b, _c, _d;
        if (overlayElement.current) {
            ((_a = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _a === void 0 ? void 0 : _a.zIndex) && overlayElement.current.style.setProperty('--zIndex', `${overlay.config.zIndex}`);
            ((_b = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _b === void 0 ? void 0 : _b.opacity_time) && overlayElement.current.style.setProperty('--opacity-time', `${overlay.config.opacity_time}`);
            ((_c = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _c === void 0 ? void 0 : _c.show_time) && overlayElement.current.style.setProperty('--show-time', `${overlay.config.show_time}`);
            ((_d = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _d === void 0 ? void 0 : _d.blear_rate) && overlayElement.current.style.setProperty('--blear-rate', `${overlay.config.blear_rate}`);
        }
    }, [overlay === null || overlay === void 0 ? void 0 : overlay.config]);
    useEffect(() => {
        var _a;
        const showType = (_a = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _a === void 0 ? void 0 : _a.show_type;
        if (overlayElement.current) {
            // remove all
            overlayElement.current.classList.remove('setupShowTop');
            overlayElement.current.classList.remove('showTop');
            overlayElement.current.classList.remove('setupShowBottom');
            overlayElement.current.classList.remove('showBottom');
            overlayElement.current.classList.remove('setupShowLeft');
            overlayElement.current.classList.remove('showLeft');
            overlayElement.current.classList.remove('setupShowRight');
            overlayElement.current.classList.remove('showRight');
            switch (showType) {
                case undefined: {
                    overlayElement.current.classList.add('setupShowTop');
                    showCommand.current = 'showTop';
                    break;
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_TOP: {
                    overlayElement.current.classList.add('setupShowTop');
                    showCommand.current = 'showTop';
                    break;
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_BOTTOM: {
                    overlayElement.current.classList.add('setupShowBottom');
                    showCommand.current = 'showBottom';
                    break;
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_LEFT: {
                    overlayElement.current.classList.add('setupShowLeft');
                    showCommand.current = 'showLeft';
                    break;
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_RIGHT: {
                    overlayElement.current.classList.add('setupShowRight');
                    showCommand.current = 'showRight';
                    break;
                }
                default: {
                    console.warn('Show type is invalid !');
                    overlayElement.current.classList.add('setupShowTop');
                    showCommand.current = 'showTop';
                    break;
                }
            }
        }
    }, [overlay === null || overlay === void 0 ? void 0 : overlay.config]);
    useEffect(() => {
        var _a, _b;
        if ((_a = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _a === void 0 ? void 0 : _a.id) {
            id.current = (_b = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _b === void 0 ? void 0 : _b.id;
        }
    }, [(_b = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _b === void 0 ? void 0 : _b.id]);
    useEffect(() => {
        var _a;
        setIsShow_((_a = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _a === void 0 ? void 0 : _a.isShow);
    }, [(_c = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _c === void 0 ? void 0 : _c.isShow]);
    useEffect(() => {
        if (overlayElement.current) {
            if (isShow_) {
                overlayElement.current.classList.add(showCommand.current);
            }
            else {
                overlayElement.current.classList.remove(showCommand.current);
            }
        }
    }, [isShow_]);
    useEffect(() => {
        var _a, _b;
        if (overlayElement.current) {
            if (((_a = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _a === void 0 ? void 0 : _a.isCenter) || ((_b = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _b === void 0 ? void 0 : _b.isCenter) === undefined) {
                overlayElement.current.classList.add('center');
            }
            else {
                overlayElement.current.classList.remove('center');
            }
        }
    }, [(_d = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _d === void 0 ? void 0 : _d.isCenter]);
    const handleClose = (e) => {
        var _a, _b, _c;
        if (e.target === e.currentTarget) {
            let isRemoveDefaultFunction = false;
            const TKS = Object.assign(Object.assign({}, TKS_Init), { name: (_a = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, data: {
                    isShow: false
                }, event: {
                    defaultEvent: e
                }, removeDefaultFunction() {
                    isRemoveDefaultFunction = true;
                } });
            ((_b = overlay === null || overlay === void 0 ? void 0 : overlay.event) === null || _b === void 0 ? void 0 : _b.onClose) && ((_c = overlay === null || overlay === void 0 ? void 0 : overlay.event) === null || _c === void 0 ? void 0 : _c.onClose(TKS));
            if (!isRemoveDefaultFunction) {
                setIsShow_(false);
            }
        }
    };
    return _jsx("div", Object.assign({ className: "TKS-Overlay", ref: overlayElement, onClick: (e) => handleClose(e) }, props, { children: props.children }));
};
export default React.memo(Overlay);

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
import React, { useEffect, useRef } from 'react';
import './styles.css';
import { OVERLAY_CONST } from 'const';
const Overlay = (_a) => {
    var { overlay, isShow, isCenter, onClose } = _a, props = __rest(_a, ["overlay", "isShow", "isCenter", "onClose"]);
    const overlayElement = useRef(null);
    const showCommand = useRef('showTop');
    useEffect(() => {
        if (overlayElement.current) {
            (overlay === null || overlay === void 0 ? void 0 : overlay.zIndex) && overlayElement.current.style.setProperty('--zIndex', `${overlay.zIndex}`);
            (overlay === null || overlay === void 0 ? void 0 : overlay.opacity_time) && overlayElement.current.style.setProperty('--opacity-time', `${overlay.opacity_time}`);
            (overlay === null || overlay === void 0 ? void 0 : overlay.show_time) && overlayElement.current.style.setProperty('--show-time', `${overlay.show_time}`);
            (overlay === null || overlay === void 0 ? void 0 : overlay.blear_rate) && overlayElement.current.style.setProperty('--blear-rate', `${overlay.blear_rate}`);
        }
    }, [overlay]);
    useEffect(() => {
        const showType = overlay === null || overlay === void 0 ? void 0 : overlay.show_type;
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
    }, [overlay]);
    useEffect(() => {
        if (overlayElement.current) {
            if (isShow) {
                overlayElement.current.classList.add(showCommand.current);
            }
            else {
                overlayElement.current.classList.remove(showCommand.current);
            }
        }
    }, [isShow]);
    useEffect(() => {
        if (overlayElement.current) {
            if (isCenter || isCenter === undefined) {
                overlayElement.current.classList.add('center');
            }
            else {
                overlayElement.current.classList.remove('center');
            }
        }
    }, [isCenter]);
    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose && onClose();
        }
    };
    return React.createElement("div", Object.assign({ className: "TKS-Overlay", ref: overlayElement, onClick: (e) => handleClick(e) }, props), props.children);
};
export default React.memo(Overlay);

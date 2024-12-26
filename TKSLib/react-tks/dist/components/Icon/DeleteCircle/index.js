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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useEffect } from 'react';
import './styles.css';
const DeleteCircle = (_a) => {
    var { deleteCircle } = _a, props = __rest(_a, ["deleteCircle"]);
    const deleteCircleElement = useRef(null);
    useEffect(() => {
        if (deleteCircleElement.current) {
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.size) && deleteCircleElement.current.style.setProperty('--size', `${deleteCircle.size}`);
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.background) && deleteCircleElement.current.style.setProperty('--background', `${deleteCircle.background}`);
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.fill) && deleteCircleElement.current.style.setProperty('--fill', `${deleteCircle.fill}`);
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.stroke) && deleteCircleElement.current.style.setProperty('--stroke', `${deleteCircle.stroke}`);
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.animation_time) && deleteCircleElement.current.style.setProperty('--animation-time', `${deleteCircle.animation_time}`);
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.stroke_width) && deleteCircleElement.current.style.setProperty('--stroke-width', `${deleteCircle.stroke_width}`);
        }
    }, [deleteCircle]);
    return _jsxs("svg", Object.assign({ className: "TKS-DeleteCircle", ref: deleteCircleElement, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, props, { children: [_jsx("circle", { cx: '12', cy: '12', r: '12' }), _jsx("path", { d: "M5,5 L19,19 Z M5,19 L19,5 Z" }), props.children] }));
};
export default React.memo(DeleteCircle);

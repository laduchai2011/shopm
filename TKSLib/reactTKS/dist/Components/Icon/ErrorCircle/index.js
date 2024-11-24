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
const ErrorCircle = (_a) => {
    var { errorCircle } = _a, props = __rest(_a, ["errorCircle"]);
    const errorCircleElement = useRef(null);
    useEffect(() => {
        if (errorCircleElement.current) {
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.size) && errorCircleElement.current.style.setProperty('--size', `${errorCircle.size}`);
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.background) && errorCircleElement.current.style.setProperty('--background', `${errorCircle.background}`);
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.fill) && errorCircleElement.current.style.setProperty('--fill', `${errorCircle.fill}`);
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.stroke) && errorCircleElement.current.style.setProperty('--stroke', `${errorCircle.stroke}`);
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.animation_time) && errorCircleElement.current.style.setProperty('--animation-time', `${errorCircle.animation_time}`);
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.stroke_width) && errorCircleElement.current.style.setProperty('--stroke-width', `${errorCircle.stroke_width}`);
        }
    }, [errorCircle]);
    return React.createElement("svg", Object.assign({ className: "TKS-ErrorCircle", ref: errorCircleElement, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("circle", { cx: '12', cy: '12', r: '12' }),
        React.createElement("path", { d: "M12,3 L12,16 Z M12,18 L12,19 Z" }),
        props.children);
};
export default React.memo(ErrorCircle);

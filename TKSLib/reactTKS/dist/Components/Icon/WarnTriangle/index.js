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
const WarnTriangle = (_a) => {
    var { warnTriangle } = _a, props = __rest(_a, ["warnTriangle"]);
    const warnTriangleElement = useRef(null);
    useEffect(() => {
        if (warnTriangleElement.current) {
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.size) && warnTriangleElement.current.style.setProperty('--size', `${warnTriangle.size}`);
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.background) && warnTriangleElement.current.style.setProperty('--background', `${warnTriangle.background}`);
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.fill) && warnTriangleElement.current.style.setProperty('--fill', `${warnTriangle.fill}`);
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.stroke) && warnTriangleElement.current.style.setProperty('--stroke', `${warnTriangle.stroke}`);
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.animation_time) && warnTriangleElement.current.style.setProperty('--animation-time', `${warnTriangle.animation_time}`);
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.stroke_width) && warnTriangleElement.current.style.setProperty('--stroke-width', `${warnTriangle.stroke_width}`);
        }
    }, [warnTriangle]);
    return React.createElement("svg", Object.assign({ className: "TKS-WarnTriangle", ref: warnTriangleElement, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("path", { d: "M1.608,18 L12,0 L22.4,18 Z M12,3 L12,13 Z M12,15 L12,16 Z" }),
        props.children);
};
export default React.memo(WarnTriangle);

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
const TickSymbol = (_a) => {
    var { tickSymbol } = _a, props = __rest(_a, ["tickSymbol"]);
    const tickSymbolElement = useRef(null);
    useEffect(() => {
        if (tickSymbolElement.current) {
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.size) && tickSymbolElement.current.style.setProperty('--size', `${tickSymbol.size}`);
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.background) && tickSymbolElement.current.style.setProperty('--background', `${tickSymbol.background}`);
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.fill) && tickSymbolElement.current.style.setProperty('--fill', `${tickSymbol.fill}`);
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.stroke) && tickSymbolElement.current.style.setProperty('--stroke', `${tickSymbol.stroke}`);
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.animation_time) && tickSymbolElement.current.style.setProperty('--animation-time', `${tickSymbol.animation_time}`);
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.stroke_width) && tickSymbolElement.current.style.setProperty('--stroke-width', `${tickSymbol.stroke_width}`);
        }
    }, [tickSymbol]);
    return React.createElement("svg", Object.assign({ className: "TKS-TickSymbol", ref: tickSymbolElement, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("circle", { cx: '12', cy: '12', r: '12' }),
        React.createElement("path", { d: "M7,11 L12,19 Z M12,18 L18,6 Z" }),
        props.children);
};
export default React.memo(TickSymbol);

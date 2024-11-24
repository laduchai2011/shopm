import React, { useEffect, useRef } from 'react';
import './styles.css';
const LineCircle = ({ lineCircleLoad }) => {
    const circleSize = lineCircleLoad.circleSize;
    const lineSize = lineCircleLoad.lineSize;
    const lineBackgroundColor = lineCircleLoad.lineBackgroundColor;
    const amplify = circleSize / 150;
    const r = (circleSize - lineSize) / 2;
    const myElementRef = useRef(null);
    useEffect(() => {
        if (myElementRef.current) {
            myElementRef.current.style.setProperty('--lineBackgroundColor', lineBackgroundColor);
            myElementRef.current.style.setProperty('--lineSize', `${lineSize}`);
            myElementRef.current.style.setProperty('--circleSize', `${circleSize}px`);
            myElementRef.current.style.setProperty('--amplify', `${amplify}`);
        }
    }, [circleSize, lineBackgroundColor, lineSize, amplify]);
    return React.createElement("div", { className: "TKS-Load-LineCircle", ref: myElementRef },
        React.createElement("svg", null,
            React.createElement("circle", { cx: `${circleSize / 2}`, cy: `${circleSize / 2}`, r: r })));
};
export default React.memo(LineCircle);

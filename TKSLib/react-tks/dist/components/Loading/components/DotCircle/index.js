import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import './styles.css';
import { $$ } from 'tricks';
const DotCircle = ({ dotCircleLoad }) => {
    useEffect(() => {
        const q_dots = $$('.TKS-Load-DotCircle-dot');
        for (let i = 0; i < q_dots.length; i++) {
            if (q_dots !== undefined) {
                const q_dot = q_dots[i];
                q_dot.style.setProperty('--dot-index', `${i + 1}`);
                q_dot.style.setProperty('--dotSize', dotCircleLoad.dotSize);
                q_dot.style.setProperty('--dotBackgroundColor', dotCircleLoad.dotBackgroundColor);
                q_dot.style.setProperty('--dotAmount', dotCircleLoad.dotAmount);
                q_dot.style.setProperty('--circleSize', `${dotCircleLoad.circleSize}px`);
            }
        }
    }, [dotCircleLoad]);
    const spanArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const list_dot = spanArr.map((data, index) => {
        return (_jsx("span", { className: 'TKS-Load-DotCircle-dot' }, index));
    });
    return _jsx("div", { className: "TKS-Load-DotCircle", children: _jsx("div", { children: list_dot }) });
};
export default React.memo(DotCircle);

import React, { FC, useEffect } from 'react';
import './styles.css';

import { LineCircleLoadProps } from 'define';

import { $ } from 'tricks';

const LineCircle: FC<{ lineCircleLoad: LineCircleLoadProps }> = ({ lineCircleLoad }) => {

    const circleSize: number = lineCircleLoad.circleSize;
    const lineSize: number = lineCircleLoad.lineSize;
    const lineBackgroundColor: string = lineCircleLoad.lineBackgroundColor;
    const amplify: number = circleSize / 150;
    const r = (circleSize - lineSize) / 2;

    useEffect(() => {
        const q_lineCircle = $('.TKS-Load-LineCircle') as HTMLElement;

        q_lineCircle.style.setProperty('--lineBackgroundColor', lineBackgroundColor);
        q_lineCircle.style.setProperty('--lineSize', `${lineSize}`);
        q_lineCircle.style.setProperty('--circleSize', `${circleSize}px`);
        q_lineCircle.style.setProperty('--amplify', `${amplify}`);
    }, [circleSize, lineBackgroundColor, lineSize, amplify])
    
    return <div className="TKS-Load-LineCircle">
        <svg>
            <circle cx={`${circleSize/2}`} cy={`${circleSize/2}`} r={r} />
        </svg>
    </div>
};

export default LineCircle;
import React, { FC, useEffect } from 'react';
import './styles.css';

import { DotCircleLoadProps } from 'src/define';

import { $$ } from 'src/tricks';

const DotCircle: FC<{dotCircleLoad: DotCircleLoadProps}> = ({ dotCircleLoad }) => {

    useEffect(() => {
        const q_dots = $$('.TKS-Load-DotCircle-dot');

        for (let i: number = 0; i < q_dots.length; i++) {
            if (q_dots!==undefined) {
                const q_dot = q_dots[i] as HTMLElement
                q_dot.style.setProperty('--dot-index', `${i+1}`);
                q_dot.style.setProperty('--dotSize', dotCircleLoad.dotSize);
                q_dot.style.setProperty('--dotBackgroundColor', dotCircleLoad.dotBackgroundColor);
                q_dot.style.setProperty('--dotAmount', dotCircleLoad.dotAmount);
                q_dot.style.setProperty('--circleSize', `${dotCircleLoad.circleSize}px`);
            }
        }
    }, [dotCircleLoad])

    const spanArr: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    const list_dot: React.ReactNode = spanArr.map((data: number, index: number) => {
       
        return (
            <span className='TKS-Load-DotCircle-dot' key={index} />
        )
    })

    return <div className="TKS-Load-DotCircle">
        <div>
            { list_dot }
        </div>
    </div>
};

export default React.memo(DotCircle);
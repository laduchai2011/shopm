import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { BigDownArrowProps } from 'src/define';


interface MyBigDownArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigDownArrow?: BigDownArrowProps,
    [key: string]: any
}

const BigDownArrow: FC<MyBigDownArrowProps> = ({bigDownArrow, className, ...props}) => {

    const bigDownArrowElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (bigDownArrowElement.current) {
            bigDownArrow?.fill && bigDownArrowElement.current.style.setProperty('--fill', `${bigDownArrow.fill}`);
            bigDownArrow?.stroke && bigDownArrowElement.current.style.setProperty('--stroke', `${bigDownArrow.stroke}`);
            bigDownArrow?.stroke_width && bigDownArrowElement.current.style.setProperty('--stroke-width', `${bigDownArrow.stroke_width}`);
        }    
    }, [bigDownArrow])

    return <svg 
        className={`TKS-BigDownArrow ${className || ''}`}
        ref={bigDownArrowElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"  
        preserveAspectRatio='none'
        {...props}
    >
        <path d="M0,0 L24,0 L24,24 L0,24 Z" />
        <path d="M0,0 L0,12 L12,24 L24,12 L24,0 L12,12 L0,0 Z" />
        <path d="M0,6 L12,18 L24,6 L12,18 L0,6 Z" />
        {props.children}
    </svg>;
};

export default React.memo(BigDownArrow);
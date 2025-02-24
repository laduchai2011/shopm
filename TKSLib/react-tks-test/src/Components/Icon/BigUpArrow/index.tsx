import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { BigUpArrowProps } from 'src/define';


interface MyBigUpArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigUpArrow?: BigUpArrowProps,
    [key: string]: any
}

const BigUpArrow: FC<MyBigUpArrowProps> = ({bigUpArrow, className, ...props}) => {

    const bigUpArrowElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (bigUpArrowElement.current) {
            bigUpArrow?.fill && bigUpArrowElement.current.style.setProperty('--fill', `${bigUpArrow.fill}`);
            bigUpArrow?.stroke && bigUpArrowElement.current.style.setProperty('--stroke', `${bigUpArrow.stroke}`);
            bigUpArrow?.stroke_width && bigUpArrowElement.current.style.setProperty('--stroke-width', `${bigUpArrow.stroke_width}`);
        }    
    }, [bigUpArrow])

    return <svg 
        className={`TKS-BigUpArrow ${className || ''}`}
        ref={bigUpArrowElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"  
        preserveAspectRatio='none'
        {...props}
    >
        <path d="M0,0 L24,0 L24,24 L0,24 Z" />
        <path d="M0,24 L0,12 L12,0 L24,12 L24,24 L12,12 L0,24 Z" />
        <path d="M0,18 L12,6 L24,18 L12,6 L12,6 Z" />
        {props.children}
    </svg>;
};

export default React.memo(BigUpArrow);
import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { BigLeftArrowProps } from 'src/define';


interface MyBigLeftArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigLeftArrow?: BigLeftArrowProps,
    [key: string]: any
}

const BigLeftArrow: FC<MyBigLeftArrowProps> = ({bigLeftArrow, className, ...props}) => {

    const bigLeftArrowElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (bigLeftArrowElement.current) {
            bigLeftArrow?.fill && bigLeftArrowElement.current.style.setProperty('--fill', `${bigLeftArrow.fill}`);
            bigLeftArrow?.stroke && bigLeftArrowElement.current.style.setProperty('--stroke', `${bigLeftArrow.stroke}`);
            bigLeftArrow?.stroke_width && bigLeftArrowElement.current.style.setProperty('--stroke-width', `${bigLeftArrow.stroke_width}`);
        }    
    }, [bigLeftArrow])

    return <svg 
        className={`TKS-BigLeftArrow ${className || ''}`}
        ref={bigLeftArrowElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"  
        preserveAspectRatio='none'
        {...props}
    >
        <path d="M0,0 L24,0 L24,24 L0,24 Z" />
        <path d="M12,0 L0,12 L12,24 L24,24 L12,12 L24,0 L12,0 Z" />
        <path d="M18,0 L6,12 L18,24 L6,12 L18,0 Z" />
        {props.children}
    </svg>;
};

export default React.memo(BigLeftArrow);
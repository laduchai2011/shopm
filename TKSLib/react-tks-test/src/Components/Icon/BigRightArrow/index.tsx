import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { BigRightArrowProps } from 'src/define';


interface MyBigRightArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigRightArrow?: BigRightArrowProps,
    [key: string]: any
}

const BigRightArrow: FC<MyBigRightArrowProps> = ({bigRightArrow, className, ...props}) => {

    const bigRightArrowElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (bigRightArrowElement.current) {
            bigRightArrow?.fill && bigRightArrowElement.current.style.setProperty('--fill', `${bigRightArrow.fill}`);
            bigRightArrow?.stroke && bigRightArrowElement.current.style.setProperty('--stroke', `${bigRightArrow.stroke}`);
            bigRightArrow?.stroke_width && bigRightArrowElement.current.style.setProperty('--stroke-width', `${bigRightArrow.stroke_width}`);
        }    
    }, [bigRightArrow])

    return <svg 
        className={`TKS-BigRightArrow ${className || ''}`}
        ref={bigRightArrowElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"  
        preserveAspectRatio='none'
        {...props}
    >
        <path d="M0,0 L24,0 L24,24 L0,24 Z" />
        <path d="M12,0 L24,12 L12,24 L0,24 L12,12 L0,0 L12,0 Z" />
        <path d="M6,0 L18,12 L6,24 L18,12 L6,0 Z" />
        {props.children}
    </svg>;
};

export default React.memo(BigRightArrow);
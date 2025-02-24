import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { SubCircleProps } from 'src/define';


interface MySubCircleProps extends React.HTMLProps<SVGSVGElement> {
    subCircle?: SubCircleProps,
    [key: string]: any
}

const SubCircle: FC<MySubCircleProps> = ({subCircle, className, ...props}) => {

    const subCircleElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (subCircleElement.current) {
            subCircle?.size && subCircleElement.current.style.setProperty('--size', `${subCircle.size}`);
            subCircle?.background && subCircleElement.current.style.setProperty('--background', `${subCircle.background}`);
            subCircle?.fill && subCircleElement.current.style.setProperty('--fill', `${subCircle.fill}`);
            subCircle?.stroke && subCircleElement.current.style.setProperty('--stroke', `${subCircle.stroke}`);
            subCircle?.animation_time && subCircleElement.current.style.setProperty('--animation-time', `${subCircle.animation_time}`);
            subCircle?.stroke_width && subCircleElement.current.style.setProperty('--stroke-width', `${subCircle.stroke_width}`);
        }    
    }, [subCircle])

    return <svg 
        className={`TKS-AddCircle ${className || ''}`}
        ref={subCircleElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx='12' cy='12' r='12' />
        <path d="M3,12 L21,12 Z"/>
        {props.children}
    </svg>;
};

export default React.memo(SubCircle);
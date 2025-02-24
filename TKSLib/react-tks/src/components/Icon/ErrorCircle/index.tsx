import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { ErrorCircleProps } from 'src/define';

interface MyErrorCircleProps extends React.HTMLProps<SVGSVGElement> {
    errorCircle?: ErrorCircleProps,
    [key: string]: any
}

const ErrorCircle: FC<MyErrorCircleProps> = ({errorCircle, className, ...props}) => {

    const errorCircleElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (errorCircleElement.current) {
            errorCircle?.size && errorCircleElement.current.style.setProperty('--size', `${errorCircle.size}`);
            errorCircle?.background && errorCircleElement.current.style.setProperty('--background', `${errorCircle.background}`);
            errorCircle?.fill && errorCircleElement.current.style.setProperty('--fill', `${errorCircle.fill}`);
            errorCircle?.stroke && errorCircleElement.current.style.setProperty('--stroke', `${errorCircle.stroke}`);
            errorCircle?.animation_time && errorCircleElement.current.style.setProperty('--animation-time', `${errorCircle.animation_time}`);
            errorCircle?.stroke_width && errorCircleElement.current.style.setProperty('--stroke-width', `${errorCircle.stroke_width}`);
        }    
    }, [errorCircle])

    return <svg 
        className={`TKS-ErrorCircle ${className || ''}`}
        ref={errorCircleElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx='12' cy='12' r='12' />
        <path d="M12,3 L12,16 Z M12,18 L12,19 Z"/>
        {props.children}
    </svg>;
};

export default React.memo(ErrorCircle);
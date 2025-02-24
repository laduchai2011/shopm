import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { AddCircleProps } from 'src/define';


interface MyAddCircleProps extends React.HTMLProps<SVGSVGElement> {
    addCircle?: AddCircleProps,
    [key: string]: any
}

const AddCircle: FC<MyAddCircleProps> = ({addCircle, className, ...props}) => {

    const addCircleElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (addCircleElement.current) {
            addCircle?.size && addCircleElement.current.style.setProperty('--size', `${addCircle.size}`);
            addCircle?.background && addCircleElement.current.style.setProperty('--background', `${addCircle.background}`);
            addCircle?.fill && addCircleElement.current.style.setProperty('--fill', `${addCircle.fill}`);
            addCircle?.stroke && addCircleElement.current.style.setProperty('--stroke', `${addCircle.stroke}`);
            addCircle?.animation_time && addCircleElement.current.style.setProperty('--animation-time', `${addCircle.animation_time}`);
            addCircle?.stroke_width && addCircleElement.current.style.setProperty('--stroke-width', `${addCircle.stroke_width}`);
        }    
    }, [addCircle])

    return <svg 
        className={`TKS-AddCircle ${className || ''}`}
        ref={addCircleElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx='12' cy='12' r='12' />
        <path d="M12,3 L12,21 Z M3,12 L21,12 Z"/>
        {props.children}
    </svg>;
};

export default React.memo(AddCircle);
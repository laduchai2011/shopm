import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { DeleteCircleProps } from 'define';

const DeleteCircle: FC<{ deleteCircle?: DeleteCircleProps }> = ({ deleteCircle }) => {

    const deleteCircleElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (deleteCircleElement.current) {
            deleteCircle?.size && deleteCircleElement.current.style.setProperty('--size', `${deleteCircle.size}`);
            deleteCircle?.background && deleteCircleElement.current.style.setProperty('--background', `${deleteCircle.background}`);
            deleteCircle?.fill && deleteCircleElement.current.style.setProperty('--fill', `${deleteCircle.fill}`);
            deleteCircle?.stroke && deleteCircleElement.current.style.setProperty('--stroke', `${deleteCircle.stroke}`);
            deleteCircle?.animation_time && deleteCircleElement.current.style.setProperty('--animation-time', `${deleteCircle.animation_time}`);
            deleteCircle?.stroke_width && deleteCircleElement.current.style.setProperty('--stroke-width', `${deleteCircle.stroke_width}`);
        }    
    }, [deleteCircle])

    return <svg 
        className="TKS-DeleteCircle"
        ref={deleteCircleElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx='12' cy='12' r='12' />
        <path d="M5,5 L19,19 Z M5,19 L19,5 Z"/>
    </svg>;
};

export default DeleteCircle;
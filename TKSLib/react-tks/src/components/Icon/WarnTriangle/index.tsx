import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { WarnTriangleProps } from 'src/define';

interface MyWarnTriangleProps extends React.HTMLProps<SVGSVGElement> {
    warnTriangle?: WarnTriangleProps;
    [key: string]: any;
}

const WarnTriangle: FC<MyWarnTriangleProps> = ({warnTriangle, className, ...props}) => {

    const warnTriangleElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (warnTriangleElement.current) {
            warnTriangle?.size && warnTriangleElement.current.style.setProperty('--size', `${warnTriangle.size}`);
            warnTriangle?.background && warnTriangleElement.current.style.setProperty('--background', `${warnTriangle.background}`);
            warnTriangle?.fill && warnTriangleElement.current.style.setProperty('--fill', `${warnTriangle.fill}`);
            warnTriangle?.stroke && warnTriangleElement.current.style.setProperty('--stroke', `${warnTriangle.stroke}`);
            warnTriangle?.animation_time && warnTriangleElement.current.style.setProperty('--animation-time', `${warnTriangle.animation_time}`);
            warnTriangle?.stroke_width && warnTriangleElement.current.style.setProperty('--stroke-width', `${warnTriangle.stroke_width}`);
        }    
    }, [warnTriangle])

    return <svg 
        className={`TKS-WarnTriangle ${className || ''}`}
        ref={warnTriangleElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M1.608,18 L12,0 L22.4,18 Z M12,3 L12,13 Z M12,15 L12,16 Z"/>
        {props.children}
    </svg>;
};

export default React.memo(WarnTriangle);
import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import { TickSymbolProps } from 'src/define';

interface MyTickSymbolProps extends React.HTMLProps<SVGSVGElement> {
    tickSymbol?: TickSymbolProps;
    [key: string]: any;
}

const TickSymbol: FC<MyTickSymbolProps> = ({tickSymbol, className, ...props}) => {

    const tickSymbolElement = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (tickSymbolElement.current) {
            tickSymbol?.size && tickSymbolElement.current.style.setProperty('--size', `${tickSymbol.size}`);
            tickSymbol?.background && tickSymbolElement.current.style.setProperty('--background', `${tickSymbol.background}`);
            tickSymbol?.fill && tickSymbolElement.current.style.setProperty('--fill', `${tickSymbol.fill}`);
            tickSymbol?.stroke && tickSymbolElement.current.style.setProperty('--stroke', `${tickSymbol.stroke}`);
            tickSymbol?.animation_time && tickSymbolElement.current.style.setProperty('--animation-time', `${tickSymbol.animation_time}`);
            tickSymbol?.stroke_width && tickSymbolElement.current.style.setProperty('--stroke-width', `${tickSymbol.stroke_width}`);
        }    
    }, [tickSymbol])

    return <svg 
        className={`TKS-TickSymbol ${className || ''}`}
        ref={tickSymbolElement}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx='12' cy='12' r='12' />
        <path d="M7,11 L12,19 Z M12,18 L18,6 Z"/>
        {props.children}
    </svg>;
};

export default React.memo(TickSymbol);
import React, { FC } from 'react';
import './styles.css';

import { ThreeDotVerticalProps } from 'src/define';


interface MyThreeDotHorizontalProps extends React.HTMLProps<SVGSVGElement> {
    threeDotVertical?: ThreeDotVerticalProps,
    [key: string]: any
}

const ThreeDotVertical: FC<MyThreeDotHorizontalProps> = ({threeDotVertical, className, ...props}) => {

    return <svg 
        className={`TKS-ThreeDotVertical ${className || ''}`}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"  
        preserveAspectRatio='none'
        {...props}
    >
        <circle r="2" cx="12" cy="6" fill="black" />
        <circle r="2" cx="12" cy="12" fill="black" />
        <circle r="2" cx="12" cy="18" fill="black" />
        {props.children}
    </svg>;
};

export default React.memo(ThreeDotVertical);
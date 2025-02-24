import React, { FC } from 'react';
import './styles.css';

import { ThreeDotHorizontalProps } from 'src/define';


interface MyThreeDotHorizontalProps extends React.HTMLProps<SVGSVGElement> {
    threeDotHorizontal?: ThreeDotHorizontalProps,
    [key: string]: any
}

const ThreeDotHorizontal: FC<MyThreeDotHorizontalProps> = ({threeDotHorizontal, className, ...props}) => {

    return <svg 
        className={`TKS-ThreeDotHorizontal ${className || ''}`}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"  
        preserveAspectRatio='none'
        {...props}
    >
        <circle r="2" cx="6" cy="12" fill="black" />
        <circle r="2" cx="12" cy="12" fill="black" />
        <circle r="2" cx="18" cy="12" fill="black" />
        {props.children}
    </svg>;
};

export default React.memo(ThreeDotHorizontal);
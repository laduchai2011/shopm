import React from 'react';
import './styles.css';
import { ErrorCircleProps } from 'define';
interface MyErrorCircleProps extends React.HTMLProps<SVGSVGElement> {
    errorCircle?: ErrorCircleProps;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MyErrorCircleProps>;
export default _default;

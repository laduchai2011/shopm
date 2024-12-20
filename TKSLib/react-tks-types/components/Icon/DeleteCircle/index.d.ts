import React from 'react';
import './styles.css';
import { DeleteCircleProps } from 'define';
interface MyDeleteCircleProps extends React.HTMLProps<SVGSVGElement> {
    deleteCircle?: DeleteCircleProps;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MyDeleteCircleProps>;
export default _default;

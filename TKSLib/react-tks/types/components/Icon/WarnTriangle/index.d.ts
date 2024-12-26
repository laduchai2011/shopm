import React from 'react';
import './styles.css';
import { WarnTriangleProps } from 'define';
interface MyWarnTriangleProps extends React.HTMLProps<SVGSVGElement> {
    warnTriangle?: WarnTriangleProps;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MyWarnTriangleProps>;
export default _default;

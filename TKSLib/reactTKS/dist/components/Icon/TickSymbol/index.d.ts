import React from 'react';
import './styles.css';
import { TickSymbolProps } from 'define';
interface MyTickSymbolProps extends React.HTMLProps<SVGSVGElement> {
    tickSymbol?: TickSymbolProps;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MyTickSymbolProps>;
export default _default;

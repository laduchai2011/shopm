import React from 'react';
import './styles.css';
import { OverlayProps } from 'define';
interface MyOverlayProps extends React.HTMLProps<HTMLDivElement> {
    overlay?: OverlayProps;
    isShow?: boolean;
    isCenter?: boolean;
    onClose?: () => void;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MyOverlayProps>;
export default _default;

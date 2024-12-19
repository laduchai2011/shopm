import React from 'react';
import './styles.css';
import { DialogProps } from 'define';
interface MyDialogProps extends React.HTMLProps<HTMLDivElement> {
    dialog?: DialogProps;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MyDialogProps>;
export default _default;

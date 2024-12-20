import React from 'react';
import './styles.css';
import { ToastMessageProps } from 'define';
interface MyToastMessageProps extends React.HTMLProps<HTMLDivElement> {
    toastMessage?: ToastMessageProps;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MyToastMessageProps>;
export default _default;

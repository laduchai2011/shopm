import React from 'react';
import './styles.css';
import { DialogProps } from 'define';
interface MyDialogProps extends React.HTMLProps<HTMLDivElement> {
    dialog?: DialogProps;
    message?: string;
    isShow?: boolean;
    onClose?: () => void;
    onClickButton1?: (e: React.MouseEvent) => void;
    onClickButton2?: (e: React.MouseEvent) => void;
    onClickButton3?: (e: React.MouseEvent) => void;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MyDialogProps>;
export default _default;

import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import DeleteCircle from 'Components/Icon/DeleteCircle';
import TickSymbol from 'Components/Icon/TickSymbol';
import WarnTriangle from 'Components/Icon/WarnTriangle';
import ErrorCircle from 'Components/Icon/ErrorCircle';

import { DialogProps } from 'define';
import { DIALOG_CONST } from 'const';

interface MyDialogProps extends React.HTMLProps<HTMLDivElement> {
    dialog?: DialogProps;
    message?: string;
    isShow?: boolean;
    onClose?: () => void,
    onClickButton1?: (e: React.MouseEvent) => void,
    onClickButton2?: (e: React.MouseEvent) => void,
    onClickButton3?: (e: React.MouseEvent) => void,
    [key: string]: any;
}

const Dialog: FC<MyDialogProps> = ({
    dialog, 
    message, 
    isShow, 
    onClickButton1,
    onClickButton2,
    onClickButton3,
    onClose, 
    ...props
}) => {
    const dialogElement = useRef<HTMLDivElement | null>(null);
    const showCommand = useRef<string>('show'); 
    const showTime = useRef<number>(0.3); 
    const messageType = useRef<string | undefined>(undefined);
    const activate_button_1 = useRef<boolean | undefined>(undefined);
    const activate_button_2 = useRef<boolean | undefined>(undefined);
    const activate_button_3 = useRef<boolean | undefined>(undefined);
    const button_1_name = useRef<string | undefined>(undefined);
    const button_2_name = useRef<string | undefined>(undefined);
    const button_3_name = useRef<string | undefined>(undefined);


    messageType.current = dialog?.message_type;

    activate_button_1.current = dialog?.activate_button_1;
    activate_button_2.current = dialog?.activate_button_2;
    activate_button_3.current = dialog?.activate_button_3;
    button_1_name.current = dialog?.button_1_name;
    button_2_name.current = dialog?.button_2_name;
    button_3_name.current = dialog?.button_3_name;

    // set default button
    if (dialog?.activate_button_1===true || dialog?.activate_button_1===undefined) {
        activate_button_1.current = true;
    } 
    if (dialog?.activate_button_3===true || dialog?.activate_button_3===undefined) {
        activate_button_3.current = true;
    } 
    if (dialog?.button_1_name===undefined) {
        button_1_name.current = 'Button 1';
    } 
    if (dialog?.button_2_name===undefined) {
        button_2_name.current = 'Button 2';
    } 
    if (dialog?.button_3_name===undefined) {
        button_3_name.current = 'Button 3';
    } 

    useEffect(() => {
        if (dialogElement.current) {
            dialog?.opacity_time && dialogElement.current.style.setProperty('--opacity-time', `${dialog.opacity_time}`);
            dialog?.show_time && dialogElement.current.style.setProperty('--show-time', `${dialog.show_time}`) /*NOT USE*/
            if (dialog?.show_time) {
                showTime.current = dialog.show_time;
            }
        }
    }, [dialog])

    useEffect(() => {
        if (dialogElement.current) {
            if (isShow) {
                dialogElement.current.style.display = 'block';
                const interval_display = setInterval(() => {
                    if (dialogElement.current) {
                        dialogElement.current.classList.add(showCommand.current);
                    }
                    clearInterval(interval_display);
                }, 0)
                
            } else {
                dialogElement.current.classList.remove(showCommand.current);
                const interval_display = setInterval(() => {
                    if (dialogElement.current) {
                        dialogElement.current.style.display = 'none';
                    }
                    clearInterval(interval_display);
                }, showTime.current*1000)
            }
        } 
    }, [isShow])

    const handleDelete = () : void => {
        onClose && onClose();
    }

    const handleButton1Click = (e: React.MouseEvent) => {
        onClickButton1 && onClickButton1(e);
    }
    const handleButton2Click = (e: React.MouseEvent) => {
        onClickButton2 && onClickButton2(e);
    }
    const handleButton3Click = (e: React.MouseEvent) => {
        onClickButton3 && onClickButton3(e);
    }

    return <div className="TKS-Dialog" {...props} ref={dialogElement}>
        <div>
            <DeleteCircle deleteCircle={{size: 22}} onClick={() => handleDelete()} />
        </div>
        <div>
            <div>{message}</div>
            { messageType.current===DIALOG_CONST.MESSAGE_TYPE.SUCCESS && <div><TickSymbol /></div> }
            { messageType.current===DIALOG_CONST.MESSAGE_TYPE.WARN && <div><WarnTriangle /></div> }
            { messageType.current===DIALOG_CONST.MESSAGE_TYPE.ERROR && <div><ErrorCircle /></div> }
        </div>
        <div>
            { activate_button_1.current && <button className='TKS-Dialog-botton1' onClick={(e) => handleButton1Click(e)}>{ button_1_name.current }</button> }
            { activate_button_2.current && <button className='TKS-Dialog-botton2' onClick={(e) => handleButton2Click(e)}>{ button_2_name.current }</button> }
            { activate_button_3.current && <button className='TKS-Dialog-botton3' onClick={(e) => handleButton3Click(e)}>{ button_3_name.current }</button> }
        </div>
        <div>{props.children}</div>
    </div>;
};

export default React.memo(Dialog);
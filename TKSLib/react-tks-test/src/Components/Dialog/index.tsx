import React, { FC, useRef, useEffect, useId } from 'react';
import './styles.css';

import DeleteCircle from 'Components/Icon/DeleteCircle';
import TickSymbol from 'Components/Icon/TickSymbol';
import WarnTriangle from 'Components/Icon/WarnTriangle';
import ErrorCircle from 'Components/Icon/ErrorCircle';

import { TKSProps, DialogProps } from 'define';
import { DIALOG_CONST } from 'const';

interface MyDialogProps extends React.HTMLProps<HTMLDivElement> {
    dialog?: DialogProps;
    [key: string]: any;
}

const Dialog: FC<MyDialogProps> = ({
    dialog,
    ...props
}) => {

    const id = useRef<string>(`Dialog__T: ${useId()}`);

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

    messageType.current = dialog?.data?.message_type;

    activate_button_1.current = dialog?.config?.activate_button_1;
    activate_button_2.current = dialog?.config?.activate_button_2;
    activate_button_3.current = dialog?.config?.activate_button_3;
    button_1_name.current = dialog?.config?.button_1_name;
    button_2_name.current = dialog?.config?.button_2_name;
    button_3_name.current = dialog?.config?.button_3_name;

    // set default button
    if (dialog?.config?.activate_button_1===true || dialog?.config?.activate_button_1===undefined) {
        activate_button_1.current = true;
    } 
    if (dialog?.config?.activate_button_3===true || dialog?.config?.activate_button_3===undefined) {
        activate_button_3.current = true;
    } 
    if (dialog?.config?.button_1_name===undefined) {
        button_1_name.current = 'Button 1';
    } 
    if (dialog?.config?.button_2_name===undefined) {
        button_2_name.current = 'Button 2';
    } 
    if (dialog?.config?.button_3_name===undefined) {
        button_3_name.current = 'Button 3';
    } 

    useEffect(() => {
        if (dialog?.config?.id) {
            id.current = dialog?.config?.id;
        }
    }, [dialog?.config?.id])

    useEffect(() => {
        if (dialogElement.current) {
            dialog?.config?.opacity_time && dialogElement.current.style.setProperty('--opacity-time', `${dialog?.config.opacity_time}`);
            dialog?.config?.show_time && dialogElement.current.style.setProperty('--show-time', `${dialog?.config.show_time}`) /*NOT USE*/
            dialog?.config?.button_font_size && dialogElement.current.style.setProperty('--button-font-size', `${dialog?.config.button_font_size}`);
            dialog?.config?.button_min_width && dialogElement.current.style.setProperty('--button-min-width', `${dialog?.config.button_min_width}`);
            if (dialog?.config?.show_time) {
                showTime.current = dialog?.config.show_time;
            }
        }
    }, [dialog?.config])

    useEffect(() => {
        if (dialogElement.current) {
            dialog?.data?.message_color && dialogElement.current.style.setProperty('--message-color', `${dialog?.data?.message_color}`)
        }
    }, [dialog?.data])

    useEffect(() => {
        if (dialogElement.current) {
            if (dialog?.control?.isShow) {
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
    }, [dialog?.control?.isShow])

    const handleDelete = (e: React.MouseEvent) : void => {
        const TKS: TKSProps = {
            name: dialog?.config?.name,
            id: id.current,
            event: {
                defaultEvent: e
            }
        }
        dialog?.event?.onClose && dialog?.event?.onClose(TKS);
    }

    const handleButton1Click = (e: React.MouseEvent) => {
        const TKS: TKSProps = {
            name: dialog?.config?.name,
            id: id.current,
            event: {
                defaultEvent: e
            }
        }
        dialog?.event?.onClickButton1 && dialog?.event?.onClickButton1(TKS);
    }
    const handleButton2Click = (e: React.MouseEvent) => {
        const TKS: TKSProps = {
            name: dialog?.config?.name,
            id: id.current,
            event: {
                defaultEvent: e
            }
        }
        dialog?.event?.onClickButton2 && dialog?.event?.onClickButton2(TKS);
    }
    const handleButton3Click = (e: React.MouseEvent) => {
        const TKS: TKSProps = {
            name: dialog?.config?.name,
            id: id.current,
            event: {
                defaultEvent: e
            }
        }
        dialog?.event?.onClickButton3 && dialog?.event?.onClickButton3(TKS);
    }

    return <div className="TKS-Dialog" {...props} ref={dialogElement}>
        <div>
            <DeleteCircle deleteCircle={{size: 22}} onClick={(e) => handleDelete(e)} />
        </div>
        <div>
            <div>{dialog?.data?.message}</div>
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
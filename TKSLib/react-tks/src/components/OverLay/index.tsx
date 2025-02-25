import React, { FC, useEffect, useRef, useState, useId } from 'react';
import './styles.css';

import { TKSProps, TKS_Init, OverlayProps } from 'src/define';

import { OVERLAY_CONST } from 'src/const';

interface MyOverlayProps extends React.HTMLProps<HTMLDivElement> {
    overlay?: OverlayProps,
    [key: string]: any
}

const Overlay: FC<MyOverlayProps> = ({overlay, className, ...props}) => {

    const overlayElement = useRef<HTMLDivElement | null>(null);
    const showCommand = useRef<string>('showTop'); 

    const id = useRef<string>(`Dialog__T: ${useId()}`);
    const [isShow_, setIsShow_] = useState<boolean | undefined>();

    useEffect(() => {
        if (overlayElement.current) {
            overlay?.config?.zIndex && overlayElement.current.style.setProperty('--zIndex', `${overlay.config.zIndex}`);
            overlay?.config?.opacity_time && overlayElement.current.style.setProperty('--opacity-time', `${overlay.config.opacity_time}`);
            overlay?.config?.show_time && overlayElement.current.style.setProperty('--show-time', `${overlay.config.show_time}`);
            overlay?.config?.blear_rate && overlayElement.current.style.setProperty('--blear-rate', `${overlay.config.blear_rate}`);
        }    
    }, [overlay?.config])

    useEffect(() => {
        const showType: string | undefined = overlay?.config?.show_type;
        if (overlayElement.current) {

            // remove all
            overlayElement.current.classList.remove('setupShowTop');
            overlayElement.current.classList.remove('showTop');
            overlayElement.current.classList.remove('setupShowBottom');
            overlayElement.current.classList.remove('showBottom');
            overlayElement.current.classList.remove('setupShowLeft');
            overlayElement.current.classList.remove('showLeft');
            overlayElement.current.classList.remove('setupShowRight');
            overlayElement.current.classList.remove('showRight');

            switch(showType) { 
                case undefined: { 
                    overlayElement.current.classList.add('setupShowTop');
                    showCommand.current = 'showTop';
                    break; 
                } 
                case OVERLAY_CONST.SHOW_TYPE.SHOW_TOP: { 
                    overlayElement.current.classList.add('setupShowTop');
                    showCommand.current = 'showTop';
                    break; 
                } 
                case OVERLAY_CONST.SHOW_TYPE.SHOW_BOTTOM: { 
                    overlayElement.current.classList.add('setupShowBottom');
                    showCommand.current = 'showBottom';
                    break; 
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_LEFT: { 
                    overlayElement.current.classList.add('setupShowLeft');
                    showCommand.current = 'showLeft';
                    break; 
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_RIGHT: { 
                    overlayElement.current.classList.add('setupShowRight');
                    showCommand.current = 'showRight';
                    break; 
                }
                default: { 
                    console.warn('Show type is invalid !');
                    overlayElement.current.classList.add('setupShowTop');
                    showCommand.current = 'showTop';
                    break; 
                } 
            } 
        } 
        
    }, [overlay?.config])

    useEffect(() => {
        if (overlay?.config?.id) {
            id.current = overlay?.config?.id;
        }
    }, [overlay?.config?.id])

    useEffect(() => {
        setIsShow_(overlay?.control?.isShow);
    }, [overlay?.control?.isShow])

    useEffect(() => {
        if (overlayElement.current) {
            if (isShow_) {
                overlayElement.current.classList.add(showCommand.current);
            } else {
                overlayElement.current.classList.remove(showCommand.current);
            }
        } 
    }, [isShow_])

    useEffect(() => {
        if (overlayElement.current) {
            if (overlay?.control?.isCenter || overlay?.control?.isCenter===undefined) {
                overlayElement.current.classList.add('center');
            } else {
                overlayElement.current.classList.remove('center');
            }
        } 
    }, [overlay?.control?.isCenter])

    const handleClose = (e: React.MouseEvent) : void => {
        if (e.target === e.currentTarget) {
            let isRemoveDefaultFunction = false;
            const TKS: TKSProps = {
                ...TKS_Init,
                name: overlay?.config?.name,
                id: id.current,
                data: {
                    isShow: false
                },
                event: {
                    defaultEvent: e
                },
                removeDefaultFunction(): void {
                    isRemoveDefaultFunction = true;
                },
            }
            overlay?.event?.onClose && overlay?.event?.onClose(TKS);
            if (!isRemoveDefaultFunction) {
                setIsShow_(false);
            }
        }
    }

    return <div 
        className={`TKS-Overlay ${className || ''}`}
        ref={overlayElement}
        onClick={(e) => handleClose(e)}
        {...props}
    >
        {props.children}
    </div>;
};

export default React.memo(Overlay);
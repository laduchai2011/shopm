import React, { FC, useEffect, useRef } from 'react';
import './styles.css';

import { OverlayProps } from 'define';

import { OVERLAY_CONST } from 'const';

interface MyOverlayProps extends React.HTMLProps<HTMLDivElement> {
    overlay?: OverlayProps;
    isShow?: boolean;
    isCenter?: boolean;
    [key: string]: any;
}

const Overlay: FC<MyOverlayProps> = ({overlay, isShow, isCenter, ...props}) => {

    const overlayElement = useRef<HTMLDivElement | null>(null);
    const showCommand = useRef<string>('showTop'); 

    useEffect(() => {
        if (overlayElement.current) {
            overlay?.zIndex && overlayElement.current.style.setProperty('--zIndex', `${overlay.zIndex}`);
            overlay?.opacity_time && overlayElement.current.style.setProperty('--opacity-time', `${overlay.opacity_time}`);
            overlay?.show_time && overlayElement.current.style.setProperty('--show-time', `${overlay.show_time}`);
            overlay?.blear_rate && overlayElement.current.style.setProperty('--blear-rate', `${overlay.blear_rate}`);
        }    
    }, [overlay])

    useEffect(() => {
        const showType: string | undefined = overlay?.show_type;
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
        
    }, [overlay])

    useEffect(() => {
        if (overlayElement.current) {
            if (isShow) {
                overlayElement.current.classList.add(showCommand.current);
            } else {
                overlayElement.current.classList.remove(showCommand.current);
            }
        } 
    }, [isShow])

    useEffect(() => {
        if (overlayElement.current) {
            if (isCenter || isCenter===undefined) {
                overlayElement.current.classList.add('center');
            } else {
                overlayElement.current.classList.remove('center');
            }
        } 
    }, [isCenter])

    const handleClick = () : void => {
        if (overlayElement.current) {
            overlayElement.current.classList.remove(showCommand.current);
        }
    }

    return <div 
        className="TKS-Overlay"
        ref={overlayElement}
        onClick={() => handleClick()}
        {...props}
    >
        {props.children}
    </div>;
};

export default Overlay;
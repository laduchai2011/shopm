import React, { FC, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import MessageBox from './components/MessageBox';

import { ToastMessageProps } from 'define';

import { handleCutPXInString } from 'utils';

interface CreateElementProps {
    message: string
}

const ToastMessage: FC<{ 
    toastMessage?: ToastMessageProps, 
    onData?: (toastMessages: ToastMessageProps[] | []) => void
}> = ({ toastMessage, onData }) => {

    const toastMessageElement = useRef<HTMLDivElement | null>(null);
    const toastMessageContainerElement = useRef<HTMLDivElement | null>(null);

    const [allData, setAllData] = useState<ToastMessageProps[]>([]);

    const distanceMessageBoxs = 60;

    useEffect(() => {

        const cp_allData: ToastMessageProps[] = [...allData];
        if (toastMessage) {
            cp_allData.unshift(toastMessage);
            setAllData(cp_allData);

            if (toastMessageContainerElement.current) { 
                const messageBoxElements: any = toastMessageContainerElement.current.children;

                if (messageBoxElements) {
                    for (let i: number = 0; i < messageBoxElements.length; i++) {
                        if (messageBoxElements[i].children) { 
                            const pre_top = messageBoxElements[i].children[0].style.top;
                            const old_top: number = Number(handleCutPXInString(pre_top));
                            messageBoxElements[i].children[0].style.top = `${old_top + distanceMessageBoxs}px`;

                            if (i > 4) {
                                messageBoxElements[i].children[0].style.opacity = '0';
                            }

                            if (i > 2) {
                                messageBoxElements[i].remove();
                            }
                        }
                    }
                    createElement({message: toastMessage.message});
                }
            }
        }

        // eslint-disable-next-line
    }, [toastMessage])

    useEffect(() => {
        onData && onData(allData);
    }, [allData, onData])

    const createElement = (createElement: CreateElementProps) : void => {
        const element = React.createElement(MessageBox, { index: 1, type: 'SUCCESS', message: createElement.message})
        const newNode = document.createElement('div');
        newNode.style.width = '300px'
        ReactDOM.createRoot(newNode).render(element); 
        toastMessageContainerElement.current?.insertBefore(newNode, toastMessageContainerElement.current.firstChild)
    }

    return <div className="TKS-ToastMessage" ref={toastMessageElement}>
        <div className='TKS-ToastMessage-Container' ref={toastMessageContainerElement}>
        </div>
    </div>;
};

export default React.memo(ToastMessage);
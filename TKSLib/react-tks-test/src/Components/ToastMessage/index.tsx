import React, { FC } from 'react';
import './styles.css';

import MessageBox from './components/MessageBox';

const ToastMessage: FC<{ }> = () => {

    const list_message: React.ReactNode = [0, 1].map((data: any, index: number) => {
        return (
            <MessageBox key={index} index={index} type='success' data={data} />
        )
    })

    return <div className="TKS-ToastMessage">
        <div className='TKS-ToastMessage-Container'>
            { list_message }
        </div>
    </div>;
};

export default ToastMessage;
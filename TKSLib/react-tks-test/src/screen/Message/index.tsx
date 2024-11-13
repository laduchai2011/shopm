import React, { FC } from 'react';
import './styles.css';

import ToastMessage from 'Components/ToastMessage';

const Message: FC<{}> = () => {

    return <div className="TKS-Message">
        <ToastMessage />
    </div>;
};

export default Message;
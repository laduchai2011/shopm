import React, { FC } from 'react';
import './styles.css';

import WarnTriangle from '@components/Icon/WarnTriangle';
import ErrorCircle from '@components/Icon/ErrorCircle';
import TickSymbol from '@components/Icon/TickSymbol';
import DeleteCircle from '@components/Icon/DeleteCircle';

const IconScreen: FC<{}> = () => {

    return <div className="TKS-IconScreen">
        <WarnTriangle />
        <ErrorCircle />
        <TickSymbol />
        <DeleteCircle />
    </div>;
};

export default IconScreen;
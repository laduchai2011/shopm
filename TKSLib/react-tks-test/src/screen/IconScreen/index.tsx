import React, { FC } from 'react';
import './styles.css';

import WarnTriangle from 'Components/Icon/WarnTriangle';
import ErrorCircle from 'Components/Icon/ErrorCircle';
import TickSymbol from 'Components/Icon/TickSymbol';
import DeleteCircle from 'Components/Icon/DeleteCircle';

const IconScreen: FC<{}> = () => {

    return <div className="TKS-IconScreen">
        <WarnTriangle />
        <ErrorCircle />
        <TickSymbol />
        <DeleteCircle />
    </div>;
};

export default IconScreen;
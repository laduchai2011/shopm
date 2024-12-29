import React, { FC } from 'react';
import './styles.css';

import WarnTriangle from 'src/components/Icon/WarnTriangle';
import ErrorCircle from 'src/components/Icon/ErrorCircle';
import TickSymbol from 'src/components/Icon/TickSymbol';
import DeleteCircle from 'src/components/Icon/DeleteCircle';

const IconScreen: FC<{}> = () => {

    return <div className="TKS-IconScreen">
        <WarnTriangle />
        <ErrorCircle />
        <TickSymbol />
        <DeleteCircle />
    </div>;
};

export default IconScreen;
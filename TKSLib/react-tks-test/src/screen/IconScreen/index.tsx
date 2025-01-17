import React, { FC } from 'react';
import './styles.css';

import WarnTriangle from 'src/components/Icon/WarnTriangle';
import ErrorCircle from 'src/components/Icon/ErrorCircle';
import TickSymbol from 'src/components/Icon/TickSymbol';
import DeleteCircle from 'src/components/Icon/DeleteCircle';
import AddCircle from 'src/components/Icon/AddCircle';
import SubCircle from 'src/components/Icon/SubCircle';

const IconScreen: FC<{}> = () => {

    return <div className="TKS-IconScreen">
        <WarnTriangle />
        <ErrorCircle />
        <TickSymbol />
        <DeleteCircle />
        <AddCircle />
        <SubCircle />
    </div>;
};

export default IconScreen;
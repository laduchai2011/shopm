import React, { FC } from 'react';
import './styles.css';

import WarnTriangle from 'src/components/Icon/WarnTriangle';
import ErrorCircle from 'src/components/Icon/ErrorCircle';
import TickSymbol from 'src/components/Icon/TickSymbol';
import DeleteCircle from 'src/components/Icon/DeleteCircle';
import AddCircle from 'src/components/Icon/AddCircle';
import SubCircle from 'src/components/Icon/SubCircle';
import BigLeftArrow from 'src/components/Icon/BigLeftArrow';
import BigRightArrow from 'src/components/Icon/BigRightArrow';
import BigDownArrow from 'src/components/Icon/BigDownArrow';
import BigUpArrow from 'src/components/Icon/BigUpArrow';
import ThreeDotHorizontal from 'src/components/Icon/ThreeDotHorizontal';
import ThreeDotVertical from 'src/components/Icon/ThreeDotVertical';

const IconScreen: FC<{}> = () => {

    return <div className="TKS-IconScreen">
        <WarnTriangle />
        <ErrorCircle />
        <TickSymbol />
        <DeleteCircle />
        <AddCircle />
        <SubCircle />
        <BigLeftArrow />
        <BigRightArrow />
        <BigDownArrow />
        <div style={{
            margin: '10px'
        }}>
            <BigUpArrow />
        </div>
        <div><ThreeDotHorizontal /></div>
        <div><ThreeDotVertical /></div>
    </div>;
};

export default IconScreen;
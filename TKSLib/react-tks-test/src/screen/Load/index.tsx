import React, { FC } from 'react';
import './styles.css';

import Loading from 'src/components/Loading';

import { 
    LoadProps,
    // DotCircleLoadProps,
    LineCircleLoadProps,
    // SkeletonLoadProps 
} from 'src/define';

import { 
    LOAD_COMPONENTS_CONST 
} from 'src/const';


const Load: FC<{}> = () => {

    // const dotCircleLoad: DotCircleLoadProps = {
    //     dotSize: '20',
    //     dotBackgroundColor: 'brown',
    //     dotAmount: '10',
    //     circleSize: '10'
    // }

    const lineCircleLoad: LineCircleLoadProps = {
        lineSize: 10,
        lineBackgroundColor: 'brown',
        circleSize: 150
    }

    // const skeletonLoad: SkeletonLoadProps = {
    //     width: 100,
    //     height: 100
    // }

    const load: LoadProps = {
        type: LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE,
        infor: lineCircleLoad

    }

    return <div className="TKS-Load">
        <Loading load={ load } />
    </div>;
};

export default Load;
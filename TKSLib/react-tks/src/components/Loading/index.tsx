import React, { FC } from 'react';
import './styles.css';

import { 
    LoadProps,
    DotCircleLoadProps,
    LineCircleLoadProps,
    SkeletonLoadProps
} from 'src/define';

import { 
    LOAD_COMPONENTS_CONST 
} from 'src/const';

import DotCircle from './components/DotCircle';
import LineCircle from './components/LineCircle';
import Skeleton from './components/Skeleton';

const Loading: FC<{ load: LoadProps }> = ({ load }) => {

    const infor: any = load.infor;

    switch(load.type) { 
        
        case LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE: { 
            if (!(
                (typeof(infor.dotSize)==='string') &&
                (typeof(infor.dotBackgroundColor)==='string') &&
                (typeof(infor.dotAmount)==='string') &&
                (typeof(infor.circleSize)==='string') 
            )) {
                console.warn({
                    type: 'Data type NOT valid',
                    message: `Loading type is a ${LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE}, when data type is NOT a DotCircleLoadProps`
                });
            }
            break; 
        } 
        case LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE: { 
            if (!(
                (typeof(infor.lineSize)==='number') &&
                (typeof(infor.lineBackgroundColor)==='string') &&
                (typeof(infor.circleSize)==='number')
            )) {
                console.warn({
                    type: 'Data type NOT valid',
                    message: `Loading type is a ${LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE}, when data type is NOT a LineCircleLoadProps`
                });
            }
            break; 
        } 
        case LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON: { 
            if (!(
                (typeof(infor.width)==='number') &&
                ((infor.maxminWidth==='max')||(infor.maxminWidth==='min')||(infor.maxminWidth===undefined)) &&
                (typeof(infor.height)==='number') &&
                ((infor.maxminHeight==='max')||(infor.maxminHeight==='min')||(infor.maxminHeight===undefined))
            )) {
                console.warn({
                    type: 'Data type NOT valid',
                    message: `Loading type is a ${LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON}, when data type is NOT a SkeletonLoadProps`
                });
            }
            break; 
        } 
        default: { 
           break; 
        } 
    } 

    return <div className="TKS-Loading">
        { load.type===LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE && <DotCircle dotCircleLoad={ load.infor as DotCircleLoadProps } />}
        { load.type===LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE && <LineCircle lineCircleLoad={ load.infor as LineCircleLoadProps } />}
        { load.type===LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON && <Skeleton skeletonLoad={ load.infor as SkeletonLoadProps } />}
    </div>;
};

export default React.memo(Loading);
import React from 'react';
import './styles.css';
import { LOAD_COMPONENTS_CONST } from 'const';
import DotCircle from './components/DotCircle';
import LineCircle from './components/LineCircle';
import Skeleton from './components/Skeleton';
const Loading = ({ load }) => {
    const infor = load.infor;
    switch (load.type) {
        case LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE: {
            if (!((typeof (infor.dotSize) === 'string') &&
                (typeof (infor.dotBackgroundColor) === 'string') &&
                (typeof (infor.dotAmount) === 'string') &&
                (typeof (infor.circleSize) === 'string'))) {
                console.warn({
                    type: 'Data type NOT valid',
                    message: `Loading type is a ${LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE}, when data type is NOT a DotCircleLoadProps`
                });
            }
            break;
        }
        case LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE: {
            if (!((typeof (infor.lineSize) === 'number') &&
                (typeof (infor.lineBackgroundColor) === 'string') &&
                (typeof (infor.circleSize) === 'number'))) {
                console.warn({
                    type: 'Data type NOT valid',
                    message: `Loading type is a ${LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE}, when data type is NOT a LineCircleLoadProps`
                });
            }
            break;
        }
        case LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON: {
            if (!((typeof (infor.width) === 'number') &&
                ((infor.maxminWidth === 'max') || (infor.maxminWidth === 'min') || (infor.maxminWidth === undefined)) &&
                (typeof (infor.height) === 'number') &&
                ((infor.maxminHeight === 'max') || (infor.maxminHeight === 'min') || (infor.maxminHeight === undefined)))) {
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
    return React.createElement("div", { className: "TKS-Loading" },
        load.type === LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE && React.createElement(DotCircle, { dotCircleLoad: load.infor }),
        load.type === LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE && React.createElement(LineCircle, { lineCircleLoad: load.infor }),
        load.type === LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON && React.createElement(Skeleton, { skeletonLoad: load.infor }));
};
export default Loading;

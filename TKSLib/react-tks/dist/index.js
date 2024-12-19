'use strict';

var React = require('react');

const ContextTable = React.createContext(undefined);

function useFollowState(input) {
    const initialValue = input === null || input === void 0 ? void 0 : input.initialValue;
    const config = input === null || input === void 0 ? void 0 : input.config;
    const registerState = config === null || config === void 0 ? void 0 : config.registerState;
    // const registerStates_: string[] = [];
    const countOccurrences = (arr, value) => {
        return arr.reduce((count, currentValue) => {
            return currentValue === value ? count + 1 : count;
        }, 0);
    };
    const getRegisterState_ = (registerState_) => {
        const registerStates__ = [];
        for (let i = 0; i < registerState_.length; i++) {
            const state_i = registerState_[i].state;
            if (state_i) {
                registerStates__.push(state_i);
            }
        }
        return registerStates__;
    };
    const registerStates_ = React.useMemo(() => {
        if (registerState) {
            return getRegisterState_(registerState);
        }
        else {
            return [];
        }
    }, [registerState]);
    if (registerState) {
        for (let i = 0; i < registerStates_.length; i++) {
            const valueToCount = registerStates_[i];
            const counter = countOccurrences(registerStates_, valueToCount);
            if (counter > 1) {
                console.warn({
                    message: `Having states that is more one (${counter})`,
                    state: valueToCount,
                    all_states: registerStates_
                });
                break;
            }
        }
    }
    else {
        console.warn({
            message: 'You need to registe states that will used in this config!',
            config: config
        });
    }
    const [states, setSates] = React.useState(() => {
        if (initialValue && registerState) {
            const valueToCount = initialValue;
            const counter = countOccurrences(registerState, valueToCount);
            if (counter === 1) {
                return [initialValue];
            }
            else {
                console.warn({
                    message: 'This state is NOT in states that registed ',
                    config: config,
                    state: initialValue
                });
            }
            return [initialValue];
        }
        else {
            return [];
        }
    });
    const [newState, setNewState] = React.useState(undefined);
    [...registerStates_];
    const getRegistedStateConst = React.useCallback(() => {
        var _a;
        const CONST = {};
        if (registerState) {
            for (let i = 0; i < registerState.length; i++) {
                const state = (_a = registerState[i]) === null || _a === void 0 ? void 0 : _a.state;
                if (state) {
                    CONST[state] = state;
                }
            }
        }
        return CONST;
    }, [registerState]);
    const addState = React.useCallback((newState) => {
        setNewState(newState);
    }, []);
    React.useEffect(() => {
        if (registerState && newState) {
            // const registerStates_: string[] = getRegisterState_(registerState);
            const valueToCount = newState;
            const counter = countOccurrences(registerStates_, valueToCount);
            if (counter === 1) {
                setSates(pre => [...pre, newState]);
            }
            else {
                console.warn({
                    message: 'This state is NOT in states that registed ',
                    config: config,
                    method: 'addState'
                });
            }
            setNewState(undefined);
        }
    }, [newState, config, registerStates_, registerState]);
    const clearStates = React.useCallback(() => {
        setSates([]);
    }, []);
    const getCurrrentState = React.useCallback(() => {
        const len = states.length;
        return states[len - 1];
    }, [states]);
    const getBeforeState = React.useCallback((index) => {
        const len = states.length;
        return states[len - 1 - index];
    }, [states]);
    const getAllState = React.useCallback(() => {
        return states;
    }, [states]);
    const isBeforCurrent = React.useCallback((beforeState, currentState) => {
        const beforeState_m = getBeforeState(1);
        const currentState_m = getCurrrentState();
        if (beforeState_m === beforeState && currentState_m === currentState) {
            return true;
        }
        return false;
    }, [getBeforeState, getCurrrentState]);
    const [followState, setFollowState] = React.useState(() => {
        return {
            config: config,
            getData: {
                getRegistedStateConst: getRegistedStateConst,
                getCurrrentState: getCurrrentState,
                getBeforeState: getBeforeState,
                getAllState: getAllState
            },
            setData: {
                addState: addState,
                clearStates: clearStates
            },
            event: { isBeforCurrent: isBeforCurrent }
        };
    });
    // useEffect(() => {
    //     setFollowState(pre => {
    //         return {
    //             ...pre,
    //             config: config
    //         }
    //     })
    // }, [])
    React.useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { setData: Object.assign(Object.assign({}, pre.setData), { addState: addState }) });
        });
    }, [addState]);
    React.useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { setData: Object.assign(Object.assign({}, pre.setData), { clearStates: clearStates }) });
        });
    }, [clearStates]);
    React.useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { getData: Object.assign(Object.assign({}, pre.getData), { getCurrrentState: getCurrrentState }) });
        });
    }, [getCurrrentState]);
    React.useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { getData: Object.assign(Object.assign({}, pre.getData), { getBeforeState: getBeforeState }) });
        });
    }, [getBeforeState]);
    React.useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { getData: Object.assign(Object.assign({}, pre.getData), { getAllState: getAllState }) });
        });
    }, [getAllState]);
    React.useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { event: { isBeforCurrent: isBeforCurrent } });
        });
    }, [isBeforCurrent]);
    return followState;
}

// import React from 'react';
// define color
const WARNING_COLOR = '#d3d602';
const LOAD_STATE = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    READY: 'READY'
};
// load componets
const LOAD_COMPONENTS_CONST = {
    LOADING_TYPE: {
        LINE_CIRCLE: 'LINE_CIRCLE',
        DOT_CIRCLE: 'DOT_CIRCLE',
        SKELETON: 'SKELETON'
    }
};

document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
document.getElementById.bind(document);

const DotCircle = ({ dotCircleLoad }) => {
    React.useEffect(() => {
        const q_dots = $$('.TKS-Load-DotCircle-dot');
        for (let i = 0; i < q_dots.length; i++) {
            if (q_dots !== undefined) {
                const q_dot = q_dots[i];
                q_dot.style.setProperty('--dot-index', `${i + 1}`);
                q_dot.style.setProperty('--dotSize', dotCircleLoad.dotSize);
                q_dot.style.setProperty('--dotBackgroundColor', dotCircleLoad.dotBackgroundColor);
                q_dot.style.setProperty('--dotAmount', dotCircleLoad.dotAmount);
                q_dot.style.setProperty('--circleSize', `${dotCircleLoad.circleSize}px`);
            }
        }
    }, [dotCircleLoad]);
    const spanArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const list_dot = spanArr.map((data, index) => {
        return (React.createElement("span", { className: 'TKS-Load-DotCircle-dot', key: index }));
    });
    return React.createElement("div", { className: "TKS-Load-DotCircle" },
        React.createElement("div", null, list_dot));
};
var DotCircle$1 = React.memo(DotCircle);

const LineCircle = ({ lineCircleLoad }) => {
    const circleSize = lineCircleLoad.circleSize;
    const lineSize = lineCircleLoad.lineSize;
    const lineBackgroundColor = lineCircleLoad.lineBackgroundColor;
    const amplify = circleSize / 150;
    const r = (circleSize - lineSize) / 2;
    const myElementRef = React.useRef(null);
    React.useEffect(() => {
        if (myElementRef.current) {
            myElementRef.current.style.setProperty('--lineBackgroundColor', lineBackgroundColor);
            myElementRef.current.style.setProperty('--lineSize', `${lineSize}`);
            myElementRef.current.style.setProperty('--circleSize', `${circleSize}px`);
            myElementRef.current.style.setProperty('--amplify', `${amplify}`);
        }
    }, [circleSize, lineBackgroundColor, lineSize, amplify]);
    return React.createElement("div", { className: "TKS-Load-LineCircle", ref: myElementRef },
        React.createElement("svg", null,
            React.createElement("circle", { cx: `${circleSize / 2}`, cy: `${circleSize / 2}`, r: r })));
};
var LineCircle$1 = React.memo(LineCircle);

const Skeleton = ({ skeletonLoad }) => {
    const myElementRef = React.useRef(null);
    React.useEffect(() => {
        // const q_skeletonCircle = $('.TKS-Load-Skeleton') as HTMLElement;
        // q_skeletonCircle.style.setProperty('--width', `${skeletonLoad.width}px`);
        // q_skeletonCircle.style.setProperty('--height', `${skeletonLoad.height}px`);
        // if (skeletonLoad.maxminWidth===undefined) {
        //     q_skeletonCircle.style.setProperty('--width', `${skeletonLoad.width}px`);
        // } else {
        //     if (skeletonLoad.maxminWidth==='max') {
        //         q_skeletonCircle.style.setProperty('--width', '100%');
        //     } else if (skeletonLoad.maxminWidth==='min') {
        //         q_skeletonCircle.style.setProperty('--width', 'min-content');
        //     } else {
        //         console.warn('The maxminWidth value of skeletonLoad is invalid. It only recive values: [max, min]');
        //     }
        // }
        // if (skeletonLoad.maxminHeight===undefined) {
        //     q_skeletonCircle.style.setProperty('--height', `${skeletonLoad.height}px`);
        // } else {
        //     if (skeletonLoad.maxminHeight==='max') {
        //         q_skeletonCircle.style.setProperty('--height', '100%');
        //     } else if (skeletonLoad.maxminHeight==='min') {
        //         q_skeletonCircle.style.setProperty('--height', 'min-content');
        //     } else {
        //         console.warn('The maxminHeight value of skeletonLoad is invalid. It only recive values: [max, min]');
        //     }
        // }
        if (myElementRef.current) {
            if (skeletonLoad.maxminWidth === undefined) {
                myElementRef.current.style.setProperty('--width', `${skeletonLoad.width}px`);
            }
            else {
                if (skeletonLoad.maxminWidth === 'max') {
                    myElementRef.current.style.setProperty('--width', '100%');
                }
                else if (skeletonLoad.maxminWidth === 'min') {
                    myElementRef.current.style.setProperty('--width', 'min-content');
                }
                else {
                    console.warn('The maxminWidth value of skeletonLoad is invalid. It only recive values: [max, min]');
                }
            }
            if (skeletonLoad.maxminHeight === undefined) {
                myElementRef.current.style.setProperty('--height', `${skeletonLoad.height}px`);
            }
            else {
                if (skeletonLoad.maxminHeight === 'max') {
                    myElementRef.current.style.setProperty('--height', '100%');
                }
                else if (skeletonLoad.maxminHeight === 'min') {
                    myElementRef.current.style.setProperty('--height', 'min-content');
                }
                else {
                    console.warn('The maxminHeight value of skeletonLoad is invalid. It only recive values: [max, min]');
                }
            }
        }
    }, [skeletonLoad]);
    return React.createElement("div", { className: "TKS-Load-Skeleton TKS-Load-Skeleton--Loading", ref: myElementRef });
};
var Skeleton$1 = React.memo(Skeleton);

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
    }
    return React.createElement("div", { className: "TKS-Loading" },
        load.type === LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE && React.createElement(DotCircle$1, { dotCircleLoad: load.infor }),
        load.type === LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE && React.createElement(LineCircle$1, { lineCircleLoad: load.infor }),
        load.type === LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON && React.createElement(Skeleton$1, { skeletonLoad: load.infor }));
};
var Loading$1 = React.memo(Loading);

const Cell = ({ data, cellIndex, rowIndex, column }) => {
    var _a;
    const context = React.useContext(ContextTable);
    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }
    const { table, cellElements, resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount } = context;
    const loadDataState = (_a = table === null || table === void 0 ? void 0 : table.control) === null || _a === void 0 ? void 0 : _a.loadDataState;
    React.useEffect(() => {
        // const q_Cell = $$('.TKS-Cell')[cellIndex] as HTMLElement;
        const q_Cell = cellElements.current[cellIndex];
        if (q_Cell) {
            (data === null || data === void 0 ? void 0 : data.width) && q_Cell.style.setProperty('--Cell-width', data === null || data === void 0 ? void 0 : data.width);
            (data === null || data === void 0 ? void 0 : data.height) && q_Cell.style.setProperty('--Cell-height', data === null || data === void 0 ? void 0 : data.height);
            (data === null || data === void 0 ? void 0 : data.textColor) && q_Cell.style.setProperty('--Cell-textColor', data === null || data === void 0 ? void 0 : data.textColor);
            (data === null || data === void 0 ? void 0 : data.textWeight) && q_Cell.style.setProperty('--Cell-textWeight', data === null || data === void 0 ? void 0 : data.textWeight);
        }
    }, [cellElements, cellIndex, data]);
    const handleMouseDown = (e) => {
        // const q_cells = $$('.TKS-Cell');
        const q_cells = cellElements.current;
        cellX.current = e.clientX;
        let sbWidth = window.getComputedStyle(q_cells[cellIndex]).width;
        cellWidth.current = parseInt(sbWidth, 10);
        resizableStatus.current = true;
        selectedColumn.current = column;
        if (resizableStatus.current && selectedColumn.current !== undefined) {
            for (let i = 0; i < rowAmount.current; i++) {
                const qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                qq_cells.children[1].classList.add('selected');
            }
        }
    };
    const skeletonLoad = {
        width: 100,
        height: 100,
        maxminWidth: 'max'
    };
    const load = {
        type: LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON,
        infor: skeletonLoad
    };
    return React.createElement("div", { className: "TKS-Cell", ref: (el) => (cellElements.current[cellIndex] = el) },
        React.createElement("div", null, loadDataState === LOAD_STATE.LOADING && rowIndex !== 0 && React.createElement(Loading$1, { load: load })),
        React.createElement("div", null, data.content),
        React.createElement("div", { onMouseDown: (e) => handleMouseDown(e) }));
};

const Row = ({ data: rowData, rowIndex }) => {
    // console.log('Row', rowIndex)
    var _a, _b;
    const context = React.useContext(ContextTable);
    if (!context) {
        throw new Error('Context in row is undefined');
    }
    const { table, default_pageSize, default_maxRow, cellElements, resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount, pageIndex } = context;
    const rowElement = React.useRef(null);
    const isSelectedRow = React.useRef(false);
    if (rowData === null || rowData === void 0 ? void 0 : rowData.cells) {
        columnAmount.current = rowData.cells.length;
    }
    const pageSize = React.useRef(default_pageSize);
    const maxRow = React.useRef(default_maxRow);
    if ((_a = table === null || table === void 0 ? void 0 : table.config) === null || _a === void 0 ? void 0 : _a.pageSize) {
        pageSize.current = table.config.pageSize;
    }
    if ((_b = table === null || table === void 0 ? void 0 : table.config) === null || _b === void 0 ? void 0 : _b.maxRow) {
        maxRow.current = table.config.maxRow;
    }
    React.useEffect(() => {
        const handleMouseMove = (e) => {
            // const q_cells = $$('.TKS-Cell');
            const q_cells = cellElements.current;
            const dx = e.clientX - cellX.current;
            const cw = cellWidth.current + dx;
            if (resizableStatus.current && selectedColumn.current !== undefined) {
                for (let i = 0; i < rowAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                    qq_cells.style.width = `${cw}px`;
                }
            }
        };
        const handleMouseUp = (e) => {
            resizableStatus.current = false;
            // const q_cells = $$('.TKS-Cell');
            const q_cells = cellElements.current;
            if (selectedColumn.current !== undefined) {
                for (let i = 0; i < rowAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                    qq_cells.children[1].classList.remove('selected');
                }
            }
        };
        const handleMouseLeave = (e) => {
            resizableStatus.current = false;
        };
        document.addEventListener('mousemove', (e) => handleMouseMove(e));
        document.addEventListener('mouseup', (e) => handleMouseUp());
        document.addEventListener('mouseleave', (e) => handleMouseLeave());
        return () => {
            document.removeEventListener('mousemove', (e) => handleMouseMove(e));
            document.removeEventListener('mouseup', (e) => handleMouseUp());
            document.removeEventListener('mouseleave', (e) => handleMouseLeave());
        };
    }, [cellElements, cellWidth, cellX, columnAmount, resizableStatus, rowAmount, selectedColumn]);
    const handleHoverIn = (e) => {
        const hoverColor = 'rgb(233, 233, 233)';
        if (rowElement.current && rowIndex > 0) {
            rowElement.current.style.setProperty('--background-color', hoverColor);
        }
    };
    const handleHoverOut = (e) => {
        const hoverColor = 'white';
        if (rowElement.current && !isSelectedRow.current) {
            rowElement.current.style.setProperty('--background-color', hoverColor);
        }
    };
    const handleClick = (e) => {
        isSelectedRow.current = !isSelectedRow.current;
    };
    const handleTableIndex = (columnAmount, rowIndex, cellIndex) => {
        return columnAmount * rowIndex + cellIndex;
    };
    const list_cell = (rowData === null || rowData === void 0 ? void 0 : rowData.cells) && rowData.cells.map((data, index) => {
        return (rowData === null || rowData === void 0 ? void 0 : rowData.cells) && (React.createElement(Cell, { data: data, cellIndex: handleTableIndex(rowData.cells.length, rowIndex, index), rowIndex: rowIndex, column: index, key: index }));
    });
    const dataIndex = pageSize.current ? pageSize.current * (pageIndex - 1) + rowIndex : 0;
    return React.createElement("div", { className: "TKS-Row", ref: rowElement, 
        // handle hover
        onMouseOver: e => handleHoverIn(), onMouseOut: e => handleHoverOut(), onClick: e => handleClick() },
        React.createElement("div", { className: 'TKS-Row-indexColumn' },
            rowIndex > 0 ? React.createElement("div", null, rowIndex) : React.createElement("div", null, pageSize.current),
            rowIndex > 0 ? React.createElement("div", null, dataIndex) : React.createElement("div", null, maxRow.current)),
        React.createElement("div", { className: 'TKS-Row-column' }, list_cell));
};
var Row$1 = React.memo(Row);

const TKS_Init = {
    removeDefaultFunction() {
    },
};

const handleCutPXInString = (s) => {
    const arr = ['p', 'x'];
    let s_new = '';
    for (let i = 0; i < s.length; i++) {
        if (arr.indexOf(s[i]) === -1) {
            s_new = `${s_new}${s[i]}`;
        }
    }
    return s_new.trim();
};

const Control = () => {
    var _a, _b, _c;
    const context = React.useContext(ContextTable);
    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }
    const { table, pageIndex, setPageIndex, default_pageSize, default_maxRow, loadDataState, follow_loadingState } = context;
    const id = React.useRef(`Control__T: ${React.useId()}`);
    // const indexInit = 1;
    const firstIndex = 1;
    const nextIndex = React.useRef(0);
    const amountOfIndexCell = 4;
    const [pageIndexCluster, setPageIndexCluster] = React.useState(0);
    const [nextPageIndexCluster, setNextPageIndexCluster] = React.useState(0);
    const [nextPageIndex, setNextPageIndex] = React.useState(undefined);
    const q_selectPageContainer = React.useRef(null);
    const q_loadingContainers = React.useRef([]);
    const [load, setLoad] = React.useState(undefined);
    const [loadIndex, setLoadIndex] = React.useState(1);
    const pageSize = React.useRef(default_pageSize);
    const maxRow = React.useRef(default_maxRow);
    if ((_a = table === null || table === void 0 ? void 0 : table.config) === null || _a === void 0 ? void 0 : _a.pageSize) {
        pageSize.current = table.config.pageSize;
    }
    if ((_b = table === null || table === void 0 ? void 0 : table.config) === null || _b === void 0 ? void 0 : _b.maxRow) {
        maxRow.current = table.config.maxRow;
    }
    const amountOfPages = React.useCallback(() => {
        if (maxRow.current % pageSize.current > 0) {
            return Math.floor(maxRow.current / pageSize.current) + 1;
        }
        else if (maxRow.current % pageSize.current === 0) {
            return Math.floor(maxRow.current / pageSize.current);
        }
        else {
            return 1;
        }
    }, [maxRow, pageSize]);
    const pageIndexCluster_max = amountOfPages() - amountOfIndexCell;
    const handleLoad = React.useCallback((index) => {
        if (q_loadingContainers.current[index]) {
            let style_loadingContainer;
            style_loadingContainer = getComputedStyle(q_loadingContainers.current[index]);
            let circleSize_m = 0;
            const width = Number(handleCutPXInString(style_loadingContainer.width));
            const height = Number(handleCutPXInString(style_loadingContainer.height));
            if (width > height) {
                circleSize_m = height;
            }
            else {
                circleSize_m = width;
            }
            const lineCircleLoad = {
                lineSize: 3,
                lineBackgroundColor: 'blue',
                circleSize: circleSize_m
            };
            const load_m = {
                type: LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE,
                infor: lineCircleLoad
            };
            setLoad(load_m);
            setLoadIndex(index);
        }
    }, []);
    React.useEffect(() => {
        const qq_selectPageContainer = q_selectPageContainer.current;
        if (qq_selectPageContainer) {
            const q_pageIndexs = qq_selectPageContainer.children;
            for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
                if ((![5, 7].includes(i1)) && (loadDataState !== LOAD_STATE.LOADING)) {
                    q_pageIndexs[i1].onclick = function (e) {
                        var _a, _b;
                        let nextIndex_m = 0;
                        switch (i1) {
                            case 0:
                                setNextPageIndexCluster(0);
                                setNextPageIndex(firstIndex);
                                nextIndex_m = i1 + 1;
                                // setNextIndex(i1 + 1);
                                break;
                            case 1:
                                if (pageIndexCluster > 0) {
                                    setNextPageIndexCluster(x => x - 1);
                                    nextIndex_m = i1 + 1;
                                    // setNextIndex(i1 + 1);
                                }
                                else {
                                    nextIndex_m = i1;
                                    // setNextIndex(i1);
                                }
                                setNextPageIndex(pageIndexCluster + i1);
                                break;
                            case 4:
                                if (pageIndex < amountOfPages() - 1) {
                                    setNextPageIndexCluster(x => x + 1);
                                    nextIndex_m = i1 - 1;
                                    // setNextIndex(i1 - 1);
                                }
                                else if (pageIndex === amountOfPages() - 1) {
                                    nextIndex_m = i1;
                                    // setNextIndex(i1);
                                }
                                setNextPageIndex(pageIndexCluster + i1);
                                break;
                            case 6:
                                setNextPageIndexCluster(amountOfPages() - amountOfIndexCell);
                                setNextPageIndex(amountOfPages());
                                nextIndex_m = i1 - 2;
                                // setNextIndex(i1 - 2);
                                break;
                            default:
                                nextIndex_m = i1;
                                // setNextIndex(i1);
                                setNextPageIndex(pageIndexCluster + i1);
                        }
                        nextIndex.current = nextIndex_m;
                        // onSelectPage(nextIndex_m);
                        if (loadIndex !== i1 && loadDataState !== LOAD_STATE.LOADING) {
                            handleLoad(i1);
                        }
                        const TKS = Object.assign(Object.assign({}, TKS_Init), { name: (_a = table === null || table === void 0 ? void 0 : table.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, data: {
                                selectedPage: nextIndex_m
                            } });
                        (_b = table === null || table === void 0 ? void 0 : table.event) === null || _b === void 0 ? void 0 : _b.onSelectedPage(TKS);
                    };
                }
            }
        }
        return () => {
            if (qq_selectPageContainer) {
                const q_pageIndexs = qq_selectPageContainer.children;
                for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
                    q_pageIndexs[i1].removeAttribute("onclick");
                }
            }
        };
    }, [(_c = table === null || table === void 0 ? void 0 : table.config) === null || _c === void 0 ? void 0 : _c.name, table === null || table === void 0 ? void 0 : table.event, pageIndexCluster, pageIndex, amountOfPages, loadDataState, nextIndex, handleLoad, loadIndex]);
    React.useEffect(() => {
        var _a, _b, _c;
        // if (beforeLoadDataState.current===LOAD_STATE.LOADING && loadDataState===LOAD_STATE.SUCCESS && isControl_pageIndex_defaultFunction.current===true) {
        //     const qq_selectPageContainer = q_selectPageContainer.current;
        //     if (qq_selectPageContainer && nextPageIndex) {
        //         const q_pageIndexs = qq_selectPageContainer.children;
        //         for (let i = 0; i < q_pageIndexs.length; i++) {
        //             q_pageIndexs[i].classList.remove('selected');
        //         }
        //         setPageIndexCluster(nextPageIndexCluster);
        //         setPageIndex(nextPageIndex);
        //         setNextPageIndex(undefined);
        //         q_pageIndexs[nextIndex.current].classList.add('selected');
        //     }
        // }
        // follow_loadingState?.event?.isBeforCurrent && console.log(11111111, follow_loadingState.event.isBeforCurrent(LOAD_STATE.LOADING, LOAD_STATE.SUCCESS))
        if (((_a = follow_loadingState === null || follow_loadingState === void 0 ? void 0 : follow_loadingState.event) === null || _a === void 0 ? void 0 : _a.isBeforCurrent) &&
            follow_loadingState.event.isBeforCurrent(LOAD_STATE.LOADING, LOAD_STATE.SUCCESS)) {
            const qq_selectPageContainer = q_selectPageContainer.current;
            if (qq_selectPageContainer && nextPageIndex) {
                console.log(666666666);
                const q_pageIndexs = qq_selectPageContainer.children;
                for (let i = 0; i < q_pageIndexs.length; i++) {
                    q_pageIndexs[i].classList.remove('selected');
                }
                setPageIndexCluster(nextPageIndexCluster);
                setPageIndex(nextPageIndex);
                setNextPageIndex(undefined);
                ((_b = follow_loadingState.setData) === null || _b === void 0 ? void 0 : _b.addState) && ((_c = follow_loadingState.setData) === null || _c === void 0 ? void 0 : _c.addState(LOAD_STATE.READY));
                q_pageIndexs[nextIndex.current].classList.add('selected');
            }
        }
    }, [nextPageIndexCluster, nextPageIndex, setPageIndex, follow_loadingState === null || follow_loadingState === void 0 ? void 0 : follow_loadingState.event, follow_loadingState === null || follow_loadingState === void 0 ? void 0 : follow_loadingState.setData]);
    React.useEffect(() => {
        // const qq_selectPageContainer = q_selectPageContainer.current;
        // if (qq_selectPageContainer && isControl_pageIndex_defaultFunction.current===false) {
        //     const q_pageIndexs = qq_selectPageContainer.children;
        //     for (let i = 0; i < q_pageIndexs.length; i++) {
        //         q_pageIndexs[i].classList.remove('selected');
        //     }
        //     if (pageIndex < amountOfIndexCell) {
        //         setPageIndexCluster(0);
        //         q_pageIndexs[pageIndex].classList.add('selected');
        //     }
        //     if (pageIndex >= amountOfIndexCell) {
        //         if (pageIndex === amountOfPages()) {
        //             setPageIndexCluster(pageIndex - amountOfIndexCell);
        //             q_pageIndexs[amountOfIndexCell].classList.add('selected');
        //         } else {
        //             setPageIndexCluster(pageIndex - amountOfIndexCell + 1);
        //             q_pageIndexs[amountOfIndexCell - 1].classList.add('selected');
        //         }
        //     }
        //     if (pageIndex >= amountOfPages()+1) {
        //         console.warn({
        //             message: "pageIndex can't lager than page total",
        //             pageIndex: pageIndex,
        //             pageTotal: amountOfPages()
        //         })
        //     }
        // }    
    }, [amountOfPages, pageIndex]);
    // useEffect(() => {
    //     if (q_loadingContainers.current[nextIndex.current] && loadDataState===LOAD_STATE.LOADING) {
    //         let style_loadingContainer: CSSStyleDeclaration;
    //         if (firstIndexSelected.current) {
    //             style_loadingContainer = getComputedStyle(q_loadingContainers.current[nextIndex.current - 1]!);
    //         } else if (lastIndexSelected.current) {
    //             style_loadingContainer = getComputedStyle(q_loadingContainers.current[nextIndex.current + 2]!);
    //         } else {
    //             style_loadingContainer = getComputedStyle(q_loadingContainers.current[nextIndex.current]!);
    //         }
    //         let circleSize_m: number = 0;
    //         const width = Number(handleCutPXInString(style_loadingContainer.width));
    //         const height = Number(handleCutPXInString(style_loadingContainer.height));
    //         if (width > height) {
    //             circleSize_m = height;
    //         } else {
    //             circleSize_m = width;
    //         }
    //         const lineCircleLoad: LineCircleLoadProps = {
    //             lineSize: 3,
    //             lineBackgroundColor: 'blue',
    //             circleSize: circleSize_m
    //         }
    //         const load_m: LoadProps = {
    //             type: LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE,
    //             infor: lineCircleLoad
    //         }
    //         setLoad(load_m);
    //     } else {
    //         firstIndexSelected.current = false;
    //         lastIndexSelected.current = false;
    //     }
    // }, [loadDataState, firstIndexSelected, lastIndexSelected])
    return React.createElement("div", { className: "TKS-Table-Control" },
        React.createElement("div", { className: "TKS-Table-Control-selectPageContainer", ref: q_selectPageContainer },
            React.createElement("div", null,
                "First",
                React.createElement("div", { ref: (el) => (q_loadingContainers.current[0] = el) }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 0 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 1 && React.createElement("div", { className: "selected" },
                pageIndexCluster + 1,
                React.createElement("div", { ref: (el) => (q_loadingContainers.current[1] = el) }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 1 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 2 && React.createElement("div", null,
                pageIndexCluster + 2,
                React.createElement("div", { ref: (el) => (q_loadingContainers.current[2] = el) }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 2 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 3 && React.createElement("div", null,
                pageIndexCluster + 3,
                React.createElement("div", { ref: (el) => (q_loadingContainers.current[3] = el) }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 3 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 4 && React.createElement("div", null,
                pageIndexCluster + 4,
                React.createElement("div", { ref: (el) => (q_loadingContainers.current[4] = el) }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 4 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 5 && (pageIndex <= amountOfPages() - 1) && (pageIndexCluster !== pageIndexCluster_max) && React.createElement(React.Fragment, null,
                React.createElement("div", null,
                    "...",
                    React.createElement("div", { ref: (el) => (q_loadingContainers.current[5] = el) }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 5 && React.createElement(Loading$1, { load: load }))),
                React.createElement("div", null,
                    "Last",
                    React.createElement("div", { ref: (el) => (q_loadingContainers.current[6] = el) }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 6 && React.createElement(Loading$1, { load: load })))),
            React.createElement("div", null, `${pageIndex}/${amountOfPages()}`)));
};

const Table = ({ table }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const config = Object.assign({}, table === null || table === void 0 ? void 0 : table.config);
    const isRender = ((_a = table === null || table === void 0 ? void 0 : table.config) === null || _a === void 0 ? void 0 : _a.columnsInfor) ? true : false;
    const data = (_b = table === null || table === void 0 ? void 0 : table.data) === null || _b === void 0 ? void 0 : _b.values;
    const resizableStatus = React.useRef(false);
    const cellWidth = React.useRef(0);
    const cellX = React.useRef(0);
    const selectedColumn = React.useRef(undefined);
    const columnAmount = React.useRef(0);
    const rowAmount = React.useRef(0);
    const [pageIndex, setPageIndex] = React.useState(1);
    const [loadDataState, setLoadDataState] = React.useState(undefined);
    const totalRow = React.useRef([]);
    let isControl_pageIndex_defaultFunction = React.useRef(true);
    let isControl_loadDataState_defaultFunction = React.useRef(true);
    const default_pageSize = 10;
    const default_maxRow = 50;
    const pageSize = (_c = table === null || table === void 0 ? void 0 : table.config) === null || _c === void 0 ? void 0 : _c.pageSize;
    const maxRow = (_d = table === null || table === void 0 ? void 0 : table.config) === null || _d === void 0 ? void 0 : _d.maxRow;
    const registedStates = [
        {
            descrition: 'When load data',
            state: LOAD_STATE.LOADING
        },
        {
            descrition: 'When load success',
            state: LOAD_STATE.SUCCESS
        },
        {
            descrition: 'When load failure',
            state: LOAD_STATE.FAILURE
        },
        {
            descrition: 'When load ready',
            state: LOAD_STATE.READY
        }
    ];
    const follow_loadingState = useFollowState({
        config: {
            registerState: registedStates
        }
    });
    React.useEffect(() => {
        var _a, _b, _c, _d, _e;
        if (((_a = table === null || table === void 0 ? void 0 : table.control) === null || _a === void 0 ? void 0 : _a.pageIndex) !== undefined && ((_b = table === null || table === void 0 ? void 0 : table.control) === null || _b === void 0 ? void 0 : _b.pageIndex) !== null && ((_c = table === null || table === void 0 ? void 0 : table.control) === null || _c === void 0 ? void 0 : _c.pageIndex) < 1) {
            console.warn({
                message: 'pageIndex must is a number > 0',
                pageIndex: (_d = table === null || table === void 0 ? void 0 : table.control) === null || _d === void 0 ? void 0 : _d.pageIndex
            });
        }
        if ((_e = table === null || table === void 0 ? void 0 : table.control) === null || _e === void 0 ? void 0 : _e.pageIndex) {
            setPageIndex(table.control.pageIndex);
            isControl_pageIndex_defaultFunction.current = false;
        }
    }, [(_e = table === null || table === void 0 ? void 0 : table.control) === null || _e === void 0 ? void 0 : _e.pageIndex]);
    React.useEffect(() => {
        var _a;
        if ((_a = table === null || table === void 0 ? void 0 : table.control) === null || _a === void 0 ? void 0 : _a.loadDataState) {
            setLoadDataState(table.control.loadDataState);
            isControl_loadDataState_defaultFunction.current = false;
        }
    }, [(_f = table === null || table === void 0 ? void 0 : table.control) === null || _f === void 0 ? void 0 : _f.loadDataState, loadDataState]);
    React.useEffect(() => {
        var _a, _b;
        if (loadDataState && ((_a = follow_loadingState.setData) === null || _a === void 0 ? void 0 : _a.addState)) {
            (_b = follow_loadingState.setData) === null || _b === void 0 ? void 0 : _b.addState(loadDataState);
        }
    }, [loadDataState, follow_loadingState.setData]);
    // cell
    const cellElements = React.useRef([]);
    if (data) {
        rowAmount.current = data.length + 1;
        if (data.length > default_pageSize) {
            console.warn({
                message: 'Data more than default size (is 10). Data can lose',
                dataSize: data.length,
                defaultSize: default_pageSize
            });
        }
        if (pageSize === undefined) {
            console.warn({
                message: 'You should pass a value for "pageSize"',
                default_pageSize: default_pageSize
            });
        }
        if (maxRow === undefined) {
            console.warn({
                message: 'You should pass a value for "maxRow"',
                default_maxRow: default_maxRow
            });
        }
    }
    const rowForm = {
        cells: []
    };
    // set-up header oncly one time
    const cellHeader = (fieldName, content, textColor, textWeight) => {
        return {
            fieldName: fieldName,
            content: content,
            textColor: textColor,
            textWeight: textWeight
        };
    };
    const rowHeader = {
        cells: []
    };
    if ((config === null || config === void 0 ? void 0 : config.columnsInfor) && (rowHeader === null || rowHeader === void 0 ? void 0 : rowHeader.cells) && (rowForm === null || rowForm === void 0 ? void 0 : rowForm.cells)) {
        for (let i = 0; i < config.columnsInfor.length; i++) {
            // if (config.columnsInfor[i]!==undefined) {
            //     rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            //     rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
            // } else {
            //     rowHeader.cells.push(cellHeader('', `column ${i}`, 'black', '700'));
            //     rowForm.cells.push(cellHeader('', '', WARNING_COLOR, '300'));
            // }
            rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
        }
    }
    const totalRow_m = [];
    if (data) {
        for (let key = 0; key < data.length; key++) {
            // if (data.hasOwnProperty(key)) { 
            //     console.log(`log: ${key}: ${Object.keys(data[key])}`, data[key]);
            // }   
            // const rowData = { ...rowForm.current };
            const rowData = JSON.parse(JSON.stringify(rowForm));
            if ((_g = rowData === null || rowData === void 0 ? void 0 : rowData.cells) === null || _g === void 0 ? void 0 : _g.length) {
                for (let i = 0; i < rowData.cells.length; i++) {
                    const keyIndexInRow = Object.keys(data[key]).indexOf((_h = rowData.cells[i]) === null || _h === void 0 ? void 0 : _h.fieldName);
                    if (keyIndexInRow !== -1) {
                        const selectedKey = (_j = rowData.cells[i]) === null || _j === void 0 ? void 0 : _j.fieldName;
                        rowData.cells[i].content = data[key][selectedKey];
                    }
                    else {
                        rowData.cells[i].content = 'Empty';
                        rowData.cells[i].textColor = WARNING_COLOR;
                    }
                }
                totalRow_m.push(rowData);
            }
        }
    }
    totalRow_m.unshift(rowHeader);
    totalRow.current = totalRow_m;
    const handleControlPos = () => {
        if (config.controlPos === "bottom") {
            return 'bottom';
        }
        else {
            return 'top';
        }
    };
    const list_row = totalRow.current.map((data, index) => {
        return (React.createElement(Row$1, { data: data, rowIndex: index, key: index }));
    });
    const contextValue = React.useMemo(() => ({
        table,
        cellElements,
        resizableStatus,
        cellWidth,
        cellX,
        selectedColumn,
        columnAmount,
        rowAmount,
        pageIndex,
        setPageIndex,
        default_pageSize,
        default_maxRow,
        loadDataState,
        setLoadDataState,
        isControl_pageIndex_defaultFunction,
        isControl_loadDataState_defaultFunction,
        follow_loadingState
    }), [table, pageIndex, setPageIndex, loadDataState, follow_loadingState]);
    return React.createElement(ContextTable.Provider, { value: contextValue }, isRender && React.createElement("div", { className: "TKS-Table" },
        handleControlPos() !== 'bottom' && React.createElement("div", { className: 'TKS-Table--Control' },
            React.createElement(Control, null)),
        React.createElement("div", { className: 'TKS-Table--Row' }, list_row),
        handleControlPos() === 'bottom' && React.createElement("div", { className: 'TKS-Table--Control' },
            React.createElement(Control, null))));
};
var index = React.memo(Table);

exports.Table = index;
//# sourceMappingURL=index.js.map

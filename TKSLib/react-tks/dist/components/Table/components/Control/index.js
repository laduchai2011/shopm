import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useContext, useRef, useId } from 'react';
import './styles.css';
import { ContextTable } from 'components/Table/contextTable';
import { TKS_Init } from 'define';
import { LOAD_STATE, LOAD_COMPONENTS_CONST } from 'const';
import { handleCutPXInString } from 'utils';
import Loading from 'components/Loading';
const Control = () => {
    var _a, _b, _c;
    const context = useContext(ContextTable);
    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }
    const { table, pageIndex, setPageIndex, default_pageSize, default_maxRow, loadDataState, follow_loadingState } = context;
    const id = useRef(`Control__T: ${useId()}`);
    // const indexInit = 1;
    const firstIndex = 1;
    const nextIndex = useRef(0);
    const amountOfIndexCell = 4;
    const [pageIndexCluster, setPageIndexCluster] = useState(0);
    const [nextPageIndexCluster, setNextPageIndexCluster] = useState(0);
    const [nextPageIndex, setNextPageIndex] = useState(undefined);
    const q_selectPageContainer = useRef(null);
    const q_loadingContainers = useRef([]);
    const [load, setLoad] = useState(undefined);
    const [loadIndex, setLoadIndex] = useState(1);
    const pageSize = useRef(default_pageSize);
    const maxRow = useRef(default_maxRow);
    if ((_a = table === null || table === void 0 ? void 0 : table.config) === null || _a === void 0 ? void 0 : _a.pageSize) {
        pageSize.current = table.config.pageSize;
    }
    if ((_b = table === null || table === void 0 ? void 0 : table.config) === null || _b === void 0 ? void 0 : _b.maxRow) {
        maxRow.current = table.config.maxRow;
    }
    const amountOfPages = useCallback(() => {
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
    const handleLoad = useCallback((index) => {
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
    useEffect(() => {
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
    useEffect(() => {
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
    useEffect(() => {
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
    return _jsx("div", { className: "TKS-Table-Control", children: _jsxs("div", { className: "TKS-Table-Control-selectPageContainer", ref: q_selectPageContainer, children: [_jsxs("div", { children: ["First", _jsx("div", { ref: (el) => (q_loadingContainers.current[0] = el), children: loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 0 && _jsx(Loading, { load: load }) })] }), amountOfPages() >= 1 && _jsxs("div", { className: "selected", children: [pageIndexCluster + 1, _jsx("div", { ref: (el) => (q_loadingContainers.current[1] = el), children: loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 1 && _jsx(Loading, { load: load }) })] }), amountOfPages() >= 2 && _jsxs("div", { children: [pageIndexCluster + 2, _jsx("div", { ref: (el) => (q_loadingContainers.current[2] = el), children: loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 2 && _jsx(Loading, { load: load }) })] }), amountOfPages() >= 3 && _jsxs("div", { children: [pageIndexCluster + 3, _jsx("div", { ref: (el) => (q_loadingContainers.current[3] = el), children: loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 3 && _jsx(Loading, { load: load }) })] }), amountOfPages() >= 4 && _jsxs("div", { children: [pageIndexCluster + 4, _jsx("div", { ref: (el) => (q_loadingContainers.current[4] = el), children: loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 4 && _jsx(Loading, { load: load }) })] }), amountOfPages() >= 5 && (pageIndex <= amountOfPages() - 1) && (pageIndexCluster !== pageIndexCluster_max) && _jsxs(_Fragment, { children: [_jsxs("div", { children: ["...", _jsx("div", { ref: (el) => (q_loadingContainers.current[5] = el), children: loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 5 && _jsx(Loading, { load: load }) })] }), _jsxs("div", { children: ["Last", _jsx("div", { ref: (el) => (q_loadingContainers.current[6] = el), children: loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 6 && _jsx(Loading, { load: load }) })] })] }), _jsx("div", { children: `${pageIndex}/${amountOfPages()}` })] }) });
};
export default Control;

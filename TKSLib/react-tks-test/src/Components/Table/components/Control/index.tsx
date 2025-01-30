import React, { FC, useState, useEffect, useCallback, useContext, useRef, useId } from 'react';
import './styles.css';

import { ContextTable } from 'src/components/Table/contextTable';
import { 
    TKSProps,
    TKS_Init,
    LoadProps,
    LineCircleLoadProps
} from 'src/define';

import { 
    LOAD_STATE,
    LOAD_COMPONENTS_CONST 
} from 'src/const';

import { handleCutPXInString } from 'src/utils/string';

import Loading from 'src/components/Loading';

const Control: FC<{}> = () => {

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('Context in Control component cant undefined !');
    }

    const { 
        table, 
        pageIndex, 
        setPageIndex, 
        default_pageSize, 
        default_maxRow, 
        loadDataState, 
        follow_loadingState
    } = context;

    const id = useRef<string>(`Control__T: ${useId()}`);

    // const indexInit = 1;
    const firstIndex: number = 1;
    const nextIndex = useRef<number>(0);
    const amountOfIndexCell: number = 4;
    const [pageIndexCluster, setPageIndexCluster] = useState<number>(0);
    const [nextPageIndexCluster, setNextPageIndexCluster] = useState<number>(0);
    const [nextPageIndex, setNextPageIndex] = useState<number | undefined>(undefined);

    const q_selectPageContainer = useRef<HTMLDivElement | null>(null);
    const q_loadingContainers = useRef<(HTMLDivElement | null)[]>([]);
    const [load, setLoad] = useState<LoadProps | undefined>(undefined);
    const [loadIndex, setLoadIndex] = useState<number>(1);
   
    const pageSize = useRef<number>(default_pageSize);
    const maxRow = useRef<number>(default_maxRow);

    if (table?.config?.pageSize) {
        pageSize.current = table.config.pageSize;
    }
    if (table?.config?.maxRow) {
        maxRow.current = table.config.maxRow;
    }

    const amountOfPages = useCallback((): number => {
        if (maxRow.current%pageSize.current > 0) {
            return Math.floor(maxRow.current/pageSize.current) + 1;
        } else if (maxRow.current%pageSize.current === 0) {
            return Math.floor(maxRow.current/pageSize.current);
        } else {
            return 1;
        }
    }, [maxRow, pageSize]);
    const pageIndexCluster_max = amountOfPages() - amountOfIndexCell;

    const handleLoad = useCallback((index: number): void => {
        if (q_loadingContainers.current[index]) {
            let style_loadingContainer: CSSStyleDeclaration;

            style_loadingContainer = getComputedStyle(q_loadingContainers.current[index]!);
            
            let circleSize_m: number = 0;

            const width = Number(handleCutPXInString(style_loadingContainer.width));
            const height = Number(handleCutPXInString(style_loadingContainer.height));
            if (width > height) {
                circleSize_m = height;
            } else {
                circleSize_m = width;
            }

            const lineCircleLoad: LineCircleLoadProps = {
                lineSize: 3,
                lineBackgroundColor: 'blue',
                circleSize: circleSize_m
            }
        
            const load_m: LoadProps = {
                type: LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE,
                infor: lineCircleLoad
            }

            setLoad(load_m);
            setLoadIndex(index);
        }
    }, []);

    useEffect(() => {  
        const qq_selectPageContainer = q_selectPageContainer.current;

        if (qq_selectPageContainer) {
            const q_pageIndexs = qq_selectPageContainer.children;
            for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
                if ((![5, 7].includes(i1)) && (loadDataState!==LOAD_STATE.LOADING)) {
                    (q_pageIndexs[i1] as HTMLElement).onclick = function(e: Event) {
                        let nextIndex_m: number = 0;
                        let nextPageIndex_m: number = 0;
                        switch(i1) {
                            case 0:
                                setNextPageIndexCluster(0);
                                // setNextPageIndex(firstIndex);
                                nextPageIndex_m = firstIndex;
                                nextIndex_m = i1 + 1;
                                // setNextIndex(i1 + 1);
                                break;
                            case 1:
                                if (pageIndexCluster > 0) {
                                    setNextPageIndexCluster(x => x - 1);
                                    nextIndex_m = i1 + 1;
                                    // setNextIndex(i1 + 1);
                                } else {
                                    nextIndex_m = i1;
                                    // setNextIndex(i1);
                                }
                                // setNextPageIndex(pageIndexCluster + i1);
                                nextPageIndex_m = pageIndexCluster + i1;
                                break;
                            case 4:
                                if (pageIndex < amountOfPages() - 1) {
                                    setNextPageIndexCluster(x => x + 1);
                                    nextIndex_m = i1 - 1;
                                    // setNextIndex(i1 - 1);
                                } else if (pageIndex === amountOfPages() - 1) {
                                    nextIndex_m = i1;
                                    // setNextIndex(i1);
                                }
                                // setNextPageIndex(pageIndexCluster + i1);
                                nextPageIndex_m = pageIndexCluster + i1;
                                break;
                            case 6:
                                setNextPageIndexCluster(amountOfPages() - amountOfIndexCell);
                                // setNextPageIndex(amountOfPages());
                                nextPageIndex_m = amountOfPages();
                                nextIndex_m = i1 - 2;
                                // setNextIndex(i1 - 2);
                                break;
                            default:
                                nextIndex_m = i1;
                                // setNextIndex(i1);
                                // setNextPageIndex(pageIndexCluster + i1);
                                nextPageIndex_m = pageIndexCluster + i1;
                        }

                        nextIndex.current = nextIndex_m;
                        // onSelectPage(nextIndex_m);
                        setNextPageIndex(nextPageIndex_m);

                        if (loadIndex!==i1 && loadDataState!==LOAD_STATE.LOADING) {
                            handleLoad(i1);
                        }

                        const TKS: TKSProps = {
                            ...TKS_Init,
                            name: table?.config?.name,
                            id: id.current,
                            data: {
                                selectedPage: nextPageIndex_m
                            }
                        }
                        table?.event?.onSelectedPage && table?.event?.onSelectedPage(TKS);
                    }
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
        }
    }, [table?.config?.name, table?.event, pageIndexCluster, pageIndex, amountOfPages, loadDataState, nextIndex, handleLoad, loadIndex])

    useEffect(() => {
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
        if (
            follow_loadingState?.event?.isBeforCurrent && 
            follow_loadingState.event.isBeforCurrent(LOAD_STATE.LOADING, LOAD_STATE.SUCCESS)
        ) {
            const qq_selectPageContainer = q_selectPageContainer.current;
            if (qq_selectPageContainer && nextPageIndex) {
                const q_pageIndexs = qq_selectPageContainer.children;
                for (let i = 0; i < q_pageIndexs.length; i++) {
                    q_pageIndexs[i].classList.remove('selected');
                }
                setPageIndexCluster(nextPageIndexCluster);
                setPageIndex(nextPageIndex);
                setNextPageIndex(undefined);
                follow_loadingState.setData?.addState && follow_loadingState.setData?.addState(LOAD_STATE.READY);
                q_pageIndexs[nextIndex.current].classList.add('selected');
            }
        }
    }, [nextPageIndexCluster, nextPageIndex, setPageIndex, follow_loadingState?.event, follow_loadingState?.setData])

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
    }, [amountOfPages, pageIndex])

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

    return  <div className="TKS-Table-Control">
        {/* <div className="TKS-Table-Control-selectPageContainer" ref={q_selectPageContainer}>
            <div>
                First
                <div ref={(el) => (q_loadingContainers.current[0] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && firstIndexSelected.current && <Loading load={ load } /> }
                </div>
            </div>
            { amountOfPages() >= 1 && <div className="selected">
                { pageIndexCluster + 1 }
                <div ref={(el) => (q_loadingContainers.current[1] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && !firstIndexSelected.current && nextIndex.current===1 && <Loading load={ load } /> }
                </div>
            </div> }
            { amountOfPages() >= 2 && <div>
                { pageIndexCluster + 2 }
                <div ref={(el) => (q_loadingContainers.current[2] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && nextIndex.current===2 && <Loading load={ load } /> }
                </div>
            </div> }
            { amountOfPages() >= 3 && <div>
                { pageIndexCluster + 3 }
                <div ref={(el) => (q_loadingContainers.current[3] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && nextIndex.current===3 && <Loading load={ load } /> }
                </div>
            </div> }
            { amountOfPages() >= 4 && <div>
                { pageIndexCluster + 4 }
                <div ref={(el) => (q_loadingContainers.current[4] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && !lastIndexSelected.current && nextIndex.current===4 && <Loading load={ load } /> }
                </div>
            </div> }
            { amountOfPages() >= 5 && (pageIndex <= amountOfPages() - 1) && (pageIndexCluster!==pageIndexCluster_max) && <>
                <div>
                    ...
                    <div ref={(el) => (q_loadingContainers.current[5] = el)}>
                        { loadDataState===LOAD_STATE.LOADING && load!==undefined && nextIndex.current===5 && <Loading load={ load } /> }
                    </div>
                </div>
                <div>
                    Last
                    <div ref={(el) => (q_loadingContainers.current[6] = el)}>
                        { loadDataState===LOAD_STATE.LOADING && load!==undefined && lastIndexSelected.current && <Loading load={ load } /> }
                    </div>
                </div>
            </> }
            <div>{ `${pageIndex}/${amountOfPages()}` }</div>
        </div> */}
         <div className="TKS-Table-Control-selectPageContainer" ref={q_selectPageContainer}>
            <div>
                First
                <div ref={(el) => (q_loadingContainers.current[0] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && loadIndex===0 && <Loading load={ load } /> }
                </div>
            </div>
            { amountOfPages() >= 1 && <div className="selected">
                { pageIndexCluster + 1 }
                <div ref={(el) => (q_loadingContainers.current[1] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && loadIndex===1 && <Loading load={ load } /> }
                </div>
            </div> }
            { amountOfPages() >= 2 && <div>
                { pageIndexCluster + 2 }
                <div ref={(el) => (q_loadingContainers.current[2] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && loadIndex===2 && <Loading load={ load } /> }
                </div>
            </div> }
            { amountOfPages() >= 3 && <div>
                { pageIndexCluster + 3 }
                <div ref={(el) => (q_loadingContainers.current[3] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && loadIndex===3 && <Loading load={ load } /> }
                </div>
            </div> }
            { amountOfPages() >= 4 && <div>
                { pageIndexCluster + 4 }
                <div ref={(el) => (q_loadingContainers.current[4] = el)}>
                    { loadDataState===LOAD_STATE.LOADING && load!==undefined && loadIndex===4 && <Loading load={ load } /> }
                </div>
            </div> }
            { amountOfPages() >= 5 && (pageIndex <= amountOfPages() - 1) && (pageIndexCluster!==pageIndexCluster_max) && <>
                <div>
                    ...
                    <div ref={(el) => (q_loadingContainers.current[5] = el)}>
                        { loadDataState===LOAD_STATE.LOADING && load!==undefined && loadIndex===5 && <Loading load={ load } /> }
                    </div>
                </div>
                <div>
                    Last
                    <div ref={(el) => (q_loadingContainers.current[6] = el)}>
                        { loadDataState===LOAD_STATE.LOADING && load!==undefined && loadIndex===6 && <Loading load={ load } /> }
                    </div>
                </div>
            </> }
            <div>{ `${pageIndex}/${amountOfPages()}` }</div>
        </div>
    </div>;
};

export default React.memo(Control);
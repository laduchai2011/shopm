import React, { FC, useState, useEffect, useCallback, useContext, useRef, useId } from 'react';
import './styles.css';

import { ContextTable } from 'Components/Table/contextTable';
import { 
    TKSProps,
    TKS_Init,
    LoadProps,
    LineCircleLoadProps
} from 'define';

import { 
    LOAD_STATE,
    LOAD_COMPONENTS_CONST 
} from 'const';

import Loading from 'Components/Loading';

const Control: FC<{}> = ({}) => {

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }

    const { table, pageIndex, setPageIndex, loadDataState } = context;

    const id = useRef<string>(`Control__T: ${useId()}`);

    // const indexInit = 1;
    const firstIndex: number = 1;
    const nextIndex = useRef<number>(0);
    const firstIndexSelected = useRef<boolean>(false);
    const lastIndexSelected = useRef<boolean>(false);
    const indexCell: number = 4;
    const [pageIndexCluster, setPageIndexCluster] = useState<number>(0);
    const [nextPageIndexCluster, setNextPageIndexCluster] = useState<number>(0);
    const [nextPageIndex, setNextPageIndex] = useState<number | undefined>(undefined);
    // const pageSize: number = tableControlData.pageSize;
    // const maxRow: number = tableControlData.maxRow;

    const q_selectPageContainer = useRef<HTMLDivElement | null>(null);
    const q_loadingContainers = useRef<(HTMLDivElement | null)[]>([]);
    const [load, setLoad] = useState<LoadProps | undefined>(undefined);
   
    const pageSize: number | undefined = table?.config?.pageSize;
    const maxRow: number | undefined = table?.config?.maxRow;

    const amountOfPages = useCallback((): number => {
        if (pageSize && maxRow) {
            if (maxRow%pageSize > 0) {
                return Math.floor(maxRow/pageSize) + 1
            } else if (maxRow%pageSize === 0) {
                return Math.floor(maxRow/pageSize);
            } else {
                return 1;
            }
        } else {
            return 1;
        }
    }, [maxRow, pageSize]);
    const pageIndexCluster_max = amountOfPages() - indexCell;
    
    // useEffect(() => {
    //     // const q_selectPageContainer = $('.TKS-Table-Control-selectPageContainer') as HTMLElement;
    //     // const q_pageIndexs = q_selectPageContainer.children;
    //     // for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
    //     //     if (![5, 7].includes(i1)) {
    //     //         (q_pageIndexs[i1] as HTMLElement).onclick = function(e: Event) {
    //     //             for (let i2 = 0; i2 < q_pageIndexs.length; i2++) {
    //     //                 q_pageIndexs[i2].classList.remove('selected');
    //     //             }

    //     //             switch(i1) {
    //     //                 case 0:
    //     //                     setPageIndexCluster(0);
    //     //                     setPageIndex(indexInit);
    //     //                     q_pageIndexs[i1 + 1].classList.add('selected');
    //     //                     break;
    //     //                 case 1:
    //     //                     if (pageIndexCluster > 0) {
    //     //                         setPageIndexCluster(x => x - 1);
    //     //                         q_pageIndexs[i1 + 1].classList.add('selected');
    //     //                     } else {
    //     //                         q_pageIndexs[i1].classList.add('selected');
    //     //                     }
    //     //                     setPageIndex(pageIndexCluster + i1);
    //     //                     break;
    //     //                 // case 3:
    //     //                 //     if (pageIndex < amountOfPages() - 1) {
    //     //                 //         setPageIndexCluster(x => x + 1);
    //     //                 //         q_pageIndexs[i1 - 1].classList.add('selected');
    //     //                 //     } else if (pageIndex === amountOfPages() - 1) {
    //     //                 //         q_pageIndexs[i1].classList.add('selected');
    //     //                 //     }
    //     //                 //     setPageIndex(pageIndexCluster + i1);
    //     //                 //     break;
    //     //                 case 4:
    //     //                     if (pageIndex < amountOfPages() - 1) {
    //     //                         setPageIndexCluster(x => x + 1);
    //     //                         q_pageIndexs[i1 - 1].classList.add('selected');
    //     //                     } else if (pageIndex === amountOfPages() - 1) {
    //     //                         q_pageIndexs[i1].classList.add('selected');
    //     //                     }
    //     //                     setPageIndex(pageIndexCluster + i1);
    //     //                     break;
    //     //                 case 6:
    //     //                     setPageIndexCluster(amountOfPages() - indexCell);
    //     //                     setPageIndex(amountOfPages());
    //     //                     q_pageIndexs[i1 - 2].classList.add('selected');
    //     //                     break;
    //     //                 default:
    //     //                     q_pageIndexs[i1].classList.add('selected');
    //     //                     setPageIndex(pageIndexCluster + i1);
    //     //             }
    //     //         }
    //     //     }
    //     // }

    //     // return () => {
    //     //     for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
    //     //         q_pageIndexs[i1].removeAttribute("onclick");
    //     //     }
    //     // }

    //     const qq_selectPageContainer = q_selectPageContainer.current;

    //     if (qq_selectPageContainer) {
    //         const q_pageIndexs = qq_selectPageContainer.children;
    //         for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
    //             if (![5, 7].includes(i1)) {
    //                 (q_pageIndexs[i1] as HTMLElement).onclick = function(e: Event) {
    //                     for (let i2 = 0; i2 < q_pageIndexs.length; i2++) {
    //                         q_pageIndexs[i2].classList.remove('selected');
    //                     }

    //                     switch(i1) {
    //                         case 0:
    //                             setPageIndexCluster(0);
    //                             setPageIndex(indexInit);
    //                             q_pageIndexs[i1 + 1].classList.add('selected');
    //                             break;
    //                         case 1:
    //                             if (pageIndexCluster > 0) {
    //                                 setPageIndexCluster(x => x - 1);
    //                                 q_pageIndexs[i1 + 1].classList.add('selected');
    //                             } else {
    //                                 q_pageIndexs[i1].classList.add('selected');
    //                             }
    //                             setPageIndex(pageIndexCluster + i1);
    //                             break;
    //                         // case 3:
    //                         //     if (pageIndex < amountOfPages() - 1) {
    //                         //         setPageIndexCluster(x => x + 1);
    //                         //         q_pageIndexs[i1 - 1].classList.add('selected');
    //                         //     } else if (pageIndex === amountOfPages() - 1) {
    //                         //         q_pageIndexs[i1].classList.add('selected');
    //                         //     }
    //                         //     setPageIndex(pageIndexCluster + i1);
    //                         //     break;
    //                         case 4:
    //                             if (pageIndex < amountOfPages() - 1) {
    //                                 setPageIndexCluster(x => x + 1);
    //                                 q_pageIndexs[i1 - 1].classList.add('selected');
    //                             } else if (pageIndex === amountOfPages() - 1) {
    //                                 q_pageIndexs[i1].classList.add('selected');
    //                             }
    //                             setPageIndex(pageIndexCluster + i1);
    //                             break;
    //                         case 6:
    //                             setPageIndexCluster(amountOfPages() - indexCell);
    //                             setPageIndex(amountOfPages());
    //                             q_pageIndexs[i1 - 2].classList.add('selected');
    //                             break;
    //                         default:
    //                             q_pageIndexs[i1].classList.add('selected');
    //                             setPageIndex(pageIndexCluster + i1);
    //                     }
    //                 }
    //             }
    //         }
    //     }

    useEffect(() => {  
        const qq_selectPageContainer = q_selectPageContainer.current;

        if (qq_selectPageContainer) {
            const q_pageIndexs = qq_selectPageContainer.children;
            for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
                if ((![5, 7].includes(i1)) && (loadDataState!==LOAD_STATE.LOADING)) {
                    (q_pageIndexs[i1] as HTMLElement).onclick = function(e: Event) {

                        firstIndexSelected.current = false;
                        lastIndexSelected.current = false;

                        let nextIndex_m: number = 0;
                        switch(i1) {
                            case 0:
                                setNextPageIndexCluster(0);
                                setNextPageIndex(firstIndex);
                                nextIndex_m = i1 + 1;
                                firstIndexSelected.current = true;
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
                                setNextPageIndex(pageIndexCluster + i1);
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
                                setNextPageIndex(pageIndexCluster + i1);
                                break;
                            case 6:
                                setNextPageIndexCluster(amountOfPages() - indexCell);
                                setNextPageIndex(amountOfPages());
                                nextIndex_m = i1 - 2;
                                lastIndexSelected.current = true;
                                // setNextIndex(i1 - 2);
                                break;
                            default:
                                nextIndex_m = i1;
                                // setNextIndex(i1);
                                setNextPageIndex(pageIndexCluster + i1);
                        }

                        nextIndex.current = nextIndex_m;
                        // onSelectPage(nextIndex_m);

                        let isRemoveDefaultFunction = false;
                        const TKS: TKSProps = {
                            ...TKS_Init,
                            name: table?.config?.name,
                            id: id.current,
                            data: {
                                selectedPage: nextIndex_m
                            },
                            removeDefaultFunction(): void {
                                isRemoveDefaultFunction = true;
                            },
                        }
                        table?.event?.onSelectedPage(TKS);
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
    }, [pageIndexCluster, pageIndex, amountOfPages, loadDataState, nextIndex])

    useEffect(() => {
        const qq_selectPageContainer = q_selectPageContainer.current;

        if (qq_selectPageContainer && nextPageIndex!==undefined && loadDataState!==LOAD_STATE.LOADING) {
            const q_pageIndexs = qq_selectPageContainer.children;
            for (let i = 0; i < q_pageIndexs.length; i++) {
                q_pageIndexs[i].classList.remove('selected');
            }
            setPageIndexCluster(nextPageIndexCluster);
            setPageIndex(nextPageIndex);
            q_pageIndexs[nextIndex.current].classList.add('selected');
        }
    }, [loadDataState, nextPageIndexCluster, nextPageIndex, nextIndex, pageIndex, setPageIndex])

    const handleCutPXInString = (s: string): string => {
        const arr: string[] = ['p', 'x']
        let s_new: string = '';
        for (let i: number = 0; i < s.length; i++) {
            if (arr.indexOf(s[i])===-1) {
                s_new = `${s_new}${s[i]}`;
            }
        }
        return s_new.trim();
    }

    useEffect(() => {
        if (q_loadingContainers.current[nextIndex.current] && loadDataState===LOAD_STATE.LOADING) {
            let style_loadingContainer: CSSStyleDeclaration;

            if (firstIndexSelected.current) {
                style_loadingContainer = getComputedStyle(q_loadingContainers.current[nextIndex.current - 1]!);
            } else if (lastIndexSelected.current) {
                style_loadingContainer = getComputedStyle(q_loadingContainers.current[nextIndex.current + 2]!);
            } else {
                style_loadingContainer = getComputedStyle(q_loadingContainers.current[nextIndex.current]!);
            }
            
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
        } else {
            firstIndexSelected.current = false;
            lastIndexSelected.current = false;
        }
    }, [loadDataState, firstIndexSelected, lastIndexSelected])

    return  <div className="TKS-Table-Control">
        <div className="TKS-Table-Control-selectPageContainer" ref={q_selectPageContainer}>
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
        </div>
    </div>;
};

export default Control;
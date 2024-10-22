import { FC, useState, useEffect, useCallback } from 'react';
import './styles.css';

import { TableControlProps } from 'define';

import { $ } from 'tricks';

const Control: FC<{data: TableControlProps}> = ({data: tableControlData}) => {

    const indexInit = 1;
    const [pageIndexCluster, setPageIndexCluster] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(indexInit);
    const pageSize: number = tableControlData.pageSize;
    const maxRow: number = tableControlData.maxRow;
   
    const amountOfPages = useCallback((): number => {
        if (maxRow%pageSize > 0) {
            return Math.floor(maxRow/pageSize) + 1
        } else if (maxRow%pageSize === 0) {
            return Math.floor(maxRow/pageSize);
        } else {
            return 1;
        }
    }, [maxRow, pageSize]);
    
    useEffect(() => {
        const q_selectPageContainer = $('.TKS-Table-Control-selectPageContainer') as HTMLElement;
        const q_pageIndexs = q_selectPageContainer.children;
        for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
            if (![5, 7].includes(i1)) {
                (q_pageIndexs[i1] as HTMLElement).onclick = function(e: Event) {
                    for (let i2 = 0; i2 < q_pageIndexs.length; i2++) {
                        q_pageIndexs[i2].classList.remove('selected');
                    }
    
                    switch(i1) {
                        case 0:
                            setPageIndexCluster(0);
                            setPageIndex(indexInit);
                            q_pageIndexs[i1 + 1].classList.add('selected');
                            break;
                        case 1:
                            if (pageIndexCluster > 0) {
                                setPageIndexCluster(x => x - 1);
                                q_pageIndexs[i1 + 1].classList.add('selected');
                            } else {
                                q_pageIndexs[i1].classList.add('selected');
                            }
                            setPageIndex(pageIndexCluster + i1);
                            break;
                        case 4:
                            if (pageIndex < amountOfPages() - 1) {
                                setPageIndexCluster(x => x + 1);
                                q_pageIndexs[i1 - 1].classList.add('selected');
                            } else if (pageIndex === amountOfPages() - 1) {
                                q_pageIndexs[i1].classList.add('selected');
                            }
                            setPageIndex(pageIndexCluster + i1);
                            break;
                        case 6:
                            setPageIndexCluster(amountOfPages() - 4);
                            setPageIndex(amountOfPages());
                            q_pageIndexs[i1 - 2].classList.add('selected');
                            break;
                        default:
                            q_pageIndexs[i1].classList.add('selected');
                            setPageIndex(pageIndexCluster + i1);
                    }
                }
            }
        }

        return () => {
            for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
                q_pageIndexs[i1].removeAttribute("onclick");
            }
        }
    }, [pageIndexCluster, pageIndex, amountOfPages])


    return  <div className="TKS-Table-Control">
        <div className="TKS-Table-Control-selectPageContainer">
            <div>First</div>
            { amountOfPages() >= 1 && <div className="selected">{ pageIndexCluster + 1 }</div> }
            { amountOfPages() >= 2 && <div>{ pageIndexCluster + 2 }</div> }
            { amountOfPages() >= 3 && <div>{ pageIndexCluster + 3 }</div> }
            { amountOfPages() >= 4 && <div>{ pageIndexCluster + 4 }</div> }
            { amountOfPages() >= 5 && (pageIndex <= amountOfPages() - 1) && <>
                <div>...</div>
                <div>Last</div>
            </> }
            <div>{ `${pageIndex}/${amountOfPages()}` }</div>
        </div>
    </div>;
};

export default Control;
import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
// import { $ } from 'tricks/index';
import { $ } from '../../../tricks/index';
const Control = ({ data: tableControlData }) => {
    const indexInit = 1;
    const [pageIndexCluster, setPageIndexCluster] = useState(0);
    const [pageIndex, setPageIndex] = useState(indexInit);
    const pageSize = tableControlData.pageSize;
    const maxRow = tableControlData.maxRow;
    const amountOfPages = useCallback(() => {
        if (maxRow % pageSize > 0) {
            return Math.floor(maxRow / pageSize) + 1;
        }
        else if (maxRow % pageSize === 0) {
            return Math.floor(maxRow / pageSize);
        }
        else {
            return 1;
        }
    }, [maxRow, pageSize]);
    useEffect(() => {
        const q_selectPageContainer = $('.TKS-Table-Control-selectPageContainer');
        const q_pageIndexs = q_selectPageContainer.children;
        for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
            if (![5, 7].includes(i1)) {
                q_pageIndexs[i1].onclick = function (e) {
                    for (let i2 = 0; i2 < q_pageIndexs.length; i2++) {
                        q_pageIndexs[i2].classList.remove('selected');
                    }
                    switch (i1) {
                        case 0:
                            setPageIndexCluster(0);
                            setPageIndex(indexInit);
                            q_pageIndexs[i1 + 1].classList.add('selected');
                            break;
                        case 1:
                            if (pageIndexCluster > 0) {
                                setPageIndexCluster(x => x - 1);
                                q_pageIndexs[i1 + 1].classList.add('selected');
                            }
                            else {
                                q_pageIndexs[i1].classList.add('selected');
                            }
                            setPageIndex(pageIndexCluster + i1);
                            break;
                        case 4:
                            if (pageIndex < amountOfPages() - 1) {
                                setPageIndexCluster(x => x + 1);
                                q_pageIndexs[i1 - 1].classList.add('selected');
                            }
                            else if (pageIndex === amountOfPages() - 1) {
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
                };
            }
        }
        return () => {
            for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
                q_pageIndexs[i1].removeAttribute("onclick");
            }
        };
    }, [pageIndexCluster, pageIndex, amountOfPages]);
    return React.createElement("div", { className: "TKS-Table-Control" },
        React.createElement("div", { className: "TKS-Table-Control-selectPageContainer" },
            React.createElement("div", null, "First"),
            amountOfPages() >= 1 && React.createElement("div", { className: "selected" }, pageIndexCluster + 1),
            amountOfPages() >= 2 && React.createElement("div", null, pageIndexCluster + 2),
            amountOfPages() >= 3 && React.createElement("div", null, pageIndexCluster + 3),
            amountOfPages() >= 4 && React.createElement("div", null, pageIndexCluster + 4),
            amountOfPages() >= 5 && (pageIndex <= amountOfPages() - 1) && React.createElement(React.Fragment, null,
                React.createElement("div", null, "..."),
                React.createElement("div", null, "Last")),
            React.createElement("div", null, `${pageIndex}/${amountOfPages()}`)));
};
export default Control;

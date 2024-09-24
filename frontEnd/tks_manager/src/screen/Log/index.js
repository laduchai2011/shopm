import React, { useRef, useState, useEffect, useCallback, useContext } from "react";
import './styles.css';

import { ThemeContextApp } from "utilize/ContextApp";

import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";

import { useGetLogListQuery } from "reduxStore/RTKQuery/logRTKQuery";

import { $, $$ } from "utilize/Tricks";

const Log = () => {
    const { loginInfor } = useContext(ThemeContextApp);

    const cellIndex = useRef(0);
    const cellWidth = useRef(0);
    const cellX = useRef(0);
    const resizableStatus = useRef(0);
    const [lock_rows, setLock_rows] = useState([]);
    const [showDetails, setShowDetails] = useState([]);

    const indexInit = 1;
    const [pageIndex, setPageIndex] = useState(indexInit);
    const [pageIndexCluster, setPageIndexCluster] = useState(0);
    const pageSize = 20;
    const [logs, setLogs] = useState([]);
    const [countOfAllLog, setCountOfAllLog] = useState();

    const {
        data: data_allLog, 
        // isFetching: isFetching_allLog, 
        isError: isError_allLog,
        error: error_allLog
    } = useGetLogListQuery({pageIndex: pageIndex, pageSize: pageSize});
    useEffect(() => {
        isError_allLog && console.log(error_allLog);
    }, [isError_allLog, error_allLog])
    useEffect(() => {
        const resData = data_allLog;
        if (resData?.success) {
            setLogs(resData.logs.rows);
            setCountOfAllLog(resData.logs.count);
        } else {
            console.error(resData?.message)
        }
    }, [data_allLog])

    const getLastPage = useCallback(() => {
        if (countOfAllLog%pageSize > 0) {
            return Math.floor(countOfAllLog/pageSize) + 1
        } else if (countOfAllLog%pageSize === 0) {
            return Math.floor(countOfAllLog/pageSize);
        } else {
            return null;
        }
    }, [countOfAllLog, pageSize]);
    useEffect(() => {
        const q_pageIndexs = $('.Log-topTab-selectPageContainer').children;
        for (let i1 = 0; i1 < q_pageIndexs.length; i1++) {
            if (![5, 7].includes(i1)) {
                q_pageIndexs[i1].onclick = function(e) {
                    for (let i2 = 0; i2 < q_pageIndexs.length; i2++) {
                        q_pageIndexs[i2].classList.remove('selected');
                    }

                    console.log(i1)
    
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
                            if (pageIndex < getLastPage() - 1) {
                                setPageIndexCluster(x => x + 1);
                                q_pageIndexs[i1 - 1].classList.add('selected');
                            } else if (pageIndex === getLastPage() - 1) {
                                q_pageIndexs[i1].classList.add('selected');
                            }
                            setPageIndex(pageIndexCluster + i1);
                            break;
                        case 6:
                            setPageIndexCluster(getLastPage() - 4);
                            setPageIndex(getLastPage());
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
    }, [pageIndexCluster, pageIndex, getLastPage])

    const handleMouseMove = (e) => {
        const q_cells = $$('.Log-table-row-cell');
        const dx = e.clientX - cellX.current
        const cw = cellWidth.current + dx;
        if (resizableStatus.current) {
            for (let x = 0; x < pageSize + 1; x++) {
                q_cells[cellIndex.current + 7*x].style.width = `${ cw }px`;
            }
        }
    }

    const handleMouseUp = (e) => {
        resizableStatus.current = false;
    }

    const handleMouseDown = (e) => {
        const q_cells = $$('.Log-table-row-cell');
        for (let i = 0; i < q_cells.length; i++) {
            if (e.target===q_cells[i].children[1]) {
                cellIndex.current = i;
            }
        }
        cellX.current = e.clientX;
        let sbWidth = window.getComputedStyle(q_cells[cellIndex.current]).width;
        cellWidth.current = parseInt(sbWidth, 10);
        resizableStatus.current = true;
    }

    const handleMouseOver_showHeader = (e) => {
        const q_datas = $$('.Log-table-row-data');
        for (let i = 0; i < q_datas.length; i++) {
            if (e.currentTarget===q_datas[i]) {
                q_datas[i].children[1].classList.add('showHeader');
            }
        }
    }

    const handleMouseLeave_showHeader = (e) => {
        const q_datas = $$('.Log-table-row-data');
        for (let i = 0; i < q_datas.length; i++) {
            if (e.currentTarget===q_datas[i]) {
                if (!lock_rows.includes(i)) {
                    q_datas[i].children[1].classList.remove('showHeader');
                }
            }
        }
    }

    const handleLockView = (index) => {
        if (!lock_rows.includes(index)) {
            setLock_rows([...lock_rows, index]);
        } else {
            const cpLock_rows = [...lock_rows];
            const new_Lock_rows = cpLock_rows.filter(item => item !== index);
            setLock_rows(new_Lock_rows);
        }
    }

    const handleShowView = (index) => {
        const q_datas = $$('.Log-table-row-data');
        q_datas[index].children[1].classList.add('showViewDetail');
        setShowDetails([...showDetails, index]);
    }

    const handleHiddenView = (index) => {
        const q_datas = $$('.Log-table-row-data');
        q_datas[index].children[1].classList.remove('showViewDetail');
        const cpShowDetails = [...showDetails];
        const new_showDetails = cpShowDetails.filter(item => item !== index);
        setShowDetails(new_showDetails);
    }

    const image_list = (images) => {
        return images.map((data, index) => {
            return (
                <img 
                    key={ index }
                    src={ data }
                    alt=""
                />
            )
        })
    }
    
    const video_list = (videos) => {
        return videos.map((data, index) => {
            return (
                <video 
                    key={ index }
                    src={ data }
                    controls
                />
            )
        })
    } 

    const log_list = logs.map((data, index) => {
        const images = data?.image.length > 0 && JSON.parse(data?.image).images;
        const videos = data?.video.length > 0 && JSON.parse(data?.video).videos;
        return (
            <div className="Log-table-row Log-table-row-data" key={index}
            onMouseOver={(e) => handleMouseOver_showHeader(e)}
            onMouseLeave={(e) => handleMouseLeave_showHeader(e)}
        >
            <div>
                <div className='Log-table-row-cell'>
                    <div><strong>{ (pageIndex-1)*pageSize + index }</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>{ data?.VM }</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>{ data?.service }</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>{ data?.type }</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>{ data?.log }</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    { data?.read ? <div><strong>Seen</strong></div> : <div><strong>No read</strong></div> }
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    { data?.fixbug ? <div><strong>Fixed</strong></div> : <div><strong>No fix</strong></div> }
                    {/* <div></div> */}
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <input type="checkbox" checked={lock_rows.includes(index)} onChange={() => handleLockView(index)} />
                        <div>Lock</div>
                    </div>
                    <div>
                        { !showDetails.includes(index) && <>
                            <BiSolidChevronDown size={25} onClick={() => handleShowView(index)} />
                            <div>More</div>
                        </> }
                        { showDetails.includes(index) && <>
                            <BiSolidChevronUp size={25} onClick={() => handleHiddenView(index)} />
                            <div>Hidden</div>
                        </> }
                    </div>
                    <div>
                        <button>Confirm seen</button>
                        <button>Confirm fixed</button>
                    </div>
                </div>
                { showDetails.includes(index) && <div className="Log-table-row-data-detail">
                    <div>
                        <div>{ (pageIndex-1)*pageSize + index }</div>
                        <div>{ data?.VM }</div>
                        <div>{ data?.service }</div>
                        <div>{ data?.type }</div>
                        <div>Read: { data?.read ? <strong>Yes</strong> : <strong>No</strong> }</div>
                        <div>Fixbug: { data?.fixbug ? <strong>Yes</strong> : <strong>No</strong> }</div>
                    </div>
                    <div>{ data?.log }</div>
                    <div className="Log-table-row-data-detail-imgContainer">
                        { images.length > 0 && image_list(images) }
                    </div>
                    <div className="Log-table-row-data-detail-videoContainer">
                        { videos.length > 0 && video_list(videos) }
                    </div>
                    <div>
                        Document:
                        <div>{ data?.document }</div>
                    </div>
                    <div>
                        Note: 
                        <div>{ data?.note }</div>
                    </div>
                </div> }
            </div>
        </div>
        )
    })

    return (
        loginInfor!==null && <div className='Log'>
            <div className="Log-main">
                <h2>Logs</h2>
                <div className="Log-topTab">
                    <div>
                        <input type="checkbox" />
                        <div>Seen</div>
                    </div>
                    <div>
                        <input type="checkbox" />
                        <div>Fixed</div>
                    </div>
                    <div>
                        <input type="checkbox" />
                        <div>Non-read</div>
                    </div>
                    <div>
                        <input type="checkbox" />
                        <div>Non-fix</div>
                    </div>
                    <div className="Log-topTab-selectPageContainer">
                        <div>First</div>
                        <div className="selected">{ pageIndexCluster + 1 }</div>
                        <div>{ pageIndexCluster + 2 }</div>
                        <div>{ pageIndexCluster + 3 }</div>
                        <div>{ pageIndexCluster + 4 }</div>
                        { (pageIndex <= getLastPage() - 1) && <>
                            <div>...</div>
                            <div>Last</div>
                        </> }
                        <div>{ `${pageIndex}/${getLastPage()}` }</div>
                    </div>
                </div>
                <div className="Log-table"
                    onMouseMove={(e) => handleMouseMove(e)}
                    onMouseUp={(e) => handleMouseUp(e)}
                >
                    <div className="Log-table-row">
                        <div>
                            <div className='Log-table-row-cell'>
                                <div><strong>Id</strong></div>
                                <div onMouseDown={(e) => handleMouseDown(e)}></div>
                            </div>
                            <div className='Log-table-row-cell'>
                                <div><strong>VM</strong></div>
                                <div onMouseDown={(e) => handleMouseDown(e)}></div>
                            </div>
                            <div className='Log-table-row-cell'>
                                <div><strong>Service</strong></div>
                                <div onMouseDown={(e) => handleMouseDown(e)}></div>
                            </div>
                            <div className='Log-table-row-cell'>
                                <div><strong>Type</strong></div>
                                <div onMouseDown={(e) => handleMouseDown(e)}></div>
                            </div>
                            <div className='Log-table-row-cell'>
                                <div><strong>Log</strong></div>
                                <div onMouseDown={(e) => handleMouseDown(e)}></div>
                            </div>
                            <div className='Log-table-row-cell'>
                                <div><strong>Read</strong></div>
                                <div onMouseDown={(e) => handleMouseDown(e)}></div>
                            </div>
                            <div className='Log-table-row-cell'>
                                <div><strong>Fixbug</strong></div>
                                <div onMouseDown={(e) => handleMouseDown(e)}></div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    { log_list }
                </div>
            </div>
        </div>
    )
}

export default Log;
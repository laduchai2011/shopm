import React, { useRef, useState } from "react";
import './styles.css';

import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";

import { $$ } from "utilize/Tricks";

const Log = () => {

    const cellIndex = useRef(0);
    const cellWidth = useRef(0);
    const cellX = useRef(0);
    const resizableStatus = useRef(0);
    const [lock_rows, setLock_rows] = useState([]);
    const [showDetails, setShowDetails] = useState([]);

    const handleMouseMove = (e) => {
        const q_cells = $$('.Log-table-row-cell');
        const dx = e.clientX - cellX.current
        const cw = cellWidth.current + dx;
        if (resizableStatus.current) {
            for (let x = 0; x < 6; x++) {
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

    const log_list = [11, 22, 33, 44, 55].map((data, index) => {
        return (
            <div className="Log-table-row Log-table-row-data" key={index}
            onMouseOver={(e) => handleMouseOver_showHeader(e)}
            onMouseLeave={(e) => handleMouseLeave_showHeader(e)}
        >
            <div>
                <div className='Log-table-row-cell'>
                    <div><strong>{data}</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>VM</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>Service</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>Type</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>Log</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>Read</strong></div>
                    {/* <div></div> */}
                </div>
                <div className='Log-table-row-cell'>
                    <div><strong>Fixbug</strong></div>
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
                        <div>id</div>
                        <div>VM</div>
                        <div>Service</div>
                        <div>Type</div>
                        <div>Read: <strong>Yes</strong></div>
                        <div>Fixbug: <strong>No</strong></div>
                    </div>
                    <div>
                        Log detail
                    </div>
                    <div className="Log-table-row-data-detail-imgContainer">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s" alt="" />
                    </div>
                    <div className="Log-table-row-data-detail-videoContainer">
                        <video src="http://shopm.tks.local:4040/api/video" controls />
                        <video src="http://shopm.tks.local:4040/api/video" controls />
                        <video src="http://shopm.tks.local:4040/api/video" controls />
                        <video src="http://shopm.tks.local:4040/api/video" controls />
                    </div>
                    <div>
                        Document:
                        <div>dsfsdf</div>
                    </div>
                    <div>
                        Note
                    </div>
                </div> }
            </div>
        </div>
        )
    })

    return (
        <div className='Log'>
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
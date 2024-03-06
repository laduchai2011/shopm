import React, { memo, useRef } from 'react';
import './styles.css';

import { $$ } from 'utilize/Tricks';

const DepartmentTable = () => {

    const departTable_cellIndex = useRef(0);
    const departTable_cellWidth = useRef(0);
    const departTable_cellX = useRef(0);
    const departTable_resizableStatus = useRef(0);

    const departTable_handleMouseDown = (e) => {
        const q_cells = $$('.DepartmentTable-depart-cell');
        for (let i = 0; i < q_cells.length; i++) {
            if (e.target===q_cells[i].children[1]) {
                departTable_cellIndex.current = i;
            }
        }
        departTable_cellX.current = e.clientX;
        let sbWidth = window.getComputedStyle(q_cells[departTable_cellIndex.current]).width;
        departTable_cellWidth.current = parseInt(sbWidth, 10);
        departTable_resizableStatus.current = true;
    }

    const departTable_handleMouseMove = (e) => {
        const q_cells = $$('.DepartmentTable-depart-cell');
        const dx = e.clientX - departTable_cellX.current
        const cw = departTable_cellWidth.current + dx;
        if (departTable_resizableStatus.current) {
            q_cells[departTable_cellIndex.current].style.width = `${ cw }px`;
        }
    }

    const departTable_handleMouseUp = (e) => {
        departTable_resizableStatus.current = false;
    }

    return (
        <div className='DepartmentTable'>
            <div>
                <h4>Table Department</h4>
            </div>
            <div className='DepartmentTable-depart'
                onMouseMove={(e) => departTable_handleMouseMove(e)}
                onMouseUp={(e) => departTable_handleMouseUp(e)}
            >
                <div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>STT</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Name of departed</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Amount</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Sold</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Remain</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Recover</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Turnover</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Return</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Address of NOT chest</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Public chest</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Chest position</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Address of chest</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Payment method type of chest employ</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Chest code</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Employ time</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Label</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Note</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                </div>
            </div>
            <div>
                <h4>Types</h4>
            </div>
            <div>
                <h4>Table Medication</h4>
            </div>
            <div className='DepartmentTable-depart'
                onMouseMove={(e) => departTable_handleMouseMove(e)}
                onMouseUp={(e) => departTable_handleMouseUp(e)}
            >
                <div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>STT</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Name of medication</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Amount</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Sold</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Remain</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Recover</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Turnover</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Return</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Cell stt</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                    <div className='DepartmentTable-depart-cell'>
                        <div><strong>Note</strong></div>
                        <div onMouseDown={(e) => departTable_handleMouseDown(e)}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(DepartmentTable);
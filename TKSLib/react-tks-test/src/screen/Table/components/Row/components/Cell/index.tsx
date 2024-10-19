import React, { FC, useEffect, useContext } from 'react';
import './styles.css';

import { ContextTable } from 'screen/Table/contextTable';

import { CellProps } from 'define';
import { $$ } from 'tricks';


const Cell: FC<{data: CellProps, index: number}> = ({ data, index: cellIndex }) => {

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }

    const { resizableStatus, cellWidth, cellX } = context;

    useEffect(() => {
        const q_Cell = $$('.TKS-Cell')[cellIndex] as HTMLElement;

        data?.width && q_Cell.style.setProperty('--Cell-width', data?.width);
        data?.height && q_Cell.style.setProperty('--Cell-height', data?.height);
        data?.textColor && q_Cell.style.setProperty('--Cell-textColor', data?.textColor);
        data?.textWeight && q_Cell.style.setProperty('--Cell-textWeight', data?.textWeight);

    }, [cellIndex, data])

    const handleMouseDown = (e: React.MouseEvent) => {
        const q_cells = $$('.TKS-Cell');
        cellX.current = e.clientX;
        let sbWidth = window.getComputedStyle(q_cells[cellIndex]).width;
        cellWidth.current = parseInt(sbWidth, 10);
        resizableStatus.current = true;
    }

    return <div className="TKS-Cell">
        <div>{ data.content }</div>
        <div onMouseDown={(e) => handleMouseDown(e)}></div>
    </div>;
};

export default Cell;
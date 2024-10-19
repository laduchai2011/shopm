import React, { FC, useContext } from 'react';
import './styles.css';

import { ContextTable } from 'screen/Table/contextTable';

import { 
    RowProps,
    CellProps 
} from 'define';
import { $$ } from 'tricks';

import Cell from './components/Cell';


const Row: FC<{data: RowProps, index: number}> = ({ data: rowData, index: rowIndex }) => {

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }

    const { resizableStatus, cellWidth, cellX } = context;

    const handleMouseMove = (e: React.MouseEvent) => {
        const q_cells = $$('.TKS-Cell');
        const dx = e.clientX - cellX.current;
        const cw = cellWidth.current + dx;
        if (resizableStatus.current) {
            // for (let x = 0; x < pageSize + 1; x++) {
            //     q_cells[cellIndex.current + 7*x].style.width = `${ cw }px`;
            // }
        }
    }

    const handleTableIndex = (columnAmount: number, rowIndex: number, cellIndex: number): number => {
        return columnAmount*rowIndex + cellIndex;
    }

    const list_cell: React.ReactNode = rowData.cells.map((data: CellProps, index: number) => {
        return (
            <Cell data={data} index={handleTableIndex(rowData.cells.length, rowIndex, index)} key={index} />
        )
    })

    return <div className="TKS-Row"  onMouseMove={(e) => handleMouseMove(e)}>
       { list_cell }
    </div>;
};

export default Row;
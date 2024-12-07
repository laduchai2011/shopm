import React, { FC, useContext } from 'react';
import './styles.css';

import { ContextTable } from 'Components/Table/contextTable';

import { 
    RowProps,
    CellProps 
} from 'define';
import { $$ } from 'tricks';

import Cell from './components/Cell';


const Row: FC<{data: RowProps, rowIndex: number}> = ({ data: rowData, rowIndex }) => {

    // console.log('Row', rowIndex)

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }

    const { resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount, config, pageIndex } = context;

    columnAmount.current = rowData.cells.length;

    const pageSize = config.pageSize;

    const handleMouseMove = (e: React.MouseEvent) => {
        const q_cells = $$('.TKS-Cell');
        const dx = e.clientX - cellX.current;
        const cw = cellWidth.current + dx;
        if (resizableStatus.current && selectedColumn.current!==undefined) {
            for (let i = 0; i < rowAmount.current; i++) {
                const qq_cells = q_cells[(columnAmount.current*i + selectedColumn.current)] as HTMLElement;
                qq_cells.style.width = `${ cw }px`;
            }
        }
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        resizableStatus.current = false;
        const q_cells = $$('.TKS-Cell');
        if (selectedColumn.current!==undefined) {
            for (let i = 0; i < rowAmount.current; i++) {
                const qq_cells = q_cells[(columnAmount.current*i + selectedColumn.current)] as HTMLElement;
                qq_cells.children[1].classList.remove('selected');
            }
        }
    }

    const handleTableIndex = (columnAmount: number, rowIndex: number, cellIndex: number): number => {
        return columnAmount*rowIndex + cellIndex;
    }

    const list_cell: React.ReactNode = rowData.cells.map((data: CellProps, index: number) => {
        return (
            <Cell data={data} cellIndex={handleTableIndex(rowData.cells.length, rowIndex, index)} rowIndex={rowIndex} column={index} key={index} />
        )
    })

    const dataIndex: number = pageSize*(pageIndex - 1) + rowIndex; 

    return <div className="TKS-Row" 
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseUp={(e) => handleMouseUp(e)}
            >
            <div className='TKS-Row-indexColumn'>
                {rowIndex > 0 ? <div>{ rowIndex }</div> : <div>{ config.pageSize }</div> }
                {rowIndex > 0 ? <div>{ dataIndex }</div> : <div>{ config.maxRow }</div> }
            </div>
            <div className='TKS-Row-column'>
                { list_cell }
            </div>
    </div>;
};

export default React.memo(Row);
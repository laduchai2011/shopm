import React, { FC, useContext, useRef, useEffect } from 'react';
import './styles.css';

import { ContextTable } from '../../contextTable';

import { 
    RowProps,
    CellProps 
} from '../../../../define';

import Cell from './components/Cell';


const Row: FC<{data: RowProps, rowIndex: number}> = ({ data: rowData, rowIndex }) => {

    // console.log('Row', rowIndex)

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('Context in row is undefined');
    }

    const { 
        table, 
        default_pageSize, 
        default_maxRow, 
        cellElements, 
        resizableStatus, 
        cellWidth, 
        cellX, 
        selectedColumn, 
        columnAmount, 
        rowAmount, 
        pageIndex 
    } = context;

    const rowElement = useRef<HTMLDivElement | null>(null);
    const isSelectedRow = useRef<boolean>(false);

    if (rowData?.cells) {
        columnAmount.current = rowData.cells.length;
    }

    const pageSize = useRef<number>(default_pageSize);
    const maxRow = useRef<number>(default_maxRow);

    if (table?.config?.pageSize) {
        pageSize.current = table.config.pageSize;
    }
    if (table?.config?.maxRow) {
        maxRow.current = table.config.maxRow;
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // const q_cells = $$('.TKS-Cell');
            const q_cells = cellElements.current;
            const dx = e.clientX - cellX.current;
            const cw = cellWidth.current + dx;
            if (resizableStatus.current && selectedColumn.current!==undefined) {
                for (let i = 0; i < rowAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current*i + selectedColumn.current)] as HTMLElement;
                    qq_cells.style.width = `${ cw }px`;
                }
            }
        }
        const handleMouseUp = (e: MouseEvent) => {
            resizableStatus.current = false;
            // const q_cells = $$('.TKS-Cell');
            const q_cells = cellElements.current;
            if (selectedColumn.current!==undefined) {
                for (let i = 0; i < rowAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current*i + selectedColumn.current)] as HTMLElement;
                    qq_cells.children[1].classList.remove('selected');
                }
            }
        }
        const handleMouseLeave = (e: MouseEvent) => {
            resizableStatus.current  = false;
        }

        document.addEventListener('mousemove', (e) => handleMouseMove(e));
        document.addEventListener('mouseup', (e) => handleMouseUp(e));
        document.addEventListener('mouseleave', (e) => handleMouseLeave(e));

        return () => {
            document.removeEventListener('mousemove', (e) => handleMouseMove(e));
            document.removeEventListener('mouseup', (e) => handleMouseUp(e));
            document.removeEventListener('mouseleave', (e) => handleMouseLeave(e));
        }
    }, [cellElements, cellWidth, cellX, columnAmount, resizableStatus, rowAmount, selectedColumn])

    const handleHoverIn = (e: React.MouseEvent) => {
        const hoverColor: string = 'rgb(233, 233, 233)';
        if (rowElement.current && rowIndex > 0) {
           rowElement.current.style.setProperty('--background-color', hoverColor);
        }
    }
    const handleHoverOut = (e: React.MouseEvent) => {
        const hoverColor: string = 'white';
        if (rowElement.current && !isSelectedRow.current) {
           rowElement.current.style.setProperty('--background-color', hoverColor);
        }
    }
    const handleClick = (e: React.MouseEvent) => {
        isSelectedRow.current = !isSelectedRow.current;
    }

    const handleTableIndex = (columnAmount: number, rowIndex: number, cellIndex: number): number => {
        return columnAmount*rowIndex + cellIndex;
    }

    const list_cell: React.ReactNode = rowData?.cells && rowData.cells.map((data: CellProps, index: number) => {
        return rowData?.cells && (
            <Cell data={data} cellIndex={handleTableIndex(rowData.cells.length, rowIndex, index)} rowIndex={rowIndex} column={index} key={index} />
        )
    })

    const dataIndex: number = pageSize.current ? pageSize.current*(pageIndex - 1) + rowIndex : 0; 

    return <div className="TKS-Row" 
                ref={rowElement}
                // handle hover
                onMouseOver={e => handleHoverIn(e)}
                onMouseOut={e => handleHoverOut(e)}
                onClick={e => handleClick(e)}
            >
            <div className='TKS-Row-indexColumn'>
                {/* {rowIndex > 0 ? <div>{ rowIndex }</div> : <div>
                    { table?.config?.pageSize ? <div>{table?.config?.pageSize}</div> : <div>1</div> }
                </div> } */}
                {/* {rowIndex > 0 ? <div>{ dataIndex }</div> : <div>
                    { table?.config?.maxRow ? <div>{table?.config?.maxRow}</div> : <div>1</div> }
                </div> } */}
                { rowIndex > 0 ? <div>{ rowIndex }</div> : <div>{ pageSize.current }</div> }
                { rowIndex > 0 ? <div>{ dataIndex }</div> : <div>{ maxRow.current }</div> }
            </div>
            <div className='TKS-Row-column'>
                { list_cell }
            </div>
    </div>;
};

export default React.memo(Row);
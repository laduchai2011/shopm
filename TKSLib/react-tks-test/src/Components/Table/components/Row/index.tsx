import React, { FC, useContext, useRef, useEffect } from 'react';
import './styles.css';

import { ContextTable } from 'src/components/Table/contextTable';

import { 
    RowProps,
    CellProps 
} from 'src/define';

import Cell from './components/Cell';

import { 
    rowHoverIn,
    rowHoverOut,
    rowToggle 
} from '../utils';

import { clickStatus_of_row_Types } from '../utils/type';
import { CLICK_STATUS_TYPE } from '../utils/const';

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
        elements,
        row_hoverColor
    } = context;

    // const rowElement = useRef<HTMLDivElement | null>(null);
    const element_rowsOfIndex: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.rowsOfIndex;
    const element_rows: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.rows;
    const element_rowsOfCalculate: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.rowsOfCalculate;
    // const isSelectedRow = useRef<boolean>(false);

    const clickStatus_of_row = useRef<clickStatus_of_row_Types>(CLICK_STATUS_TYPE.READY);

    useEffect(() => {
        if (element_rows.current[rowIndex] && rowIndex > 0) {
            (element_rows.current[rowIndex]!).style.setProperty('--background-color', row_hoverColor);
        }
    }, [element_rows, rowIndex, row_hoverColor])

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

    // handle resizable
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
        if (rowIndex > 0) {
            rowHoverIn(rowIndex, element_rowsOfIndex, element_rows, element_rowsOfCalculate)
        }
    }
    const handleHoverOut = (e: React.MouseEvent) => {
        if (rowIndex > 0) {
            rowHoverOut(rowIndex, element_rowsOfIndex, element_rows, element_rowsOfCalculate)
        }
    }
    const handleClick = (e: React.MouseEvent) => {
        if ((rowIndex > 0) && (clickStatus_of_row.current===CLICK_STATUS_TYPE.READY)) {
            rowToggle(rowIndex, element_rowsOfIndex, element_rows, element_rowsOfCalculate);
        }
    }
    const handleMouseDown = (e: React.MouseEvent) => {
        clickStatus_of_row.current = CLICK_STATUS_TYPE.READY;
        setTimeout(() => {
            clickStatus_of_row.current = CLICK_STATUS_TYPE.LOCKED;
        }, 200)
    }

    const handleTableIndex = (columnAmount: number, rowIndex: number, cellIndex: number): number => {
        return columnAmount*rowIndex + cellIndex;
    }

    const list_cell: React.ReactNode = rowData?.cells && rowData.cells.map((data: CellProps, index: number) => {
        return rowData?.cells && (
            <Cell data={data} cellIndex={handleTableIndex(rowData.cells.length, rowIndex, index)} rowIndex={rowIndex} column={index} key={index} />
        )
    })

    // const dataIndex: number = pageSize.current ? pageSize.current*(pageIndex - 1) + rowIndex : 0; 

    return <div className="TKS-Row" 
                // ref={rowElement}
                ref={(el) => (element_rows.current[rowIndex] = el)}
                // handle hover
                onMouseOver={e => handleHoverIn(e)}
                onMouseOut={e => handleHoverOut(e)}
                onClick={e => handleClick(e)}
                onMouseDown={(e)=> handleMouseDown(e)}
            >
            {/* <div className='TKS-Row-indexColumn'>
                { rowIndex > 0 ? <div>{ rowIndex }</div> : <div>{ pageSize.current }</div> }
                { rowIndex > 0 ? <div>{ dataIndex }</div> : <div>{ maxRow.current }</div> }
            </div> */}
            <div className='TKS-Row-column'>
                { list_cell }
            </div>
            {/* <div className='TKS-Row-buttonColumn'>
                <div><button>dsfsdf</button></div>
            </div> */}
    </div>;
};

export default React.memo(Row);
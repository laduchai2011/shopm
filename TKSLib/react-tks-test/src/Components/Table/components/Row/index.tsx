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
import { 
    CLICK_STATUS_TYPE
} from '../utils/const';

import { handleCutPXInString } from 'src/utils/string';


const Row: FC<{data: RowProps, rowIndex: number}> = ({ data: rowData, rowIndex }) => {

    // console.log('Row', rowIndex)

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('Context in Row component cant undefined !');
    }

    const { 
        table, 
        default_pageSize, 
        default_maxRow, 
        columnAmount, 
        rowAmount, 
        elements,
        row_hoverColor,
        resizable
    } = context;

    const element_rowsOfIndex: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.rowsOfIndex;
    const element_rows: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.rows;
    const element_rowsOfCalculate: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.rowsOfCalculate;
    const element_cells: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.cells;

    // resizable
    const cell_X: React.MutableRefObject<number> = resizable.current.cell_X;
    const cell_Y: React.MutableRefObject<number> = resizable.current.cell_Y;
    const cellWidth: React.MutableRefObject<number> = resizable.current.cellWidth;
    const cellHeight: React.MutableRefObject<number> = resizable.current.cellHeight;
    const isResizable_X: React.MutableRefObject<boolean> = resizable.current.isResizable_X;
    const isResizable_Y: React.MutableRefObject<boolean> = resizable.current.isResizable_Y;
    const selectedColumn: React.MutableRefObject<number | undefined> = resizable.current.selectedColumn;
    const selectedRow: React.MutableRefObject<number | undefined> = resizable.current.selectedRow;

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
            const q_cells = element_cells.current;

            const dx = e.clientX - cell_X.current;
            const cw = cellWidth.current + dx;
            if (isResizable_X.current && selectedColumn.current!==undefined) {
                for (let i: number = 0; i < rowAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current*i + selectedColumn.current)] as HTMLElement;
                    qq_cells.style.width = `${ cw }px`;
                }
            } 

            const dy = e.clientY - cell_Y.current;
            const ch = cellHeight.current + dy;
            if (isResizable_Y.current && selectedRow.current!==undefined) {
                for (let i: number = 0; i < columnAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current*selectedRow.current + i)] as HTMLElement;
                    qq_cells.style.height = `${ ch }px`;
                    (element_rowsOfIndex.current[selectedRow.current]!).style.height = `${ ch }px`;
                    if (element_rowsOfCalculate.current[selectedRow.current]) {
                        (element_rowsOfCalculate.current[selectedRow.current]!).style.height = `${ ch }px`;
                    }

                    // set line-clamp
                    const fontSize: string = window.getComputedStyle(qq_cells).fontSize;
                    const fontSize_number = handleCutPXInString(fontSize)
                    const line_clamp: number = Math.floor(ch / Number(fontSize_number)) - 1;
                    if (qq_cells) {
                        qq_cells.style.setProperty('--Cell-line-clamp', line_clamp.toString());
                    }
                    // console.log(line_clamp, fontSize, fontSize_number, Number(fontSize_number))
                }
            } 
        }
        const handleMouseUp = (e: MouseEvent) => {
            const q_cells = element_cells.current;

            isResizable_X.current = false;
            if (selectedColumn.current!==undefined) {
                for (let i: number = 0; i < rowAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current*i + selectedColumn.current)] as HTMLElement;
                    qq_cells.children[2].classList.remove('selected');
                }
            }

            isResizable_Y.current = false;
            if (selectedRow.current!==undefined) {
                for (let i: number = 0; i < columnAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current*selectedRow.current + i)] as HTMLElement;
                    qq_cells.children[3].classList.remove('selected');
                }
            }
        }
        const handleMouseLeave = (e: MouseEvent) => {
            isResizable_X.current  = false;
            isResizable_Y.current  = false;
        }

        document.addEventListener('mousemove', (e) => handleMouseMove(e));
        document.addEventListener('mouseup', (e) => handleMouseUp(e));
        document.addEventListener('mouseleave', (e) => handleMouseLeave(e));

        return () => {
            document.removeEventListener('mousemove', (e) => handleMouseMove(e));
            document.removeEventListener('mouseup', (e) => handleMouseUp(e));
            document.removeEventListener('mouseleave', (e) => handleMouseLeave(e));
        }
    }, [
        element_rowsOfIndex,
        element_rowsOfCalculate,
        element_cells, 
        cellWidth, 
        cellHeight, 
        cell_X, 
        cell_Y, 
        isResizable_X, 
        isResizable_Y, 
        columnAmount, 
        rowAmount, 
        selectedColumn, 
        selectedRow
    ])

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
            <Cell data={data} cellIndex={handleTableIndex(rowData.cells.length, rowIndex, index)} rowIndex={rowIndex} columnIndex={index} key={index} />
        )
    })

    return <div className="TKS-Row" 
        ref={(el) => (element_rows.current[rowIndex] = el)}
        // handle hover
        onMouseOver={e => handleHoverIn(e)}
        onMouseOut={e => handleHoverOut(e)}
        onClick={e => handleClick(e)}
        onMouseDown={(e)=> handleMouseDown(e)}
    >
        <div className='TKS-Row-column'>
            { list_cell }
        </div>
    </div>;
};

export default React.memo(Row);
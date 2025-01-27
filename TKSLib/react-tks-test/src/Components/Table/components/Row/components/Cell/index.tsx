import React, { FC, useEffect, useContext } from 'react';
import './styles.css';

import { ContextTable } from 'src/components/Table/contextTable';
import Loading from 'src/components/Loading';

import { 
    CellProps,
    LoadProps,
    SkeletonLoadProps 
} from 'src/define';

import { 
    LOAD_STATE,
    LOAD_COMPONENTS_CONST, 
    TABLE_CONST
} from 'src/const';


const Cell: FC<{data: CellProps, cellIndex: number, rowIndex: number, columnIndex: number}> = ({ data, cellIndex, rowIndex, columnIndex }) => {

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('Context in Cell component cant undefined !');
    }

    const { 
        table, 
        columnAmount, 
        rowAmount,
        elements,
        resizable 
    } = context;

    const loadDataState: string | undefined = table?.control?.loadDataState;

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

    useEffect(() => {
        const q_Cell = element_cells.current[cellIndex];

        if (q_Cell) {
            data?.width && q_Cell.style.setProperty('--Cell-width', data?.width);
            data?.height && q_Cell.style.setProperty('--Cell-height', data?.height);
            data?.textColor && q_Cell.style.setProperty('--Cell-textColor', data?.textColor);
            data?.textWeight && q_Cell.style.setProperty('--Cell-textWeight', data?.textWeight);
        }
    }, [element_cells, cellIndex, data])

    const handleMouseDown = (e: React.MouseEvent, type: string) => {
        const q_cells = element_cells.current;

        if (type===TABLE_CONST.RESIZABLE.CELL.TYPE.WIDTH) {
            cell_X.current = e.clientX;
            let sbWidth = window.getComputedStyle(q_cells[cellIndex]!).width;
            cellWidth.current = parseInt(sbWidth, 10);
            isResizable_X.current = true;
            selectedColumn.current = columnIndex;
            if (isResizable_X.current && selectedColumn.current!==undefined) {
                for (let i: number = 0; i < rowAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current*i + selectedColumn.current)] as HTMLElement;
                    qq_cells.children[2].classList.add('selected');
                }
            }
        }

        if (type===TABLE_CONST.RESIZABLE.CELL.TYPE.HEIGHT) {
            cell_Y.current = e.clientY;
            let sbHeight = window.getComputedStyle(q_cells[cellIndex]!).height;
            cellHeight.current = parseInt(sbHeight, 10);
            isResizable_Y.current = true;
            selectedRow.current = rowIndex;
            if (isResizable_Y.current && selectedRow.current!==undefined) {
                for (let i: number = 0; i < columnAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current*selectedRow.current + i)] as HTMLElement;
                    qq_cells.children[3].classList.add('selected');
                }
            }
        }
    }

    const skeletonLoad: SkeletonLoadProps = {
        width: 100,
        height: 100,
        maxminWidth: 'max'
    }

    const load: LoadProps = {
        type: LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON,
        infor: skeletonLoad
    }

    return <div className="TKS-Cell" ref={(el) => (element_cells.current[cellIndex] = el)}>
        <div>
            { loadDataState===LOAD_STATE.LOADING && rowIndex!==0 && <Loading load={ load } /> }
        </div>
        <div title={data.content}>{ `${data.content}` }</div>
        <div onMouseDown={(e) => handleMouseDown(e, TABLE_CONST.RESIZABLE.CELL.TYPE.WIDTH)}></div>
        <div onMouseDown={(e) => handleMouseDown(e, TABLE_CONST.RESIZABLE.CELL.TYPE.HEIGHT)}></div>
    </div>;
};

export default Cell;
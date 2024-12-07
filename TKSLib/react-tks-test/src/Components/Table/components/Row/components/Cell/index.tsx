import React, { FC, useEffect, useContext } from 'react';
import './styles.css';

import { ContextTable } from 'Components/Table/contextTable';
import Loading from 'Components/Loading';

import { 
    CellProps,
    LoadProps,
    SkeletonLoadProps 
} from 'define';

import { 
    LOAD_STATE,
    LOAD_COMPONENTS_CONST 
} from 'const';


const Cell: FC<{data: CellProps, cellIndex: number, rowIndex: number, column: number}> = ({ data, cellIndex, rowIndex, column }) => {

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }

    const { table, cellElements, resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount } = context;

    const loadDataState: string | undefined = table?.control?.loadDataState;

    useEffect(() => {
        // const q_Cell = $$('.TKS-Cell')[cellIndex] as HTMLElement;
        const q_Cell = cellElements.current[cellIndex];

        if (q_Cell) {
            data?.width && q_Cell.style.setProperty('--Cell-width', data?.width);
            data?.height && q_Cell.style.setProperty('--Cell-height', data?.height);
            data?.textColor && q_Cell.style.setProperty('--Cell-textColor', data?.textColor);
            data?.textWeight && q_Cell.style.setProperty('--Cell-textWeight', data?.textWeight);
        }
    }, [cellElements, cellIndex, data])

    const handleMouseDown = (e: React.MouseEvent) => {
        // const q_cells = $$('.TKS-Cell');
        const q_cells = cellElements.current;
        cellX.current = e.clientX;
        let sbWidth = window.getComputedStyle(q_cells[cellIndex]!).width;
        cellWidth.current = parseInt(sbWidth, 10);
        resizableStatus.current = true;
        selectedColumn.current = column;
        if (resizableStatus.current && selectedColumn.current!==undefined) {
            for (let i = 0; i < rowAmount.current; i++) {
                const qq_cells = q_cells[(columnAmount.current*i + selectedColumn.current)] as HTMLElement;
                qq_cells.children[1].classList.add('selected');
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

    return <div className="TKS-Cell" ref={(el) => (cellElements.current[cellIndex] = el)}>
        <div>
            { loadDataState===LOAD_STATE.LOADING && rowIndex!==0 && <Loading load={ load } /> }
        </div>
        <div>{ data.content }</div>
        <div onMouseDown={(e) => handleMouseDown(e)}></div>
    </div>;
};

export default Cell;
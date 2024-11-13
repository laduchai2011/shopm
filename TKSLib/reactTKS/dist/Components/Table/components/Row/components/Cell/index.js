import React, { useEffect, useContext } from 'react';
import './styles.css';
import { ContextTable } from 'Components/Table/contextTable';
import Loading from 'Components/Loading';
import { LOAD_STATE, LOAD_COMPONENTS_CONST } from 'const';
import { $$ } from 'tricks';
const Cell = ({ data, cellIndex, rowIndex, column }) => {
    const context = useContext(ContextTable);
    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }
    const { resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount, loadDataState } = context;
    useEffect(() => {
        const q_Cell = $$('.TKS-Cell')[cellIndex];
        if (q_Cell !== undefined) {
            (data === null || data === void 0 ? void 0 : data.width) && q_Cell.style.setProperty('--Cell-width', data === null || data === void 0 ? void 0 : data.width);
            (data === null || data === void 0 ? void 0 : data.height) && q_Cell.style.setProperty('--Cell-height', data === null || data === void 0 ? void 0 : data.height);
            (data === null || data === void 0 ? void 0 : data.textColor) && q_Cell.style.setProperty('--Cell-textColor', data === null || data === void 0 ? void 0 : data.textColor);
            (data === null || data === void 0 ? void 0 : data.textWeight) && q_Cell.style.setProperty('--Cell-textWeight', data === null || data === void 0 ? void 0 : data.textWeight);
        }
    }, [cellIndex, data]);
    const handleMouseDown = (e) => {
        const q_cells = $$('.TKS-Cell');
        cellX.current = e.clientX;
        let sbWidth = window.getComputedStyle(q_cells[cellIndex]).width;
        cellWidth.current = parseInt(sbWidth, 10);
        resizableStatus.current = true;
        selectedColumn.current = column;
        if (resizableStatus.current && selectedColumn.current !== undefined) {
            for (let i = 0; i < rowAmount.current; i++) {
                const qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                qq_cells.children[1].classList.add('selected');
            }
        }
    };
    const skeletonLoad = {
        width: 100,
        height: 100,
        maxminWidth: 'max'
    };
    const load = {
        type: LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON,
        infor: skeletonLoad
    };
    return React.createElement("div", { className: "TKS-Cell" },
        React.createElement("div", null, loadDataState === LOAD_STATE.LOADING && rowIndex !== 0 && React.createElement(Loading, { load: load })),
        React.createElement("div", null, data.content),
        React.createElement("div", { onMouseDown: (e) => handleMouseDown(e) }));
};
export default Cell;

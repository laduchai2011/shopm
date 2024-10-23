import React, { useContext } from 'react';
import './styles.css';
// import { ContextTable } from 'Table/contextTable';
import { ContextTable } from '../../../Table/contextTable';
// import { $$ } from 'tricks/index';
import { $$ } from '../../../tricks/index';
import Cell from './components/Cell/index';
const Row = ({ data: rowData, index: rowIndex }) => {
    const context = useContext(ContextTable);
    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }
    const { resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount } = context;
    columnAmount.current = rowData.cells.length;
    const handleMouseMove = (e) => {
        const q_cells = $$('.TKS-Cell');
        const dx = e.clientX - cellX.current;
        const cw = cellWidth.current + dx;
        if (resizableStatus.current && selectedColumn.current !== undefined) {
            for (let i = 0; i < rowAmount.current; i++) {
                const qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                qq_cells.style.width = `${cw}px`;
            }
        }
    };
    const handleMouseUp = (e) => {
        resizableStatus.current = false;
        const q_cells = $$('.TKS-Cell');
        if (selectedColumn.current !== undefined) {
            for (let i = 0; i < rowAmount.current; i++) {
                const qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                qq_cells.children[1].classList.remove('selected');
            }
        }
    };
    const handleTableIndex = (columnAmount, rowIndex, cellIndex) => {
        return columnAmount * rowIndex + cellIndex;
    };
    const list_cell = rowData.cells.map((data, index) => {
        return (React.createElement(Cell, { data: data, index: handleTableIndex(rowData.cells.length, rowIndex, index), column: index, key: index }));
    });
    return React.createElement("div", { className: "TKS-Row", onMouseMove: (e) => handleMouseMove(e), onMouseUp: (e) => handleMouseUp(e) }, list_cell);
};
export default Row;

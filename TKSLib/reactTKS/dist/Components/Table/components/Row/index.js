import React, { useContext } from 'react';
import './styles.css';
import { ContextTable } from 'Components/Table/contextTable';
import { $$ } from 'tricks';
import Cell from './components/Cell';
const Row = ({ data: rowData, rowIndex }) => {
    // console.log('Row', rowIndex)
    const context = useContext(ContextTable);
    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }
    const { resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount, config, pageIndex } = context;
    columnAmount.current = rowData.cells.length;
    const pageSize = config.pageSize;
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
        return (React.createElement(Cell, { data: data, cellIndex: handleTableIndex(rowData.cells.length, rowIndex, index), rowIndex: rowIndex, column: index, key: index }));
    });
    const dataIndex = pageSize * (pageIndex - 1) + rowIndex;
    return React.createElement("div", { className: "TKS-Row", onMouseMove: (e) => handleMouseMove(e), onMouseUp: (e) => handleMouseUp(e) },
        React.createElement("div", { className: 'TKS-Row-indexColumn' },
            rowIndex > 0 ? React.createElement("div", null, rowIndex) : React.createElement("div", null, config.pageSize),
            rowIndex > 0 ? React.createElement("div", null, dataIndex) : React.createElement("div", null, config.maxRow)),
        React.createElement("div", { className: 'TKS-Row-column' }, list_cell));
};
export default React.memo(Row);

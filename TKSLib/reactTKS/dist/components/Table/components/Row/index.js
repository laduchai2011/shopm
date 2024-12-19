import React, { useContext, useRef, useEffect } from 'react';
import './styles.css';
import { ContextTable } from 'components/Table/contextTable';
import Cell from './components/Cell';
const Row = ({ data: rowData, rowIndex }) => {
    // console.log('Row', rowIndex)
    var _a, _b;
    const context = useContext(ContextTable);
    if (!context) {
        throw new Error('Context in row is undefined');
    }
    const { table, default_pageSize, default_maxRow, cellElements, resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount, pageIndex } = context;
    const rowElement = useRef(null);
    const isSelectedRow = useRef(false);
    if (rowData === null || rowData === void 0 ? void 0 : rowData.cells) {
        columnAmount.current = rowData.cells.length;
    }
    const pageSize = useRef(default_pageSize);
    const maxRow = useRef(default_maxRow);
    if ((_a = table === null || table === void 0 ? void 0 : table.config) === null || _a === void 0 ? void 0 : _a.pageSize) {
        pageSize.current = table.config.pageSize;
    }
    if ((_b = table === null || table === void 0 ? void 0 : table.config) === null || _b === void 0 ? void 0 : _b.maxRow) {
        maxRow.current = table.config.maxRow;
    }
    useEffect(() => {
        const handleMouseMove = (e) => {
            // const q_cells = $$('.TKS-Cell');
            const q_cells = cellElements.current;
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
            // const q_cells = $$('.TKS-Cell');
            const q_cells = cellElements.current;
            if (selectedColumn.current !== undefined) {
                for (let i = 0; i < rowAmount.current; i++) {
                    const qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                    qq_cells.children[1].classList.remove('selected');
                }
            }
        };
        const handleMouseLeave = (e) => {
            resizableStatus.current = false;
        };
        document.addEventListener('mousemove', (e) => handleMouseMove(e));
        document.addEventListener('mouseup', (e) => handleMouseUp(e));
        document.addEventListener('mouseleave', (e) => handleMouseLeave(e));
        return () => {
            document.removeEventListener('mousemove', (e) => handleMouseMove(e));
            document.removeEventListener('mouseup', (e) => handleMouseUp(e));
            document.removeEventListener('mouseleave', (e) => handleMouseLeave(e));
        };
    }, [cellElements, cellWidth, cellX, columnAmount, resizableStatus, rowAmount, selectedColumn]);
    const handleHoverIn = (e) => {
        const hoverColor = 'rgb(233, 233, 233)';
        if (rowElement.current && rowIndex > 0) {
            rowElement.current.style.setProperty('--background-color', hoverColor);
        }
    };
    const handleHoverOut = (e) => {
        const hoverColor = 'white';
        if (rowElement.current && !isSelectedRow.current) {
            rowElement.current.style.setProperty('--background-color', hoverColor);
        }
    };
    const handleClick = (e) => {
        isSelectedRow.current = !isSelectedRow.current;
    };
    const handleTableIndex = (columnAmount, rowIndex, cellIndex) => {
        return columnAmount * rowIndex + cellIndex;
    };
    const list_cell = (rowData === null || rowData === void 0 ? void 0 : rowData.cells) && rowData.cells.map((data, index) => {
        return (rowData === null || rowData === void 0 ? void 0 : rowData.cells) && (React.createElement(Cell, { data: data, cellIndex: handleTableIndex(rowData.cells.length, rowIndex, index), rowIndex: rowIndex, column: index, key: index }));
    });
    const dataIndex = pageSize.current ? pageSize.current * (pageIndex - 1) + rowIndex : 0;
    return React.createElement("div", { className: "TKS-Row", ref: rowElement, 
        // handle hover
        onMouseOver: e => handleHoverIn(e), onMouseOut: e => handleHoverOut(e), onClick: e => handleClick(e) },
        React.createElement("div", { className: 'TKS-Row-indexColumn' },
            rowIndex > 0 ? React.createElement("div", null, rowIndex) : React.createElement("div", null, pageSize.current),
            rowIndex > 0 ? React.createElement("div", null, dataIndex) : React.createElement("div", null, maxRow.current)),
        React.createElement("div", { className: 'TKS-Row-column' }, list_cell));
};
export default React.memo(Row);

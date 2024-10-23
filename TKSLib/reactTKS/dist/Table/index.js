import React, { useRef } from 'react';
import './styles.css';
import { ContextTable } from './contextTable';
// import { 
//     RowProps,
//     TableProps 
// } from '../define/index';
import Row from './components/Row/index';
import Control from './components/Control/index';
const Table = ({ data: tableData }) => {
    const resizableStatus = useRef(false);
    const cellWidth = useRef(0);
    const cellX = useRef(0);
    const selectedColumn = useRef(undefined);
    const columnAmount = useRef(0);
    const rowAmount = useRef(0);
    rowAmount.current = tableData.rows.length;
    const list_row = tableData.rows.map((data, index) => {
        return (React.createElement(Row, { data: data, index: index, key: index }));
    });
    return React.createElement(ContextTable.Provider, { value: { resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount } },
        React.createElement("div", { className: "TKS-Table" },
            React.createElement("div", null,
                React.createElement(Control, { data: tableData.tableControl })),
            React.createElement("div", null, list_row)),
        ";");
};
export default Table;

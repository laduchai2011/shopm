import React, { useRef, useMemo, useState } from 'react';
import './styles.css';
import { ContextTable } from './contextTable';
import { WARNING_COLOR } from 'const';
import Row from './components/Row';
import Control from './components/Control';
const Table = ({ data, config, onSelectPage, loadDataState }) => {
    var _a, _b;
    const indexInit = 1;
    const tableControlData = {
        pageIndex: indexInit,
        pageSize: config.pageSize,
        maxRow: config.maxRow
    };
    // const init: React.MutableRefObject<boolean> = useRef(false);
    const resizableStatus = useRef(false);
    const cellWidth = useRef(0);
    const cellX = useRef(0);
    const selectedColumn = useRef(undefined);
    const columnAmount = useRef(0);
    const rowAmount = useRef(0);
    const [pageIndex, setPageIndex] = useState(indexInit);
    // const headerRow: React.MutableRefObject<RowProps> = useRef({
    //     cells: []
    // });
    const totalRow = useRef([]);
    rowAmount.current = data.length + 1;
    const rowForm = {
        cells: []
    };
    // set-up header oncly one time
    const cellHeader = (fieldName, content, textColor, textWeight) => {
        return {
            fieldName: fieldName,
            content: content,
            textColor: textColor,
            textWeight: textWeight
        };
    };
    const rowHeader = {
        cells: []
    };
    for (let i = 0; i < config.columnAmount; i++) {
        if ((config.columnsInfor !== undefined) && (config.columnsInfor[i] !== undefined)) {
            rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
        }
        else {
            rowHeader.cells.push(cellHeader('', `column ${i}`, 'black', '700'));
            rowForm.cells.push(cellHeader('', '', WARNING_COLOR, '300'));
        }
    }
    // headerRow.current = rowHeader;
    // set-up data
    // const cellData = (content: string): CellProps => {
    //     return {
    //         fieldName: '',
    //         content: content
    //     }
    // }
    const totalRow_m = [];
    for (let key = 0; key < data.length; key++) {
        // if (data.hasOwnProperty(key)) { 
        //     console.log(`log: ${key}: ${Object.keys(data[key])}`, data[key]);
        // }   
        // const rowData = { ...rowForm.current };
        const rowData = JSON.parse(JSON.stringify(rowForm));
        for (let i = 0; i < rowData.cells.length; i++) {
            const keyIndexInRow = Object.keys(data[key]).indexOf((_a = rowData.cells[i]) === null || _a === void 0 ? void 0 : _a.fieldName);
            if (keyIndexInRow !== -1) {
                const selectedKey = (_b = rowData.cells[i]) === null || _b === void 0 ? void 0 : _b.fieldName;
                rowData.cells[i].content = data[key][selectedKey];
            }
            else {
                rowData.cells[i].content = 'Empty';
                rowData.cells[i].textColor = WARNING_COLOR;
            }
        }
        totalRow_m.push(rowData);
    }
    totalRow_m.unshift(rowHeader);
    totalRow.current = totalRow_m;
    const tableProps = {
        tableControl: tableControlData,
        rows: totalRow.current
    };
    const handleControlPos = () => {
        if (config.controlPos === "bottom") {
            return 'bottom';
        }
        else {
            return 'top';
        }
    };
    const list_row = tableProps.rows.map((data, index) => {
        return (React.createElement(Row, { data: data, rowIndex: index, key: index }));
    });
    const contextValue = useMemo(() => ({
        resizableStatus,
        cellWidth,
        cellX,
        selectedColumn,
        columnAmount,
        rowAmount,
        config,
        pageIndex,
        setPageIndex,
        onSelectPage,
        loadDataState
    }), [config, onSelectPage, loadDataState, pageIndex, setPageIndex]);
    return React.createElement(ContextTable.Provider, { value: contextValue },
        React.createElement("div", { className: "TKS-Table" },
            handleControlPos() !== 'bottom' && React.createElement("div", { className: 'TKS-Table--Control' },
                React.createElement(Control, { data: tableProps.tableControl })),
            React.createElement("div", null, list_row),
            handleControlPos() === 'bottom' && React.createElement("div", { className: 'TKS-Table--Control' },
                React.createElement(Control, { data: tableProps.tableControl }))));
};
export default React.memo(Table);

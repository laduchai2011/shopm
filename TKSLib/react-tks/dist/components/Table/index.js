import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo, useState, useEffect } from 'react';
import './styles.css';
import { ContextTable } from './contextTable';
import { useFollowState } from 'myHooks';
import { WARNING_COLOR, LOAD_STATE } from 'const';
import Row from './components/Row';
import Control from './components/Control';
const Table = ({ table }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const config = Object.assign({}, table === null || table === void 0 ? void 0 : table.config);
    const isRender = ((_a = table === null || table === void 0 ? void 0 : table.config) === null || _a === void 0 ? void 0 : _a.columnsInfor) ? true : false;
    const data = (_b = table === null || table === void 0 ? void 0 : table.data) === null || _b === void 0 ? void 0 : _b.values;
    const resizableStatus = useRef(false);
    const cellWidth = useRef(0);
    const cellX = useRef(0);
    const selectedColumn = useRef(undefined);
    const columnAmount = useRef(0);
    const rowAmount = useRef(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [loadDataState, setLoadDataState] = useState(undefined);
    const totalRow = useRef([]);
    let isControl_pageIndex_defaultFunction = useRef(true);
    let isControl_loadDataState_defaultFunction = useRef(true);
    const default_pageSize = 10;
    const default_maxRow = 50;
    const pageSize = (_c = table === null || table === void 0 ? void 0 : table.config) === null || _c === void 0 ? void 0 : _c.pageSize;
    const maxRow = (_d = table === null || table === void 0 ? void 0 : table.config) === null || _d === void 0 ? void 0 : _d.maxRow;
    const registedStates = [
        {
            descrition: 'When load data',
            state: LOAD_STATE.LOADING
        },
        {
            descrition: 'When load success',
            state: LOAD_STATE.SUCCESS
        },
        {
            descrition: 'When load failure',
            state: LOAD_STATE.FAILURE
        },
        {
            descrition: 'When load ready',
            state: LOAD_STATE.READY
        }
    ];
    const follow_loadingState = useFollowState({
        config: {
            registerState: registedStates
        }
    });
    useEffect(() => {
        var _a, _b, _c, _d, _e;
        if (((_a = table === null || table === void 0 ? void 0 : table.control) === null || _a === void 0 ? void 0 : _a.pageIndex) !== undefined && ((_b = table === null || table === void 0 ? void 0 : table.control) === null || _b === void 0 ? void 0 : _b.pageIndex) !== null && ((_c = table === null || table === void 0 ? void 0 : table.control) === null || _c === void 0 ? void 0 : _c.pageIndex) < 1) {
            console.warn({
                message: 'pageIndex must is a number > 0',
                pageIndex: (_d = table === null || table === void 0 ? void 0 : table.control) === null || _d === void 0 ? void 0 : _d.pageIndex
            });
        }
        if ((_e = table === null || table === void 0 ? void 0 : table.control) === null || _e === void 0 ? void 0 : _e.pageIndex) {
            setPageIndex(table.control.pageIndex);
            isControl_pageIndex_defaultFunction.current = false;
        }
    }, [(_e = table === null || table === void 0 ? void 0 : table.control) === null || _e === void 0 ? void 0 : _e.pageIndex]);
    useEffect(() => {
        var _a;
        if ((_a = table === null || table === void 0 ? void 0 : table.control) === null || _a === void 0 ? void 0 : _a.loadDataState) {
            setLoadDataState(table.control.loadDataState);
            isControl_loadDataState_defaultFunction.current = false;
        }
    }, [(_f = table === null || table === void 0 ? void 0 : table.control) === null || _f === void 0 ? void 0 : _f.loadDataState, loadDataState]);
    useEffect(() => {
        var _a, _b;
        if (loadDataState && ((_a = follow_loadingState.setData) === null || _a === void 0 ? void 0 : _a.addState)) {
            (_b = follow_loadingState.setData) === null || _b === void 0 ? void 0 : _b.addState(loadDataState);
        }
    }, [loadDataState, follow_loadingState.setData]);
    // cell
    const cellElements = useRef([]);
    if (data) {
        rowAmount.current = data.length + 1;
        if (data.length > default_pageSize) {
            console.warn({
                message: 'Data more than default size (is 10). Data can lose',
                dataSize: data.length,
                defaultSize: default_pageSize
            });
        }
        if (pageSize === undefined) {
            console.warn({
                message: 'You should pass a value for "pageSize"',
                default_pageSize: default_pageSize
            });
        }
        if (maxRow === undefined) {
            console.warn({
                message: 'You should pass a value for "maxRow"',
                default_maxRow: default_maxRow
            });
        }
    }
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
    if ((config === null || config === void 0 ? void 0 : config.columnsInfor) && (rowHeader === null || rowHeader === void 0 ? void 0 : rowHeader.cells) && (rowForm === null || rowForm === void 0 ? void 0 : rowForm.cells)) {
        for (let i = 0; i < config.columnsInfor.length; i++) {
            // if (config.columnsInfor[i]!==undefined) {
            //     rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            //     rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
            // } else {
            //     rowHeader.cells.push(cellHeader('', `column ${i}`, 'black', '700'));
            //     rowForm.cells.push(cellHeader('', '', WARNING_COLOR, '300'));
            // }
            rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
        }
    }
    const totalRow_m = [];
    if (data) {
        for (let key = 0; key < data.length; key++) {
            // if (data.hasOwnProperty(key)) { 
            //     console.log(`log: ${key}: ${Object.keys(data[key])}`, data[key]);
            // }   
            // const rowData = { ...rowForm.current };
            const rowData = JSON.parse(JSON.stringify(rowForm));
            if ((_g = rowData === null || rowData === void 0 ? void 0 : rowData.cells) === null || _g === void 0 ? void 0 : _g.length) {
                for (let i = 0; i < rowData.cells.length; i++) {
                    const keyIndexInRow = Object.keys(data[key]).indexOf((_h = rowData.cells[i]) === null || _h === void 0 ? void 0 : _h.fieldName);
                    if (keyIndexInRow !== -1) {
                        const selectedKey = (_j = rowData.cells[i]) === null || _j === void 0 ? void 0 : _j.fieldName;
                        rowData.cells[i].content = data[key][selectedKey];
                    }
                    else {
                        rowData.cells[i].content = 'Empty';
                        rowData.cells[i].textColor = WARNING_COLOR;
                    }
                }
                totalRow_m.push(rowData);
            }
        }
    }
    totalRow_m.unshift(rowHeader);
    totalRow.current = totalRow_m;
    const handleControlPos = () => {
        if (config.controlPos === "bottom") {
            return 'bottom';
        }
        else {
            return 'top';
        }
    };
    const list_row = totalRow.current.map((data, index) => {
        return (_jsx(Row, { data: data, rowIndex: index }, index));
    });
    const contextValue = useMemo(() => ({
        table,
        cellElements,
        resizableStatus,
        cellWidth,
        cellX,
        selectedColumn,
        columnAmount,
        rowAmount,
        pageIndex,
        setPageIndex,
        default_pageSize,
        default_maxRow,
        loadDataState,
        setLoadDataState,
        isControl_pageIndex_defaultFunction,
        isControl_loadDataState_defaultFunction,
        follow_loadingState
    }), [table, pageIndex, setPageIndex, loadDataState, follow_loadingState]);
    return _jsx(ContextTable.Provider, { value: contextValue, children: isRender && _jsxs("div", { className: "TKS-Table", children: [handleControlPos() !== 'bottom' && _jsx("div", { className: 'TKS-Table--Control', children: _jsx(Control, {}) }), _jsx("div", { className: 'TKS-Table--Row', children: list_row }), handleControlPos() === 'bottom' && _jsx("div", { className: 'TKS-Table--Control', children: _jsx(Control, {}) })] }) });
};
export default React.memo(Table);

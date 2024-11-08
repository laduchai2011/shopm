import React, { FC, useRef, useMemo, useState } from 'react';
import './styles.css';

import { ContextTable } from './contextTable';

import { 
    RowProps,
    TableProps, 
    ContextTableProps,
    TableConfigProps,
    CellProps
} from 'define';

import { WARNING_COLOR } from 'const';

import Row from './components/Row';
import Control from './components/Control';

const Table: FC<{
        data: {[key: string]: any}[],
        config: TableConfigProps,
        onSelectPage: (number: number) => void,
        loadDataState?: string | undefined
    }> = ({ 
        data,
        config, 
        onSelectPage,
        loadDataState
    }) => {

    const indexInit = 1;

    const tableControlData = {
        pageIndex: indexInit,
        pageSize: config.pageSize, 
        maxRow: config.maxRow
    }

    // const init: React.MutableRefObject<boolean> = useRef(false);
    const resizableStatus: React.MutableRefObject<boolean> = useRef(false);
    const cellWidth: React.MutableRefObject<number> = useRef(0);
    const cellX: React.MutableRefObject<number> = useRef(0);
    const selectedColumn: React.MutableRefObject<number | undefined> = useRef(undefined);
    const columnAmount: React.MutableRefObject<number> = useRef(0);
    const rowAmount: React.MutableRefObject<number> = useRef(0);
    const [pageIndex, setPageIndex] = useState<number>(indexInit);
    // const headerRow: React.MutableRefObject<RowProps> = useRef({
    //     cells: []
    // });
    const totalRow: React.MutableRefObject<RowProps[]> = useRef([]);

    rowAmount.current = data.length + 1;

    const rowForm: RowProps = {
        cells: []
    };

    // set-up header oncly one time
    const cellHeader = (fieldName: string, content: string, textColor: string, textWeight: string): CellProps => {
        return {
            fieldName: fieldName,
            content: content,
            textColor: textColor,
            textWeight: textWeight
        }
    }
    const rowHeader: RowProps = {
        cells: []
    }
    for (let i: number = 0; i < config.columnAmount; i++) {
        if ((config.columnsInfor!==undefined) && (config.columnsInfor[i]!==undefined)) {
            rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
        } else {
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
    const totalRow_m: RowProps[] = []
    for (let key: number = 0; key < data.length; key++) {
        // if (data.hasOwnProperty(key)) { 
        //     console.log(`log: ${key}: ${Object.keys(data[key])}`, data[key]);
        // }   
        // const rowData = { ...rowForm.current };
        const rowData: RowProps = JSON.parse(JSON.stringify(rowForm));
        for (let i: number = 0; i < rowData.cells.length; i++) {
            const keyIndexInRow = Object.keys(data[key]).indexOf(rowData.cells[i]?.fieldName);
            if (keyIndexInRow!==-1) {
                const selectedKey = rowData.cells[i]?.fieldName;
                rowData.cells[i].content = data[key][selectedKey];
            } else {
                rowData.cells[i].content = 'Empty';
                rowData.cells[i].textColor = WARNING_COLOR;
            }
        }
        totalRow_m.push(rowData)
    }

    totalRow_m.unshift(rowHeader);

    totalRow.current = totalRow_m;
    
    const tableProps: TableProps = {
        tableControl: tableControlData,
        rows: totalRow.current
    }

    const handleControlPos = (): string => {
        if (config.controlPos==="bottom") {
            return 'bottom';
        } else {
            return 'top';
        }
    };
      
    const list_row: React.ReactNode = tableProps.rows.map((data: RowProps, index: number) => {
        return (
            <Row data={data} rowIndex={ index } key={index} />
        )
    })

    const contextValue: ContextTableProps = useMemo(() => ({
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

    return <ContextTable.Provider value={contextValue}>
        <div className="TKS-Table">
            { handleControlPos()!=='bottom' && <div className='TKS-Table--Control'><Control data={tableProps.tableControl} /></div>}
            <div>{ list_row }</div>
            { handleControlPos()==='bottom' && <div className='TKS-Table--Control'><Control data={tableProps.tableControl} /></div>}
        </div>
    </ContextTable.Provider>
};

export default Table;
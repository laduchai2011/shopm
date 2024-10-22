import React, { FC, useRef } from 'react';
import './styles.css';

import { ContextTable } from './contextTable';

import { 
    RowProps,
    TableProps 
} from 'define/index';
// import { 
//     RowProps,
//     TableProps 
// } from '../define/index';

import Row from './components/Row/index';
import Control from './components/Control/index';

const Table: FC<{data: TableProps}> = ({ data: tableData }) => {
    const resizableStatus: React.MutableRefObject<boolean> = useRef(false);
    const cellWidth: React.MutableRefObject<number> = useRef(0);
    const cellX: React.MutableRefObject<number> = useRef(0);
    const selectedColumn: React.MutableRefObject<number | undefined> = useRef(undefined);
    const columnAmount: React.MutableRefObject<number> = useRef(0);
    const rowAmount: React.MutableRefObject<number> = useRef(0);

    rowAmount.current = tableData.rows.length;

    const list_row: React.ReactNode = tableData.rows.map((data: RowProps, index: number) => {
        return (
            <Row data={data} index={index} key={index} />
        )
    })

    return <ContextTable.Provider value={{resizableStatus, cellWidth, cellX, selectedColumn, columnAmount, rowAmount}}>
        <div className="TKS-Table">
            <div><Control data={tableData.tableControl} /></div>
            <div>{ list_row }</div>
        </div>;
    </ContextTable.Provider>
};

export default Table;